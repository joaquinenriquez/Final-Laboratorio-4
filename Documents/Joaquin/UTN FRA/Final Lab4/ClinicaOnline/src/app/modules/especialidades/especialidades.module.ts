import { MatSnackBar } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListadoEspecialidadesComponent } from './components/listado-especialidades/listado-especialidades.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadesRoutingModule } from './especialidades-routing.module';
import { MaterialModule } from './../material/material.module';
import { AltaModificacionEspecialidadDialogComponent } from './components/alta-modificacion-especialidad-dialog/alta-modificacion-especialidad-dialog.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  declarations: [ListadoEspecialidadesComponent, AltaModificacionEspecialidadDialogComponent],
  imports: [
    CommonModule,
    EspecialidadesRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MatSnackBar]
})
export class EspecialidadesModule { }
