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

import { AngularFireStorageModule } from '@angular/fire/storage';


registerLocaleData(localeEs, 'es-AR');  

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
    AngularFireStorageModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-AR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
