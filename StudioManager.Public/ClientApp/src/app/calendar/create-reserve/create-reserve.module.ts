import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TranslateModule } from '@ngx-translate/core';

import { CreateReserveComponent } from './create-reserve.component';

@NgModule({
    declarations: [
        CreateReserveComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule,
        CommonModule,
        TranslateModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatFormFieldModule,
        MatInputModule
    ],
    entryComponents: [
        CreateReserveComponent
    ]
})
export class CreateReserveModule {
}
