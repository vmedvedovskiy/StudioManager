import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'calendar-root',
    template: '<router-outlet></router-outlet>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarRootComponent {
}
