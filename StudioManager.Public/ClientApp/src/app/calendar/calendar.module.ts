import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'
import {
    CalendarModule as CalendarLibModule,
    DateAdapter,
    MOMENT
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslateModule } from '@ngx-translate/core';

import * as moment from 'moment';

import { CalendarComponent } from './calendar.component';
import { CalendarApi } from './calendar.api';
import { CalendarResolver } from './calendar.resolver'

import { CreateReserveModule } from './create-reserve/create-reserve.module';

export function momentAdapterFactory() {
    return adapterFactory(moment);
}

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
            useFactory: momentAdapterFactory
        }),
        MatButtonToggleModule,
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
    ]
})
export class CalendarModule {
}
