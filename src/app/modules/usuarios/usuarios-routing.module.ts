import { ListadoEspecialidadesComponent } from './../especialidades/components/listado-especialidades/listado-especialidades.component';
import { EncuestaUsuarioComponent } from './pages/encuesta-usuario/encuesta-usuario.component';
import { HomeComponent } from './../core/pages/home/home.component';
import { AtenderTurnoComponent } from './pages/atender-turno/atender-turno.component';
import { VerificarLoginGuard } from './../shared/guards/verificar-login.guard';

import { GestionUsuariosComponent } from './pages/gestion-usuarios/gestion-usuarios.component';
import { GestionTurnosProfesionalComponent } from './pages/gestion-turnos-profesional/gestion-turnos-profesional.component';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { RegistroProfesionalComponent } from './pages/registro-profesional/registro-profesional.component';
import { HomeUsuarioComponent } from './pages/home-usuario/home-usuario.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroPacienteComponent } from './pages/registro-paciente/registro-paciente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitarTurnoComponent } from './pages/solicitar-turno/solicitar-turno.component';
import { VerificarNoLoginGuard } from '../shared/guards/verificar-no-login.guard';

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
      { path: 'encuesta-usuario', component: EncuestaUsuarioComponent, canActivate: [VerificarLoginGuard]},
      { path: 'atender-turno/:id', component: AtenderTurnoComponent, canActivate: [VerificarLoginGuard]},
      { path: 'home', component: HomeComponent, canActivate: [VerificarLoginGuard]},
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
