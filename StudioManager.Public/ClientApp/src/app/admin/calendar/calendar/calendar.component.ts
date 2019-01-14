import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarDateFormatter, CalendarView } from 'angular-calendar';

import { DateFormatter } from 'app/shared/calendar/date.formatter';
import { BookingData } from 'app/shared/calendar/calendar.api'

import * as moment from 'moment';
import { locale } from 'app/shared/locale';

class Intermediary {
    public from: moment.Moment;
    public to: moment.Moment;
    public title: string;

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
    selector: 'calendar',
    templateUrl: './calendar.html',
    styleUrls: ['./calendar.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: CalendarDateFormatter,
        useClass: DateFormatter
    }],
    encapsulation: ViewEncapsulation.None
})
export class CalendarComponent {

    private readonly datesGranularity = 'week';

    private events: CalendarEvent[] = [];
    private rawEvents: BookingData[];
    private viewDate: moment.Moment;
    private CalendarView = CalendarView;
    private locale = locale;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router) {
        
        this.viewDate = moment(+route.snapshot.paramMap.get('selectedDate'))
            .local();

        this.route.data.subscribe((data: {
            events: BookingData[]
        }) => {
            this.rawEvents = data.events;

            this.prepareViewEvents();
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

        this.router.navigate(['create-reserve'], {
            relativeTo: this.route
        });
    }

    private prepareViewEvents() {
        this.events =
            this.rawEvents
                .map(this.toIntermediary)
                .map(this.toCalendarEvent.bind(this));
    }

    private toIntermediary(_: BookingData): Intermediary {
        return new Intermediary({
            from: moment.utc(_.from).local(),
            to: moment.utc(_.to).local(),
            title: `${_.firstName} ${_.lastName}`
        });
    }

    private toCalendarEvent(_: Intermediary): CalendarEvent {
        return new CalendarEvent(
            _.from.toDate(),
            _.to.toDate(),
            _.title);
    }

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
