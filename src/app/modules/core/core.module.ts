import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ContenedorComponent } from './pages/contenedor/contenedor.component';


@NgModule({
  declarations: [HomeComponent, ContenedorComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ],
  exports: [ContenedorComponent]
})
export class CoreModule { }
