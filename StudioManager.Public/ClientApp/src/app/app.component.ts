import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { locale, defaultLocale } from './shared/locale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(translate: TranslateService) {
        translate.setDefaultLang(defaultLocale);
        
        translate.use(locale);
    }
}
