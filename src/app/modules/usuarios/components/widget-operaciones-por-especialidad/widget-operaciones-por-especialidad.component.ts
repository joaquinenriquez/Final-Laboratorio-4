import { Component, OnInit } from '@angular/core';


import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-operaciones-por-especialidad',
  templateUrl: './widget-operaciones-por-especialidad.component.html',
  styleUrls: ['./widget-operaciones-por-especialidad.component.scss']
})
export class WidgetOperacionesPorEspecialidadComponent implements OnInit {

  chartOptions: {};
  Highcharts: typeof Highcharts = Highcharts;

  constructor() { }

  ngOnInit(): void {
  }

  public cargarGrafico(datos) {
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Operaciones por especialidad'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      credits: {
        enabled:false
      },
      plotOptions: {
        
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} % ({point.y})',
            style: {
              fontSize: 18
          },
          },
        }
      },
      series: [{
        name: 'Cantidad',
        colorByPoint: true,
        data:datos
      }]
    } ;


    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

}
