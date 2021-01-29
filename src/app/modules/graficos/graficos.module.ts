import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetTartaComponent } from './components/widget-tarta/widget-tarta.component';

// Gráficos
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [WidgetTartaComponent],
  imports: [
    CommonModule,
    HighchartsChartModule,
    MaterialModule
  ],

  exports: [WidgetTartaComponent]

})
export class GraficosModule { }
