import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarView, CalendarDateFormatter } from 'angular-calendar';

import { DateFormatter } from './date.formatter';
import { BookingData } from './calendar.api'

import * as moment from 'moment';

export class CalendarEvent {
    constructor(
        public start: Date,
        public end: Date) {
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
export class CalendarComponent {

    private events: CalendarEvent[] = [];
    private viewDate = moment().toDate();
    private CalendarView = CalendarView;

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute) {

        this.route.data.subscribe((data: {
            events: BookingData[]
        }) => {
            this.events =
                data.events.map(_ => new CalendarEvent(
                    moment(_.from).toDate(),
                    moment(_.to).toDate()));
        });
    }

    onDayClicked($event: {
        day: {
            date: Date
        }) {
        this.router.navigate([
            './',
            $event.day.date.getTime()]);
    }
}
