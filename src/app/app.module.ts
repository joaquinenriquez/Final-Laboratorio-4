import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';

import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { EspecialidadesModule } from './modules/especialidades/especialidades.module';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-AR';

//import { AngularFireStorageModule } from '@angular/fire/storage';

// Esto es 
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// Traducciones
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


registerLocaleData(localeEs, 'es-AR');

// Traducciones
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UsuariosModule,
    CoreModule,
    SharedModule,
    EspecialidadesModule,
    AppRoutingModule,
    FlexLayoutModule,
    // AngularFireStorageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }, { provide: LocationStrategy, useClass: HashLocationStrategy }, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
