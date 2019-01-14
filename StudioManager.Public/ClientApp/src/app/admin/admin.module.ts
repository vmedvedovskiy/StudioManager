import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

@NgModule({
    declarations: [
        AdminComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        RouterModule.forChild([{
            path: '',
            component: AdminComponent
        }])
    ],
    providers: [],
    exports: [
        RouterModule
    ]
})
export class AdminModule {
}

