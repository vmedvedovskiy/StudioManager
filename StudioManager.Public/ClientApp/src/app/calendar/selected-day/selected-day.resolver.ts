import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { CalendarApi, BookingData } from '../calendar.api';

@Injectable()
export class SelectedDayResolver implements Resolve<BookingData[]> {

    constructor(private readonly api: CalendarApi) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<BookingData[]> {

        const selectedDay = +route.paramMap.get('day');

        const startOfMonth = moment(selectedDay).startOf("day");
        const endOfMonth = moment(selectedDay).endOf("day");

        return this.api.load(startOfMonth, endOfMonth);
    }
}
