import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { slideInAnimation } from './route-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation ]
})
export class AppComponent {
  
  title = 'ClinicaOnline';

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('ar');
    this.translateService.use(localStorage.getItem('idioma') || 'ar');
  }


}
