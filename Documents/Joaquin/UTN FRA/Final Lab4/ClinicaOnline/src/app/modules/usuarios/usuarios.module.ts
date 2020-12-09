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


@NgModule({
  declarations: [LoginComponent, RegistroPacienteComponent, RegistroProfesionalComponent, ConfirmacionRegistroComponent, HomeUsuarioComponent, MisTurnosComponent, GestionTurnosProfesionalComponent, GestionUsuariosComponent, ListadoUsuariosComponent, ListadoHorariosProfesionalesComponent, CambiarEstadoUsuarioDialogComponent, NuevoUsuarioAdminDialogComponent, SolicitarTurnoComponent, AtenderTurnoComponent],
  
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule,
    FlexLayoutModule,

    TurnosModule

    
  ],


  exports: [LoginComponent],

  providers: [CurrencyPipe, DecimalPipe, PercentPipe]
})

export class UsuariosModule { }
