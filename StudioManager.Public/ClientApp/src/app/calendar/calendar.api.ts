import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import * as moment from 'moment';

export class BookingData {
    id: string;
    from: string;
    to: string;
}

@Injectable()
export class CalendarApi {

    constructor(private readonly client: HttpClient) {

    }

    public loadAll(from: moment.Moment, to: moment.Moment): Observable<BookingData[]> {
        return this.client.get<BookingData[]>(
            '/api/v1/booking',
            {
                params: {
                    'from': from.format(),
                    'to': to.format()
                }
            });
    }
}
