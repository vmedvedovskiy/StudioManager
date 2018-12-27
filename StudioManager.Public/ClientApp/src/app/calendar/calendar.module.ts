import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarModule as CalendarLibModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CalendarComponent } from './calendar.component';
import { CalendarApi } from './calendar.api';
import { CalendarResolver } from './calendar.resolver'

@NgModule({
    declarations: [
        CalendarComponent
    ],
    imports: [
        RouterModule.forChild([
            {
                path: 'calendar',
                component: CalendarComponent,
                resolve: {
                    events: CalendarResolver
                }
            }
        ]),
        CalendarLibModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
    ],
    providers: [
        CalendarApi,
        CalendarResolver
    ]
})
export class CalendarModule {
}
