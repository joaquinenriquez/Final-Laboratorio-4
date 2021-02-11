import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from './route-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  
  title = 'ClinicaOnline';
  mostrarBarraUsuario: boolean = true;

  constructor(private translateService: TranslateService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              public router: Router) {

              }

  
  
  ngOnInit() {
    this.definirIdioma();
    this.agregarIconos();
  }
  
  
  definirIdioma() {
    this.translateService.setDefaultLang('ar');
    this.translateService.use(localStorage.getItem('idioma') || 'ar');
  }


  agregarIconos() {

    this.matIconRegistry.addSvgIcon(`ar`, this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/flag-for-argentina.svg"));
    this.matIconRegistry.addSvgIcon(`br`, this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/flag-for-brazil.svg"));
    this.matIconRegistry.addSvgIcon(`en`, this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/uk.svg"));
    
    this.matIconRegistry.addSvgIcon('numeral', this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/number.svg"));
    this.matIconRegistry.addSvgIcon('texto', this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/bx-text.svg"));

    this.matIconRegistry.addSvgIcon(`archivo_pdf`, this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/file-pdf.svg"));
    this.matIconRegistry.addSvgIcon(`archivo_excel`, this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/file-type-excel.svg"));

  }

}
