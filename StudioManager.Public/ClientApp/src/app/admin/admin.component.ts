import { Component } from '@angular/core';

@Component({
    selector: 'admin-root',
    templateUrl: './admin.html'
})
export class AdminComponent {

    getCalendarRouteCommands() {
        return ['./calendar', Math.floor(new Date().getTime() / 1000) * 1000];
    }
}
