import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import '../../node_modules/angular-calendar/css/angular-calendar.css';

@NgModule({
    declarations: [
        AppComponent,
        CalendarComponent
    ],
    imports: [
        RouterModule.forRoot([
            { path: '', component: CalendarComponent, pathMatch: 'full' }
        ]),
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

