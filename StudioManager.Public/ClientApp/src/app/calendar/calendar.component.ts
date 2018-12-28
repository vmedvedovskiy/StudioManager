import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingData } from './calendar.api'
import { CalendarView } from 'angular-calendar';

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
    private view: CalendarView;

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
        this.view = $event.value;
    }
}
