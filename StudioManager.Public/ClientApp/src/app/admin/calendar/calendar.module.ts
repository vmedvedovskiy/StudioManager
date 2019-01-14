import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
    CalendarModule as CalendarLibModule,
    DateAdapter,
    MOMENT
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

import * as moment from 'moment';

import { CalendarRootComponent } from './calendar-root.component';
import { CalendarApi } from 'app/shared/calendar/calendar.api';

import { CreateReserveModule } from './create-reserve/create-reserve.module';
import { CreateReserveComponent } from './create-reserve/create-reserve.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarResolver } from './calendar/calendar.resolver';

export function momentAdapterFactory() {
    return adapterFactory(moment);
}

@NgModule({
    declarations: [
        CalendarComponent,
        CalendarRootComponent
    ],
    imports: [
        RouterModule.forChild([{
            path: ':selectedDate',
            component: CalendarRootComponent,
            children: [{
                path: '',
                component: CalendarComponent,
                resolve: {
                    events: CalendarResolver
                }
            },
            {
                path: 'create-reserve',
                component: CreateReserveComponent,
            }]
        }]),
        CalendarLibModule.forRoot({
            provide: DateAdapter,
            useFactory: momentAdapterFactory
        }),
        MatButtonModule,
        CommonModule,
        TranslateModule,
        CreateReserveModule
    ],
    providers: [
        CalendarApi,
        CalendarResolver,
        {
            provide: MOMENT,
            useValue: moment
        }
    ],
    exports: [
        RouterModule
    ]
})
export class CalendarModule {
}
