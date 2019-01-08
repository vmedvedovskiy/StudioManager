import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarView, CalendarDateFormatter } from 'angular-calendar';

import { DateFormatter } from '../date.formatter';
import { BookingData, CalendarApi, NewReserve } from '../calendar.api'
import { CalendarEvent } from '../calendar.component'
import { CreateReserveComponent, NewReserveModel }
    from '../create-reserve/create-reserve.component';
import { MatDialog } from '@angular/material';

import * as moment from 'moment';

import { flatMap } from 'rxjs/operators'
import { Subscription,  of } from 'rxjs';

class Intermediary {
    public from: moment.Moment
    public to: moment.Moment

    constructor(init: Partial<Intermediary>) {
        Object.assign(this, init);
    }
}

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: CalendarDateFormatter,
            useClass: DateFormatter
        }
    ]
})
export class SelectedDayComponent implements OnDestroy {

    private events: CalendarEvent[] = [];
    viewDate: moment.Moment;
    private CalendarView = CalendarView;
    private reserveDialogCloseSubscription: Subscription;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly dialogService: MatDialog,
        private readonly api: CalendarApi) {

        this.viewDate = moment(+route.snapshot.paramMap['day']);

        this.route.data.subscribe((data: {
            events: BookingData[]
        }) => {
            this.events =
                data.events
                    .map(_ => new Intermediary({
                        from: moment(_.from),
                        to: moment(_.to)
                }))
                .sort((_, __) => _.from.diff (__.from))
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
                .map(_ => new CalendarEvent(
                    _.from.toDate(),
                    _.to.toDate()));
        });
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
            .pipe(flatMap((_: NewReserveModel | null) => {
                if (_ == null) {
                    return of();
                }

                return this.api.createNew(new NewReserve({
                    description: _.comment,
                    to: _.end.format(),
                    contactPhone: _.phoneNumber,
                    from: _.start.format()
                }))
            }))
            .subscribe();
    }

    back() {
        return this.router.navigate(['../']);
    }

    ngOnDestroy(): void {
        this.reserveDialogCloseSubscription
            && this.reserveDialogCloseSubscription.unsubscribe();
    }
}
