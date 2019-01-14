import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { DpDatePickerModule } from 'ng2-date-picker';

import { CreateReserveComponent } from './create-reserve.component';

@NgModule({
    declarations: [
        CreateReserveComponent
    ],
    imports: [
        FormsModule,
        MatButtonModule,
        CommonModule,
        TranslateModule,
        DpDatePickerModule,
        MatFormFieldModule,
        MatInputModule
    ],
    entryComponents: [
        CreateReserveComponent
    ]
})
export class CreateReserveModule {
}
