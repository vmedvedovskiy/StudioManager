import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { CalendarApi } from './calendar.api';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        CalendarComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: '', component: CalendarComponent, pathMatch: 'full' }
        ])
    ],
    providers: [
        CalendarApi
    ]
})
export class CalendarModule {
}
