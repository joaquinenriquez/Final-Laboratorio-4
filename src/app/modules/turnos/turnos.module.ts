import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoTurnosPacientesComponent } from './components/listado-turnos-pacientes/listado-turnos-pacientes.component';
import { ListadoTurnosProfesionalesComponent } from './components/listado-turnos-profesionales/listado-turnos-profesionales.component';
import { ModificarDuracionTurnoDialogComponent } from './components/modificar-duracion-turno-dialog/modificar-duracion-turno-dialog.component';



@NgModule({
  declarations: [SolicitarTurnoComponent, ListadoTurnosPacientesComponent, ListadoTurnosProfesionalesComponent, ModificarDuracionTurnoDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [SolicitarTurnoComponent, ListadoTurnosPacientesComponent, ListadoTurnosProfesionalesComponent]
})
export class TurnosModule { }
