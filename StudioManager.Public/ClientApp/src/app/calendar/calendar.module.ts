import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
    CalendarModule as CalendarLibModule,
    DateAdapter,
    MOMENT
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslateModule } from '@ngx-translate/core';

import * as moment from 'moment';

import { CalendarRootComponent } from './calendar-root.component';
import { CalendarApi } from './calendar.api';

import { CreateReserveModule } from './create-reserve/create-reserve.module';
import { SelectedDayComponent } from './selected-day/selected-day.component';
import { SelectedDayResolver } from './selected-day/selected-day.resolver';

export function momentAdapterFactory() {
    return adapterFactory(moment);
}

@NgModule({
    declarations: [
        SelectedDayComponent,
        CalendarRootComponent
    ],
    imports: [
        RouterModule.forChild([
            {
                path: 'calendar',
                component: CalendarRootComponent,
                children: [{
                    path: ':day',
                    component: SelectedDayComponent,
                    resolve: {
                        events: SelectedDayResolver
                    }
                }]
            }]),
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
        SelectedDayResolver,
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
