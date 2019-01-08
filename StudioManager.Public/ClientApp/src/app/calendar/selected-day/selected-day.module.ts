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

import { SelectedDayComponent } from './selected-day.component';
import { SelectedDayResolver } from './selected-day.resolver'
import { CalendarApi } from '../calendar.api';

export function momentAdapterFactory() {
    return adapterFactory(moment);
}

@NgModule({
    declarations: [
        SelectedDayComponent
    ],
    imports: [
        RouterModule.forChild([
            {
                path: ':day',
                component: SelectedDayComponent,
                resolve: {
                    events: SelectedDayResolver
                }
            }
        ]),
        CalendarLibModule.forRoot({
            provide: DateAdapter,
            useFactory: momentAdapterFactory
        }),
        MatButtonToggleModule,
        CommonModule,
        TranslateModule
    ],
    providers: [
        CalendarApi,
        SelectedDayResolver,
        {
            provide: MOMENT,
            useValue: moment
        }
    ]
})
export class SelectedDayModule {
}
