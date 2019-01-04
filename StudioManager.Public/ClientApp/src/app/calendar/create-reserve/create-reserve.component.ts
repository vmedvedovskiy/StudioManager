import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as moment from 'moment';

export class NewReserveModel {
    start: moment.Moment;
    end: moment.Moment;
    phoneNumber: string;
    email: string;
    comment: string;
}

@Component({
    selector: 'create-reserve',
    templateUrl: './create-reserve.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateReserveComponent {
    constructor(
        private readonly dialogRef: MatDialogRef<CreateReserveComponent>,
        @Inject(MAT_DIALOG_DATA) private readonly data: moment.Moment) {

    }

    onClose() {
        this.dialogRef.close();
    }
}
