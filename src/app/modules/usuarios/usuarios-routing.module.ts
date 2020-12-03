import { GestionUsuariosComponent } from './pages/gestion-usuarios/gestion-usuarios.component';
import { GestionTurnosProfesionalComponent } from './pages/gestion-turnos-profesional/gestion-turnos-profesional.component';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { RegistroProfesionalComponent } from './pages/registro-profesional/registro-profesional.component';
import { HomeUsuarioComponent } from './pages/home-usuario/home-usuario.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroPacienteComponent } from './pages/registro-paciente/registro-paciente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    children: 
    [
      { path: 'login', component: LoginComponent},
      { path: 'registro-pacientes', component: RegistroPacienteComponent},
      { path: 'registro-profesionales', component: RegistroProfesionalComponent},
      { path: 'home-usuario', component: HomeUsuarioComponent},
      { path: 'mis-turnos', component: MisTurnosComponent},
      { path: 'gestion-turnos', component: GestionTurnosProfesionalComponent},
      { path: 'gestion-usuarios', component: GestionUsuariosComponent},
    ]
  },


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
