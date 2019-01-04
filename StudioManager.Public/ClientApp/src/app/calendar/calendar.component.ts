import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarView, CalendarDateFormatter } from 'angular-calendar';

import { DateFormatter } from './date.formatter';
import { BookingData } from './calendar.api'

import * as moment from 'moment';

class CalendarEvent {
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
    private selectedView: CalendarView = CalendarView.Month;
    private CalendarView = CalendarView;

    constructor(private readonly route: ActivatedRoute) {

        this.route.data.subscribe((data: {
            events: BookingData[]
        }) => {
            this.events = data.events
                .map(_ => new CalendarEvent(
                    moment(_.from).toDate(),
                    moment(_.to).toDate()));
        });
    }

    onCalendarViewChanged($event) {
        this.selectedView = $event.value;
    }

    onDayClicked($event) {
        this.viewDate = $event.day.date;
        this.selectedView = CalendarView.Day;
    }

    onRequestReserve($event: {
        date: Date
    }) {
        const eventDate = moment($event.date);

        if (this.events.some(_ =>
                eventDate.isBetween(_.start, _.end))) {
            return;
        }
    }
}
