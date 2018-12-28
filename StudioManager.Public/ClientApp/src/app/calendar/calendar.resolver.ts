import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { CalendarApi, BookingData } from './calendar.api';

@Injectable()
export class CalendarResolver implements Resolve<BookingData[]> {

    constructor(private readonly api: CalendarApi) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<BookingData[]> {

        const startOfMonth = moment().startOf("month");
        const endOfMonth = moment().endOf("month");

        return this.api.loadAll(startOfMonth, endOfMonth);
    }
}
