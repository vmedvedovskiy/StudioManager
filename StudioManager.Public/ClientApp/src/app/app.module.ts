import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

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
        AppCalendarModule,
        RouterModule.forRoot([{
            path: '',
            redirectTo: '/calendar',
            pathMatch: 'full'
        }])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

