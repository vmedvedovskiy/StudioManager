import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'
import { CalendarModule as CalendarLibModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslateModule } from '@ngx-translate/core';

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
        MatButtonToggleModule,
        CommonModule,
        TranslateModule
    ],
    providers: [
        CalendarApi,
        CalendarResolver
    ]
})
export class CalendarModule {
}
