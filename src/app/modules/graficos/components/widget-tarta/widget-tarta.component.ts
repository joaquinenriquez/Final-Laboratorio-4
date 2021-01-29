import { DatosGrafico } from './../../models/datos-grafico';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-widget-tarta',
  templateUrl: './widget-tarta.component.html',
  styleUrls: ['./widget-tarta.component.scss']
})
export class WidgetTartaComponent implements OnInit {


  @Input() datos: DatosGrafico[] =  [];
  @Input() tituloGrafico: string = '';

  chartOptions: {};
  Highcharts: typeof Highcharts = Highcharts;

  constructor() { }

  ngOnInit(): void {
  }

  public cargarGrafico() {
    this.chartOptions =
    {
      chart:
      {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },

      title:
      {
        text: this.tituloGrafico
      },

      tooltip:
      {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },

      accessibility:
      {
        point: 
        {
          valueSuffix: '%'
        }
      },

      credits: 
      {
        enabled: false
      },

      plotOptions: {

        pie:
        {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels:
          {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} % ({point.y})',
            style:
            {
              fontSize: 18
            },
          },
        }
      },

      series: 
      [{
        name: 'Cantidad',
        colorByPoint: true,
        data: this.datos
      }]
    
    };
 

    HC_exporting(Highcharts);

    // Esto nose muy bien para que lo puse, pero lo vi en un tuto :P
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);

  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    // Cuando cambia algun valor de los que recibimos por input se produce este evento
    if (changes.datos?.currentValue != undefined) {
      this.cargarGrafico();
    }
  }

}
