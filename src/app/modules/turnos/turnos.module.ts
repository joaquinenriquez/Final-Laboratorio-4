import { SharedModule } from './../shared/shared.module';
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
import { SelectorDiasComponent } from './components/selector-dias/selector-dias.component';
import { DiaLaboralPipe } from './pipes/dia-laboral.pipe';
import { SelectorHorariosComponent } from './components/selector-horarios/selector-horarios.component';
import { TablaSeleccionProfesionalesComponent } from './components/tabla-seleccion-profesionales/tabla-seleccion-profesionales.component';
import { TablaSeleccionEspecialidadesComponent } from './components/tabla-seleccion-especialidades/tabla-seleccion-especialidades.component';
import { ConfirmacionSolicitudTurnoComponent } from './components/confirmacion-solicitud-turno/confirmacion-solicitud-turno.component';
import { SelectorEspecialidadDialogComponent } from './components/selector-especialidad-dialog/selector-especialidad-dialog.component';
import { DatosTurnosBarComponent } from './components/datos-turnos-bar/datos-turnos-bar.component';
import { TextoComponent } from './components/DatosAdicionales/texto/texto.component';
import { GeneradorCamposDinamicoComponent } from './components/DatosAdicionales/generador-campos-dinamico/generador-campos-dinamico.component';
import { PlaceholderDirective } from './directives/placeholder.directive';
import { CasillaVerificacionComponent } from './components/DatosAdicionales/casilla-verificacion/casilla-verificacion.component';
import { TextoNumericoComponent } from './components/DatosAdicionales/texto-numerico/texto-numerico.component';
import { DefinirTituloDialogComponent } from './components/DatosAdicionales/definir-titulo-dialog/definir-titulo-dialog.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { RangoComponent } from './components/DatosAdicionales/rango/rango.component';
import { ListadoHistorialTurnoPorPacienteComponent } from './components/listado-historial-turno-por-paciente/listado-historial-turno-por-paciente.component';
import { ListadoSeleccionTurnoComponent } from './components/listado-seleccion-turno/listado-seleccion-turno.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [SolicitarTurnoComponent, ListadoTurnosPacientesComponent, ListadoTurnosProfesionalesComponent, ModificarDuracionTurnoDialogComponent, SelectorDiasComponent, DiaLaboralPipe, SelectorHorariosComponent, TablaSeleccionProfesionalesComponent, TablaSeleccionEspecialidadesComponent, ConfirmacionSolicitudTurnoComponent, SelectorEspecialidadDialogComponent, DatosTurnosBarComponent, TextoComponent, GeneradorCamposDinamicoComponent, PlaceholderDirective, CasillaVerificacionComponent, TextoNumericoComponent, DefinirTituloDialogComponent, BuscadorComponent, RangoComponent, ListadoHistorialTurnoPorPacienteComponent, ListadoSeleccionTurnoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    RouterModule,
    TranslateModule
  ],
  exports: [SolicitarTurnoComponent, ListadoTurnosPacientesComponent, ListadoTurnosProfesionalesComponent, SelectorDiasComponent, SelectorHorariosComponent, TablaSeleccionProfesionalesComponent, TablaSeleccionEspecialidadesComponent, ConfirmacionSolicitudTurnoComponent, DatosTurnosBarComponent, GeneradorCamposDinamicoComponent, BuscadorComponent, ListadoHistorialTurnoPorPacienteComponent, ListadoSeleccionTurnoComponent]
})
export class TurnosModule { }
