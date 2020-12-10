import { VerificarLoginGuard } from './../shared/guards/verificar-login.guard';
import { ListadoEspecialidadesComponent } from './components/listado-especialidades/listado-especialidades.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { 
    path: '', 
    children: 
    [
      { path: 'especialidades', component: ListadoEspecialidadesComponent}
    ],
    canActivate: [VerificarLoginGuard]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialidadesRoutingModule { }
