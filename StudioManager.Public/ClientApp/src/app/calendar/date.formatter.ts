import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { DatePipe } from '@angular/common';

export class DateFormatter extends CalendarDateFormatter {

    public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
        return new DatePipe(locale).transform(date, 'EEE', locale);
    }

    public monthViewTitle({ date, locale }: DateFormatterParams): string {
        return new DatePipe(locale).transform(date, 'MMM y', locale);
    }

    public weekViewHour({ date, locale }: DateFormatterParams): string {
        return new DatePipe(locale).transform(date, 'HH:mm', locale);
    }
}
