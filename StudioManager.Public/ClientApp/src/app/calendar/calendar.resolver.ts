import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs'

import { CalendarApi, BookingData } from './calendar.api';

@Injectable()
export class CalendarResolver implements Resolve<BookingData[]> {

    constructor(private readonly api: CalendarApi) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<BookingData[]> {
        const now = new Date();
        const startOfMonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            1);

        const endOfMonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            this.daysInMonth(now.getMonth(), now.getFullYear()));

        return this.api.loadAll(startOfMonth, endOfMonth);
    }

    private daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
}
