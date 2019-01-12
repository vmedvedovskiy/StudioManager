import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { DpDatePickerModule } from 'ng2-date-picker';

import { CreateReserveComponent } from './create-reserve.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

@NgModule({
    declarations: [
        CreateReserveComponent,
        ThankYouComponent
    ],
    imports: [
        FormsModule,
        MatDialogModule,
        MatButtonModule,
        CommonModule,
        TranslateModule,
        DpDatePickerModule,
        MatFormFieldModule,
        MatInputModule
    ],
    entryComponents: [
        CreateReserveComponent,
        ThankYouComponent
    ]
})
export class CreateReserveModule {
}
