import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingData } from './calendar.api'
import { map } from 'rxjs/operators';

class CalendarEvent {
    constructor(
        start: Date,
        end: Date) {
    }
}

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
})
export class CalendarComponent {

    private events: CalendarEvent[] = [];

    constructor(private readonly route: ActivatedRoute) {
        this.route.data.subscribe((data: {
            events: BookingData[]
        }) => {
            this.events = data.events
                .map(_ => new CalendarEvent(_.From, _.To));
        });
    }

    private now = new Date();
}
