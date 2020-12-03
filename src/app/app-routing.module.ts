import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'registro-pacientes',
        loadChildren: () =>
          import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule)
      },

      {
        path: 'registro-profesionales',
        loadChildren: () =>
          import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule)
      },

      {
        path: 'login',
        loadChildren: () =>
          import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule)
      },

      {
        path: 'home',
        loadChildren: () =>
          import('./modules/core/core.module').then(m => m.CoreModule)
      },


      {
        path: 'especialidades',
        loadChildren: () =>
          import('./modules/especialidades/especialidades.module').then(m => m.EspecialidadesModule)
      }

    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
