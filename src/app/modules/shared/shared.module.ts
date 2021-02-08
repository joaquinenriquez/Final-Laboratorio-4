import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material/material.module';
import { AuthService } from './services/auth.service';
import { environment } from './../../../environments/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MultiSelectConBuscadorComponent } from './components/multi-select-con-buscador/multi-select-con-buscador.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { DatosUsuarioBarComponent } from './components/datos-usuario-bar/datos-usuario-bar.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TablaComponent } from './components/tabla/tabla.component';
import { ObtenerPropiedadPipePipe } from './components/tabla/obtener-propiedad-pipe.pipe';
import { CalificacionEstrellasComponent } from './components/calificacion-estrellas/calificacion-estrellas.component';
import { SiNoPipe } from './pipes/si-no.pipe';
import { DatosProfesionalBarComponent } from './components/datos-profesional-bar/datos-profesional-bar.component';
import { DatosAdminBarComponent } from './components/datos-admin-bar/datos-admin-bar.component';
import { MiCaptchaComponent } from './mi-captcha/mi-captcha.component';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from './components/card/card.component';
import { NotificacionesDialogComponent } from './components/notificaciones-dialog/notificaciones-dialog.component';


@NgModule({
  declarations: [ToolbarComponent, MultiSelectConBuscadorComponent, DatosUsuarioBarComponent, TablaComponent, ObtenerPropiedadPipePipe, CalificacionEstrellasComponent, SiNoPipe, DatosProfesionalBarComponent, DatosAdminBarComponent, MiCaptchaComponent, CardComponent, NotificacionesDialogComponent],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    FlexLayoutModule,
    FormsModule,
    TranslateModule
  ],

  providers: [AuthService],

  exports: [ToolbarComponent, MultiSelectConBuscadorComponent, DatosUsuarioBarComponent, TablaComponent, CalificacionEstrellasComponent, SiNoPipe, DatosProfesionalBarComponent, DatosAdminBarComponent, MiCaptchaComponent, CardComponent]

})
export class SharedModule { }
