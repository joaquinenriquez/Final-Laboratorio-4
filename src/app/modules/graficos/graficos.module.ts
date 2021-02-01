

import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// Gráficos
import { HighchartsChartModule } from 'highcharts-angular';

// Widget
import { WidgetTartaComponent } from './components/widget-tarta/widget-tarta.component';
import { WidgetBarrasComponent } from './components/widget-barras/widget-barras.component';
import { WidgetEstrellasComponent } from './widget-estrellas/widget-estrellas.component';

// Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout';
import { WidgetGeneralComponent } from './widget-general/widget-general.component';
import { WidgetNubeDePalabrasComponent } from './widget-nube-de-palabras/widget-nube-de-palabras.component';

@NgModule({
  declarations: [WidgetTartaComponent, WidgetBarrasComponent, WidgetEstrellasComponent, WidgetGeneralComponent, WidgetNubeDePalabrasComponent],
  imports: [
    CommonModule,
    HighchartsChartModule,
    MaterialModule,
    FlexLayoutModule
  ],

  exports: [WidgetTartaComponent, WidgetBarrasComponent, WidgetEstrellasComponent, WidgetGeneralComponent, WidgetNubeDePalabrasComponent]

})
export class GraficosModule { }
