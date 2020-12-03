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

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ToolbarComponent, MultiSelectConBuscadorComponent, DatosUsuarioBarComponent],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    FlexLayoutModule
  ],

  providers: [AuthService],

  exports: [ToolbarComponent, MultiSelectConBuscadorComponent, DatosUsuarioBarComponent]

})
export class SharedModule { }
