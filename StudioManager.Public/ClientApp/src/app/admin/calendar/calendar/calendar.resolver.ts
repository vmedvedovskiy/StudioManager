import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { CalendarApi, BookingData } from 'app/shared/calendar/calendar.api';

@Injectable()
export class CalendarResolver implements Resolve<BookingData[]> {

    constructor(private readonly api: CalendarApi) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<BookingData[]> {

        const selectedDay = +route.paramMap.get('selectedDate');

        const startOfMonth = moment(selectedDay).startOf('week');
        const endOfMonth = moment(selectedDay).endOf('week');

        return this.api.load(startOfMonth, endOfMonth);
    }
}
