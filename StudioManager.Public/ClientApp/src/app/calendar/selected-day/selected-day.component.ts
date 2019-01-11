import { Component, ChangeDetectionStrategy, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarDateFormatter } from 'angular-calendar';

import { DateFormatter } from '../date.formatter';
import { BookingData, CalendarApi, NewReserve } from '../calendar.api'
import { CalendarEvent } from '../calendar.component'
import { CreateReserveComponent, NewReserveModel }
    from '../create-reserve/create-reserve.component';
import { MatDialog } from '@angular/material';

import * as moment from 'moment';

import { flatMap } from 'rxjs/operators'
import { Subscription,  of } from 'rxjs';

class Intermediary {
    public from: moment.Moment
    public to: moment.Moment

    constructor(init: Partial<Intermediary>) {
        Object.assign(this, init);
    }
}

@Component({
    selector: 'selected-day',
    templateUrl: './selected-day.component.html',
    styleUrls: ['./selected-day.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: CalendarDateFormatter,
            useClass: DateFormatter
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class SelectedDayComponent implements OnDestroy {

    private events: CalendarEvent[] = [];
    private viewDate: moment.Moment;

    private reserveDialogCloseSubscription: Subscription;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly dialogService: MatDialog,
        private readonly api: CalendarApi) {

        this.viewDate = moment.utc(+route.snapshot.paramMap.get('day'));

        this.route.data.subscribe((data: {
            events: BookingData[]
        }) => {
            this.events =
                data.events
                    .map(_ => new Intermediary({
                        from: moment.utc(_.from).local(),
                        to: moment.utc(_.to).local()
                }))
                .sort((_, __) => _.from.diff (__.from))
                .reduce((prev, current) => {
                    const lastAddedEvent = prev[prev.length - 1];

                    if (lastAddedEvent
                        && lastAddedEvent.to.isSame(current.from, 'minute')) {
                        lastAddedEvent.to = current.to;
                    } else {
                        prev.push(current);
                    }

                    return prev;
                }, new Array<{
                    from: moment.Moment,
                    to: moment.Moment
                }>())
                .map(_ => new CalendarEvent(
                    _.from.toDate(),
                    _.to.toDate()));
        });
    }

    onRequestReserve($event: {
        date: Date
    }) {
        const eventDate = moment($event.date);

        if (this.events.some(_ =>
            eventDate.isBetween(_.start, _.end, null, '[)'))) {
            return;
        }

        this.reserveDialogCloseSubscription = this.dialogService
            .open(CreateReserveComponent, {
                data: moment($event.date)
            })
            .afterClosed()
            .pipe(flatMap((_: NewReserveModel | '' | null) => {
                if (_ == '' || _ == null) {
                    return of();
                }

                return this.api.createNew(new NewReserve({
                    description: _.comment,
                    to: _.end.local().format(),
                    contactPhone: _.phoneNumber,
                    from: _.start.local().format()
                }))
            }))
            .subscribe();
    }

    back() {
        return this.router.navigate(['../']);
    }

    ngOnDestroy(): void {
        this.reserveDialogCloseSubscription
            && this.reserveDialogCloseSubscription.unsubscribe();
    }
}
