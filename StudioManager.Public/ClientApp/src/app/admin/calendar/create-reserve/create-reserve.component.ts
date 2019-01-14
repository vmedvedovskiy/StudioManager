import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms'

import { CalendarApi, NewReserve } from 'app/shared/calendar/calendar.api'

import * as moment from 'moment';

import { map } from 'rxjs/operators'

export class NewReserveModel {
    start: moment.Moment;
    end: moment.Moment;
    phoneNumber: string;
    comment: string;
    firstName: string;
    lastName: string;

    constructor(init: Partial<NewReserveModel>) {
        Object.assign(this, init);
    }
}

class NewReserveViewModel {
    start: any;
    end: any;
    phoneNumber: string;
    comment: string;
    firstName: string;
    lastName: string;
}

@Component({
    selector: 'create-reserve',
    templateUrl: './create-reserve.html',
    styleUrls: ['./create-reserve.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateReserveComponent {
    private readonly selectedDate: moment.Moment;

    private newReserve = new NewReserveViewModel();
    @ViewChild(NgForm) private form: NgForm;

    public readonly workDayEnd = moment().hours(22);

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly api: CalendarApi) {

        this.selectedDate = moment(+this.route.snapshot.paramMap.get('selectedDate'))
            .local();

        this.newReserve.start = moment()
            .set('minute', 0);
        this.newReserve.end = moment()
            .add(1, 'hour')
            .set('minute', 0);
    }

    onReserveConfirm() {
        if (this.form.invalid) {
            return;
        }

        const startTime = moment.duration(this.newReserve.start);
        const endTime = moment.duration(this.newReserve.end);

        this.api
            .createNew(new NewReserve({
                description: this.newReserve.comment,
                to: moment(this.selectedDate)
                    .set('hour', endTime.asHours())
                    .local()
                    .format(),
                contactPhone: this.newReserve.phoneNumber,
                from: moment(this.selectedDate)
                    .set('hour', startTime.asHours())
                    .local()
                    .format(),
                firstName: this.newReserve.firstName,
                lastName: this.newReserve.lastName
            }))
            .pipe(map(_ => this.back()));
    }

    back() {
        return this.router.navigate(['../']);
    }
}
