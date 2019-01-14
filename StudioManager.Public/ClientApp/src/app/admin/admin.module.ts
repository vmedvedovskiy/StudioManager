import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav'

import { AdminComponent } from './admin.component';

import { CalendarModule } from './calendar/calendar.module';

@NgModule({
    declarations: [
        AdminComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        MatSidenavModule,
        CalendarModule,
        RouterModule.forChild([{
            path: '',
            component: AdminComponent,
            children: [{
                path: 'calendar',
                loadChildren: './calendar/calendar.module#CalendarModule'
            }]
        }])
    ],
    providers: [],
    exports: [
        RouterModule
    ]
})
export class AdminModule {
}

