import { InformeUsuariosComponent } from './pages/informe-usuarios/informe-usuarios.component';
import { InformeProfesionalesPorEspecialidadComponent } from './pages/informe-profesionales-por-especialidad/informe-profesionales-por-especialidad.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { InformeTurnosPorPacientesComponent } from './pages/informe-turnos-por-pacientes/informe-turnos-por-pacientes.component';
import { InformeDetalleRespuestasEncuestasComponent } from './pages/informe-detalle-respuestas-encuestas/informe-detalle-respuestas-encuestas.component';
import { InformePacientesPorEspecialidadComponent } from './pages/informe-pacientes-por-especialidad/informe-pacientes-por-especialidad.component';
import { InformeProfesionalesPorDiasTrabajadosComponent } from './pages/informe-profesionales-por-dias-trabajados/informe-profesionales-por-dias-trabajados.component';
import { InformeProfesionalesPorTurnosComponent } from './pages/informe-profesionales-por-turnos/informe-profesionales-por-turnos.component';
import { InformeTurnosPorDiaSemanaComponent } from './pages/informe-turnos-por-dia-semana/informe-turnos-por-dia-semana.component';
import { InformeOperacionesPorEspecialidadComponent } from './pages/informe-operaciones-por-especialidad/informe-operaciones-por-especialidad.component';
import { InformeInicioSesionComponent } from './pages/informe-inicio-sesion/informe-inicio-sesion.component';
import { BusquedasComponent } from './pages/busquedas/busquedas.component';
import { ListadoEspecialidadesComponent } from './../especialidades/components/listado-especialidades/listado-especialidades.component';
import { EncuestaUsuarioComponent } from './pages/encuesta-usuario/encuesta-usuario.component';
import { HomeComponent } from './../core/pages/home/home.component';
import { AtenderTurnoComponent } from './pages/atender-turno/atender-turno.component';
import { VerificarLoginGuard } from './../shared/guards/verificar-login.guard';

import { GestionUsuariosComponent } from './pages/gestion-usuarios/gestion-usuarios.component';
import { GestionTurnosProfesionalComponent } from './pages/gestion-turnos-profesional/gestion-turnos-profesional.component';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { RegistroProfesionalComponent } from './pages/registro-profesional/registro-profesional.component';

import { LoginComponent } from './pages/login/login.component';
import { RegistroPacienteComponent } from './pages/registro-paciente/registro-paciente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitarTurnoComponent } from './pages/solicitar-turno/solicitar-turno.component';


const routes: Routes = [
  { 
    path: '', 
    children: 
    [
      { path: 'login', component: LoginComponent},
      { path: 'registro-pacientes', component: RegistroPacienteComponent },
      { path: 'especialidades',  data: {animation: 'Mover-Derecha'}, component: ListadoEspecialidadesComponent},
      { path: 'registro-profesionales', component: RegistroProfesionalComponent},
      { path: 'mis-turnos', data: {animation: 'Mover-Izquierda'}, component: MisTurnosComponent, canActivate: [VerificarLoginGuard]},
      { path: 'gestion-turnos', component: GestionTurnosProfesionalComponent, canActivate: [VerificarLoginGuard]},
      { path: 'gestion-usuarios',  data: {animation: 'Mover-Izquierda'}, component: GestionUsuariosComponent, canActivate: [VerificarLoginGuard]},
      { path: 'solicitar-turno', data: {animation: 'Mover-Derecha'}, component: SolicitarTurnoComponent, canActivate: [VerificarLoginGuard]},
      { path: 'busquedas', data: {animation: 'Mover-Derecha'}, component: BusquedasComponent, canActivate: [VerificarLoginGuard]},
      { path: 'encuesta-usuario', component: EncuestaUsuarioComponent, canActivate: [VerificarLoginGuard]},
      { path: 'atender-turno/:id', component: AtenderTurnoComponent, canActivate: [VerificarLoginGuard]},
      { path: 'home', component: HomeComponent, canActivate: [VerificarLoginGuard]},
      { path: 'informe-inicio-sesion', component: InformeInicioSesionComponent, canActivate: [VerificarLoginGuard]},
      { path: 'informe-operaciones-por-especialidad', component: InformeOperacionesPorEspecialidadComponent, canActivate: [VerificarLoginGuard]},
      { path: 'informe-turnos-por-dia-semana', component: InformeTurnosPorDiaSemanaComponent, canActivate: [VerificarLoginGuard]},
      { path: 'informe-profesionales-por-turnos', component: InformeProfesionalesPorTurnosComponent, canActivate: [VerificarLoginGuard]},
      { path: 'informe-profesionales-por-dias-trabajados', component: InformeProfesionalesPorDiasTrabajadosComponent, canActivate: [VerificarLoginGuard]},
      { path: 'informe-pacientes-por-especialidad', component: InformePacientesPorEspecialidadComponent, canActivate: [VerificarLoginGuard]},
      { path: 'informe-detalle-respuestas-encuestas', component: InformeDetalleRespuestasEncuestasComponent, canActivate: [VerificarLoginGuard]},
      { path: 'informe-turnos-por-paciente', component: InformeTurnosPorPacientesComponent, canActivate: [VerificarLoginGuard]},
      { path: 'informe-usuarios', component: InformeUsuariosComponent, canActivate: [VerificarLoginGuard]},
      { path: 'informe-profesionales-por-especialidad', component: InformeProfesionalesPorEspecialidadComponent, canActivate: [VerificarLoginGuard]},
      { path: 'perfil-usuario', component: PerfilUsuarioComponent, canActivate: [VerificarLoginGuard]},
      { path: '', component: HomeComponent, canActivate: [VerificarLoginGuard]},
      { path: '**', redirectTo: '', pathMatch: 'full', canActivate: [VerificarLoginGuard]} 
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
