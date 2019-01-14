import { Component, ChangeDetectionStrategy, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarDateFormatter, CalendarView } from 'angular-calendar';
import { TranslateService } from '@ngx-translate/core';

import { DateFormatter } from '../date.formatter';
import { BookingData, CalendarApi, NewReserve } from 'app/shared/calendar/calendar.api'
import { CreateReserveComponent, NewReserveModel }
    from '../create-reserve/create-reserve.component';
import { MatDialog } from '@angular/material';

import * as moment from 'moment';
import { locale } from 'app/shared/locale';

import { flatMap, tap, filter } from 'rxjs/operators'
import { Subscription, Subject } from 'rxjs';

class Intermediary {
    public from: moment.Moment
    public to: moment.Moment

    constructor(init: Partial<Intermediary>) {
        Object.assign(this, init);
    }
}

class CalendarEvent {
    constructor(
        public start: Date,
        public end: Date,
        public title: string) {
    }
}

@Component({
    selector: 'selected-day',
    templateUrl: './selected-day.component.html',
    styleUrls: ['./selected-day.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: CalendarDateFormatter,
        useClass: DateFormatter
    }],
    encapsulation: ViewEncapsulation.None
})
export class SelectedDayComponent implements OnDestroy {

    private readonly datesGranularity = 'week';

    private events: CalendarEvent[] = [];
    private rawEvents: BookingData[];
    private viewDate: moment.Moment;
    private CalendarView = CalendarView;
    private locale = locale;
    private reservedText: string;

    private refreshView = new Subject<any>();

    private reserveDialogCloseSubscription: Subscription;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly dialogService: MatDialog,
        private readonly api: CalendarApi,
        private readonly translations: TranslateService) {

        this.reservedText = this.translations.instant('Reserved');
        this.viewDate = moment(+route.snapshot.paramMap.get('day'))
            .local();

        this.route.data.subscribe((data: {
            events: BookingData[]
        }) => {
            this.rawEvents = data.events;

            this.prepareViewEvents();
        });
    }

    ngOnDestroy(): void {
        this.reserveDialogCloseSubscription
            && this.reserveDialogCloseSubscription.unsubscribe();
    }

    onRequestReserve($event: {
        date: Date
    }) {
        const eventDate = moment($event.date);

        if (this.events.some(_ =>
            eventDate.isBetween(_.start, _.end, null, '[)'))) {
            return;
        }

        this.reserveDialogCloseSubscription = this.dialogService
            .open(CreateReserveComponent, {
                data: moment($event.date)
            })
            .afterClosed()
            .pipe(
                this.hasAddedReserve,
                this.postEventToApi,
                this.addCreatedEvent)
            .subscribe();
    }

    private prepareViewEvents() {
        this.events =
            this.rawEvents
                .map(this.toIntermediary)
                .sort((_, __) => _.from.diff(__.from))
                .reduce((prev, current) => {
                    const lastAddedEvent = prev[prev.length - 1];

                    if (lastAddedEvent
                        && lastAddedEvent.to.isSame(current.from, 'minute')) {
                        lastAddedEvent.to = current.to;
                    } else {
                        prev.push(current);
                    }

                    return prev;
                }, new Array<{
                    from: moment.Moment,
                    to: moment.Moment
                }>())
                .map(this.toCalendarEvent.bind(this));

        this.refreshView.next();
    }

    private toIntermediary(_: BookingData): Intermediary {
        return new Intermediary({
            from: moment.utc(_.from).local(),
            to: moment.utc(_.to).local()
        });
    }

    private toCalendarEvent(_: Intermediary): CalendarEvent {
        return new CalendarEvent(
            _.from.toDate(),
            _.to.toDate(),
            this.reservedText);
    }

    private hasAddedReserve
        = filter((_: NewReserveModel | '' | null) =>
            !(_ == '' || _ == null))

    private postEventToApi
        = flatMap((_: NewReserveModel) => {
            return this.api
                .createNew(new NewReserve({
                    description: _.comment,
                    to: _.end.local().format(),
                    contactPhone: _.phoneNumber,
                    from: _.start.local().format(),
                    firstName: _.firstName,
                    lastName: _.lastName
                }))
        });

    private addCreatedEvent
        = tap((_: BookingData) => {
            this.rawEvents = [...this.rawEvents, _];

            this.prepareViewEvents();
        });

    private getCurrentWeek() {
        return moment()
            .local()
            .valueOf();
    }

    private getPreviousWeek(viewDate: moment.Moment) {
        return moment(viewDate)
            .subtract(1, this.datesGranularity)
            .valueOf();
    }

    private getNextWeek(viewDate: moment.Moment) {
        return moment(viewDate)
            .add(1, this.datesGranularity)
            .valueOf();
    }

    private canNavigateBack(viewDate: moment.Moment) {
        return moment(viewDate)
            .subtract(1, this.datesGranularity)
            .isSameOrAfter(moment().local(), this.datesGranularity);
    }
}
