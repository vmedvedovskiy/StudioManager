import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

export class BookingData {
    Id: string;
    From: Date;
    To: Date;
}

@Injectable()
export class CalendarApi {

    constructor(private readonly client: HttpClient) {

    }

    public loadAll(from: Date, to: Date): Observable<BookingData[]> {
        return this.client.get<BookingData[]>(
            '/api/v1/booking',
            {
                params: {
                    'from': from.toISOString(),
                    'to': to.toISOString()
                }
            });
    }
}
