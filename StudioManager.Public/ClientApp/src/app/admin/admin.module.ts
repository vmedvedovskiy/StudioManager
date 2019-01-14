import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

import { CalendarModule } from './calendar/calendar.module';

@NgModule({
    declarations: [
        AdminComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        CalendarModule,
        RouterModule.forChild([{
            path: '',
            component: AdminComponent
        }])
    ],
    providers: [],
    exports: [
        RouterModule
    ]
})
export class AdminModule {
}

