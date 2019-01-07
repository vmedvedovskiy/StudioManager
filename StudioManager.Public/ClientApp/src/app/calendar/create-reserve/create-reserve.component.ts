import { Component, ChangeDetectionStrategy, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as moment from 'moment';

export class NewReserveModel {
    start: moment.Moment;
    end: moment.Moment;
    phoneNumber: string;
    comment: string;

    constructor(init: Partial<NewReserveModel>) {
        Object.assign(this, init);
    }
}

class NewReserveViewModel {
    start: any;
    end: any;
    phoneNumber: string;
    comment: string;
}

@Component({
    selector: 'create-reserve',
    templateUrl: './create-reserve.html',
    styleUrls: ['./create-reserve.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateReserveComponent {
    private newReserve = new NewReserveViewModel();
    private readonly workDayEnd = moment().hours(22);
    @ViewChild(NgForm) form: NgForm;

    constructor(
        private readonly dialogRef: MatDialogRef<CreateReserveComponent>,
        @Inject(MAT_DIALOG_DATA) private readonly data: moment.Moment) {
        this.newReserve.start = moment(data)
            .set('minute', 0);
        this.newReserve.end = moment(data)
            .add(1, 'hour')
            .set('minute', 0);
    }

    onReserveConfirm() {
        if (this.form.invalid) {
            return;
        }

        const startTime = moment.duration(this.newReserve.start);
        const endTime = moment.duration(this.newReserve.end);

        const newReserve = new NewReserveModel({
            comment: this.newReserve.comment,
            phoneNumber: this.newReserve.phoneNumber,
            start: moment(this.data).set(
                'hour',
                startTime.asHours()),
            end: moment(this.data).set(
                'hour',
                endTime.asHours())
        });

        this.dialogRef.close(newReserve);
    }
}
