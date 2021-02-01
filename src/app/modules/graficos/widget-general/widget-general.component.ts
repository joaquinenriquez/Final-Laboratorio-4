import { Columna } from './../../shared/components/tabla/columna';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DatosGrafico } from '../models/datos-grafico';


@Component({
  selector: 'app-widget-general',
  templateUrl: './widget-general.component.html',
  styleUrls: ['./widget-general.component.scss']
})
export class WidgetGeneralComponent implements OnInit {

  @Input() datos: DatosGrafico[] = [];
  total: number = 0;
  datosPorcentaje: DatosGrafico[] = [];
  @Input() tituloGrafico: string = '';
  @Input() subtituloGrafico: string = '';
  @Input() nombreSerie: string = '';
  @Input() leyendaEjeVertical: string = '';
  @Input() fontSizeTitulo: number = 25;
  @Input() graficoSeleccionado: TipoGrafico

  TipoGrafico = TipoGrafico;

  

  chartOptions: {};
  Highcharts: typeof Highcharts = Highcharts;


  constructor() { }

  ngOnInit(): void {
    HC_exporting(Highcharts); // Para mostrar las opciones de exportación
  }


  cargarOpcionesGraficoBarrasVerticales() {

    this.chartOptions =
    {
      chart: {
        type: 'column',
        style: {
          fontFamily: 'roboto'
      }
      },
      title: {
        text: this.tituloGrafico,
        style: {
          fontSize: this.fontSizeTitulo
        }
      },
      subtitle: {
        text: this.subtituloGrafico
      },
      credits: {
        enabled: false
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category',
        visible: true
      },
      yAxis: {
        // min: 0,
        // max: 100,
        labels: {
          formatter: function () {
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
            formatter: function () {
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

    // Esto nose muy bien para que lo puse, pero lo vi en un tuto :P
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  cargarOpcionesGraficoBarrasHorizontales() {

    this.chartOptions =
    {
      chart: {
        type: 'bar',
        style: {
          fontFamily: 'roboto'
      }
      },
      title: {
        text: this.tituloGrafico,
        style: {
          fontSize: this.fontSizeTitulo
        }
      },
      subtitle: {
        text: this.subtituloGrafico
      },
      credits: {
        enabled: false
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category',
        visible: true
      },
      yAxis: {
        // min: 0,
        // max: 100,
        labels: {
          formatter: function () {
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
            formatter: function () {
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

    // Esto nose muy bien para que lo puse, pero lo vi en un tuto :P
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  cargarOpcionesGraficoTarta() {
    this.chartOptions =
    {
      chart:
      {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        style: {
          fontFamily: 'roboto'
      },
      },
      xAxis :{
        visible : false
      },
      title:
      {
        text: this.tituloGrafico,
        style: {
          fontSize: this.fontSizeTitulo
        }
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

    // Esto nose muy bien para que lo puse, pero lo vi en un tuto :P
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);

  }


  cambiarGrafico() {
    console.log(this.graficoSeleccionado);

    switch (this.graficoSeleccionado) {
      case TipoGrafico.Tartas:
        this.cargarOpcionesGraficoTarta();
        break;

      case TipoGrafico.Barras:
        this.cargarOpcionesGraficoBarrasVerticales();
        break;

      case TipoGrafico.Barras2:
        this.cargarOpcionesGraficoBarrasHorizontales();
        break;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Cuando cambia algun valor de los que recibimos por input se produce este evento
    if (changes.datos?.currentValue != undefined) {
      this.datos.forEach(unDato => this.datosPorcentaje.push(Object.assign({}, unDato)));
      this.cambiarGrafico();
    }
  }

}

export enum TipoGrafico {
  Tartas = 'tartas',
  Barras = 'barras',
  Barras2 = 'barras2'
}



