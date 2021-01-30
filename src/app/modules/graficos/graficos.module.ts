

import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// Gráficos
import { HighchartsChartModule } from 'highcharts-angular';

// Widget
import { WidgetTartaComponent } from './components/widget-tarta/widget-tarta.component';
import { WidgetBarrasComponent } from './components/widget-barras/widget-barras.component';

@NgModule({
  declarations: [WidgetTartaComponent, WidgetBarrasComponent],
  imports: [
    CommonModule,
    HighchartsChartModule,
    MaterialModule
  ],

  exports: [WidgetTartaComponent, WidgetBarrasComponent]

})
export class GraficosModule { }
