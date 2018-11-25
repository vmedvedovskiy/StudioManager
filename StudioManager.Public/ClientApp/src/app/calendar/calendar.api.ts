import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'

export class BookingData {
    Id: string;
    From: Date;
    To: Date;
}

export class CalendarApi {
    constructor(private readonly client: HttpClient) {

    }

    public loadAll(from: Date, to: Date): Observable<BookingData[]> {
        return this.client.get<BookingData[]>(
            '/api/v1/booking',
            {
                params: {
                    'from': from.toUTCString(),
                    'to': to.toUTCString()
                }
            });
    }
}
