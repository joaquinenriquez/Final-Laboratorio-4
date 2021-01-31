import { DatosGrafico } from './../../models/datos-grafico';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

import { Component, Input, OnInit, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-widget-barras',
  templateUrl: './widget-barras.component.html',
  styleUrls: ['./widget-barras.component.scss']
})
export class WidgetBarrasComponent implements OnInit {


  @Input() datos: DatosGrafico[] = [];
  total: number = 0;
  datosPorcentaje: DatosGrafico[] = [];
  @Input() tituloGrafico: string = '';
  @Input() subtituloGrafico: string = '';
  @Input() nombreSerie: string = '';
  @Input() leyendaEjeVertical: string = '';

  chartOptions: {};
  Highcharts: typeof Highcharts = Highcharts;

  constructor() { }

  ngOnInit(): void {
  }


  public cargarGrafico2() {
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: this.tituloGrafico
      },
      subtitle: {
        text: this.subtituloGrafico
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        // min: 0,
        // max: 100,
        labels: {
          formatter: function() {
            return this.value;
          }
        },
        title: {
          text: this.leyendaEjeVertical
        }
        

      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            formatter: function() {
              let datos = this.series.data as DatosGrafico[];
              let total: number = datos.reduce((unValor, otroValor) => (unValor + otroValor.y), 0);
              
              return `Cant: ${this.y} (${((this.y * 100) / total).toFixed(2)} %)`; 

            },
          }
        }
      },

      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b><br/>',
        shared: true
    },

      series: [
        {
          name: this.nombreSerie,
          colorByPoint: true,
          data: this.datos
        }]
    }
  }

  




  ngOnChanges(changes: SimpleChanges): void {
    // Cuando cambia algun valor de los que recibimos por input se produce este evento
    if (changes.datos?.currentValue != undefined) {
      this.cargarGrafico2();

      this.datos.forEach(unDato => this.datosPorcentaje.push(Object.assign({}, unDato)));
      



    }
  }

}



