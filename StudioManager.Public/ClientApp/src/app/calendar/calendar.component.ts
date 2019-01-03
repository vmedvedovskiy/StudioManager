import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingData } from './calendar.api'
import { CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { Subject } from 'rxjs';

class CalendarEvent {
    constructor(
        private start: Date,
        private end: Date) {
    }
}

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {

    private events: CalendarEvent[] = [];
    private now = new Date();
    private selectedView: CalendarView = CalendarView.Week;
    private refresh: Subject<any> = new Subject();
    private CalendarView = CalendarView;
    weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

    constructor(private readonly route: ActivatedRoute) {

        this.route.data.subscribe((data: {
            events: BookingData[]
        }) => {
            this.events = data.events
                .map(_ => new CalendarEvent(
                    new Date(_.from),
                    new Date(_.to)));
        });
    }

    onCalendarViewChanged($event) {
        this.selectedView = $event.value;
    }
}
