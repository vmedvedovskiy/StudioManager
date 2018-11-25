import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import '../../node_modules/angular-calendar/css/angular-calendar.css';

import { AppComponent } from './app.component';
import { CalendarModule as AppCalendarModule } from './calendar/calendar.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        AppCalendarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

