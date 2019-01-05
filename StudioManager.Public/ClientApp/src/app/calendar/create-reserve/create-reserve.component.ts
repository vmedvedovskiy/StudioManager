import { Component, ChangeDetectionStrategy, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as moment from 'moment';

export class NewReserveModel {
    start: moment.Moment;
    end: moment.Moment;
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
    private newReserve = new NewReserveModel();
    private readonly workDayEnd = moment().hours(22);
    @ViewChild(NgForm) form: NgForm;

    constructor(
        private readonly dialogRef: MatDialogRef<CreateReserveComponent>,
        @Inject(MAT_DIALOG_DATA) private readonly data: moment.Moment) {
        this.newReserve.start = moment(data);
        this.newReserve.end = moment(data).add(1, 'hour');
    }

    onReserveConfirm() {
        if (this.form.invalid) {
            return;
        }

        this.dialogRef.close(this.newReserve);
    }
}
