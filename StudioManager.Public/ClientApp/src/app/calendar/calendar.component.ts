import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarView, DAYS_OF_WEEK, CalendarDateFormatter } from 'angular-calendar';
import { Subject } from 'rxjs';

import { DateFormatter } from './date.formatter';
import { BookingData } from './calendar.api'

import * as moment from 'moment';

class CalendarEvent {
    constructor(
        private start: moment.Moment,
        private end: moment.Moment) {
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

    private eventsInternal: CalendarEvent[] = [];
    private events: CalendarEvent[] = [];
    private viewDate = new Date();
    private selectedView: CalendarView = CalendarView.Month;
    private refresh: Subject<any> = new Subject();
    private CalendarView = CalendarView;
    private weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

    constructor(private readonly route: ActivatedRoute) {

        this.route.data.subscribe((data: {
            events: BookingData[]
        }) => {
            this.eventsInternal = data.events
                .map(_ => new CalendarEvent(
                    moment(_.from),
                    moment(_.to)));
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

    }
}
