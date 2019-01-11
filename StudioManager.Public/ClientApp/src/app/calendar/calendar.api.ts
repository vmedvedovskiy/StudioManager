import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import * as moment from 'moment';

export class BookingData {
    id: string;
    from: string;
    to: string;
}

export class NewReserve {
    constructor(init: Partial<NewReserve>) {
        Object.assign(this, init);
    }

    from: string;
    to: string;
    contactPhone: string;
    description: string;
}

@Injectable()
export class CalendarApi {

    constructor(private readonly client: HttpClient) {

    }

    public load(from: moment.Moment, to: moment.Moment): Observable<BookingData[]> {
        return this.client.get<BookingData[]>(
            '/api/v1/booking',
            {
                params: {
                    'from': from.utc().unix().toString(),
                    'to': to.utc().unix().toString()
                }
            });
    }

    public createNew(newReserve: NewReserve): Observable<BookingData> {
        return this.client.post<BookingData>(
            '/api/v1/booking',
            newReserve);
    }
}
