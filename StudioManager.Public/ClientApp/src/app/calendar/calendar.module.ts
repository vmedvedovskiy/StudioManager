import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { CalendarApi } from './calendar.api';
import { RouterModule } from '@angular/router';

import { CalendarModule as CalendarLibModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import '../../../node_modules/angular-calendar/css/angular-calendar.css';

@NgModule({
    declarations: [
        CalendarComponent
    ],
    imports: [
        RouterModule.forChild([
            {
                path: 'calendar',
                component: CalendarComponent
            }
        ]),
        CalendarLibModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
    ],
    providers: [
        CalendarApi
    ]
})
export class CalendarModule {
}
