import { GraficosModule } from './../graficos/graficos.module';
import { TurnosModule } from './../turnos/turnos.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';


// Angular Basicos
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
 
// Rutas
import { UsuariosRoutingModule } from './usuarios-routing.module';

// Material
import { MaterialModule } from './../material/material.module';

// Componentes
import { LoginComponent } from './pages/login/login.component';
import { RegistroPacienteComponent } from './pages/registro-paciente/registro-paciente.component';
import { RegistroProfesionalComponent } from './pages/registro-profesional/registro-profesional.component';
import { ConfirmacionRegistroComponent } from './pages/confirmacion-registro/confirmacion-registro.component';
import { HomeUsuarioComponent } from './pages/home-usuario/home-usuario.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { GestionTurnosProfesionalComponent } from './pages/gestion-turnos-profesional/gestion-turnos-profesional.component';
import { GestionUsuariosComponent } from './pages/gestion-usuarios/gestion-usuarios.component';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado-usuarios.component';
import { ListadoHorariosProfesionalesComponent } from './components/listado-horarios-profesionales/listado-horarios-profesionales.component';
import { CambiarEstadoUsuarioDialogComponent } from './components/cambiar-estado-usuario-dialog/cambiar-estado-usuario-dialog.component';
import { NuevoUsuarioAdminDialogComponent } from './components/nuevo-usuario-admin-dialog/nuevo-usuario-admin-dialog.component';
import { SolicitarTurnoComponent } from './pages/solicitar-turno/solicitar-turno.component';
import { AtenderTurnoComponent } from './pages/atender-turno/atender-turno.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { EncuestaUsuarioComponent } from './pages/encuesta-usuario/encuesta-usuario.component';
import { EncuestaUsuarioDialogComponent } from './pages/encuesta-usuario-dialog/encuesta-usuario-dialog.component';
import { VisualizarEncuestaUsuarioDialogComponent } from './pages/visualizar-encuesta-usuario-dialog/visualizar-encuesta-usuario-dialog.component';
import { EncuestaProfesionalDialogComponent } from './pages/encuesta-profesional-dialog/encuesta-profesional-dialog.component';
import { VisualizarResenaUsuarioDialogComponent } from './pages/visualizar-resena-usuario-dialog/visualizar-resena-usuario-dialog.component';
import { BusquedasComponent } from './pages/busquedas/busquedas.component';
import { ListadoInicioSesionComponent } from './components/listado-inicio-sesion/listado-inicio-sesion.component';
import { InformeInicioSesionComponent } from './pages/informe-inicio-sesion/informe-inicio-sesion.component';


// Pipes
import { DatePipe } from '@angular/common';

import { HttpClientModule } from "@angular/common/http";
import { InformeOperacionesPorEspecialidadComponent } from './pages/informe-operaciones-por-especialidad/informe-operaciones-por-especialidad.component';
import { ListadoOperacionesPorEspecialidadComponent } from './components/listado-operaciones-por-especialidad/listado-operaciones-por-especialidad.component';

// Gráficos
import { HighchartsChartModule } from 'highcharts-angular';

// Exportar a Excel y otros formatos
import { MatTableExporterModule } from 'mat-table-exporter';
import { WidgetOperacionesPorEspecialidadComponent } from './components/widget-operaciones-por-especialidad/widget-operaciones-por-especialidad.component';
import { InformeTurnosPorDiaSemanaComponent } from './pages/informe-turnos-por-dia-semana/informe-turnos-por-dia-semana.component';
import { InformeProfesionalesPorTurnosComponent } from './pages/informe-profesionales-por-turnos/informe-profesionales-por-turnos.component';
import { InformeProfesionalesPorDiasTrabajadosComponent } from './pages/informe-profesionales-por-dias-trabajados/informe-profesionales-por-dias-trabajados.component';
import { ListadoProfesionalesPorDiasTrabajadosComponent } from './components/listado-profesionales-por-dias-trabajados/listado-profesionales-por-dias-trabajados.component';
import { ListadoProfesionalesPorEspecialidadComponent } from './components/listado-profesionales-por-especialidad/listado-profesionales-por-especialidad.component';
import { ListadoTurnosPorDiaSemanaComponent } from './components/listado-turnos-por-dia-semana/listado-turnos-por-dia-semana.component';
import { ListadoProfesionalesPorTurnosComponent } from './components/listado-profesionales-por-turnos/listado-profesionales-por-turnos.component';
import { ListadoPacientesPorEspecialidadComponent } from './components/listado-pacientes-por-especialidad/listado-pacientes-por-especialidad.component';
import { InformePacientesPorEspecialidadComponent } from './pages/informe-pacientes-por-especialidad/informe-pacientes-por-especialidad.component';
import { InformeDetalleRespuestasEncuestasComponent } from './pages/informe-detalle-respuestas-encuestas/informe-detalle-respuestas-encuestas.component';
import { ListadoCantidadRespuestasEncuestaComponent } from './components/listado-cantidad-respuestas-encuesta/listado-cantidad-respuestas-encuesta.component';
import { InformeTurnosPorPacientesComponent } from './pages/informe-turnos-por-pacientes/informe-turnos-por-pacientes.component';


@NgModule({
  declarations: [LoginComponent, RegistroPacienteComponent, RegistroProfesionalComponent, ConfirmacionRegistroComponent, HomeUsuarioComponent, MisTurnosComponent, GestionTurnosProfesionalComponent, GestionUsuariosComponent, ListadoUsuariosComponent, ListadoHorariosProfesionalesComponent, CambiarEstadoUsuarioDialogComponent, NuevoUsuarioAdminDialogComponent, SolicitarTurnoComponent, AtenderTurnoComponent, EncuestaUsuarioComponent, EncuestaUsuarioDialogComponent, VisualizarEncuestaUsuarioDialogComponent, EncuestaProfesionalDialogComponent, VisualizarResenaUsuarioDialogComponent, BusquedasComponent, ListadoInicioSesionComponent, InformeInicioSesionComponent, InformeOperacionesPorEspecialidadComponent, ListadoOperacionesPorEspecialidadComponent, WidgetOperacionesPorEspecialidadComponent, InformeTurnosPorDiaSemanaComponent, InformeProfesionalesPorTurnosComponent, InformeProfesionalesPorDiasTrabajadosComponent, ListadoProfesionalesPorDiasTrabajadosComponent, ListadoProfesionalesPorEspecialidadComponent, ListadoTurnosPorDiaSemanaComponent, ListadoProfesionalesPorTurnosComponent, ListadoPacientesPorEspecialidadComponent, InformePacientesPorEspecialidadComponent, InformeDetalleRespuestasEncuestasComponent, ListadoCantidadRespuestasEncuestaComponent, InformeTurnosPorPacientesComponent],
  
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule,
    FlexLayoutModule,
    RecaptchaModule,
    TurnosModule,
    RecaptchaFormsModule,
    HttpClientModule,
    MatTableExporterModule,
    HighchartsChartModule,
    GraficosModule

    
  ],


  exports: [LoginComponent],

  providers: [CurrencyPipe, DecimalPipe, PercentPipe, DatePipe]
})

export class UsuariosModule { }
