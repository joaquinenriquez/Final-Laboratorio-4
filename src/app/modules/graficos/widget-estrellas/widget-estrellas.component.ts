import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

import { Component, Input, OnInit, SimpleChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DatosGrafico } from '../models/datos-grafico';

@Component({
  selector: 'app-widget-estrellas',
  templateUrl: './widget-estrellas.component.html',
  styleUrls: ['./widget-estrellas.component.scss']
})
export class WidgetEstrellasComponent implements OnInit, AfterViewInit {

  @Input() datos: DatosGrafico[] = [];
  total: number = 0;
  @Input() tituloGrafico: string = '';
  @Input() subtituloGrafico: string = '';
  @Input() nombreSerie: string = '';
  @Input() leyendaEjeVertical: string = '';
  @Input() cantidadRespuestas: number = 0;
  @Input() fontSize: number = 25;
  promedioCalificacion: number = 0;
  

  chartOptions: {};
  Highcharts: typeof Highcharts = Highcharts;

  @ViewChild('estrellas') estrellas: ElementRef;

  




  constructor() { }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
  
  }

  ngOnAfterInit(): void {
    setFractionalRating(this.estrellas.nativeElement, this.promedioCalificacion);
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
          formatter: function () {
            return this.value;
          }
        },
        title: {
          text: this.leyendaEjeVertical,
          style: {
            fontSize: this.fontSize
          }
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
  }

  public cargarGrafico3() {
    this.chartOptions = {
      chart: {
        type: 'bar',
        style: {
          fontFamily: 'roboto'
      },
      },
      title: {
        text: this.tituloGrafico,
        style: {
          fontSize: this.fontSize
        }
      },
      subtitle: {
        text: this.subtituloGrafico
      },
      xAxis: {
        type: 'category',
        labels: {
          formatter: function () {
            return '★' + ' ' + this.value;
          },
          style:
          {
            fontSize: 23
          },
        }
      },
      yAxis: {
        min: 0,
        tickInterval: 1,
        title: {
          text: 'Respuestas',
          align: 'high',
        },
        labels: {
          overflow: 'justify'
        },
        lineWidth: 0
      },
      tooltip: {
        valueSuffix: 'Cantidad de respuestas'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: this.nombreSerie,
          colorByPoint: true,
          showInLegend: false,
          data: this.datos,
          dataLabels: {
            enabled: true,
            inside: true,
            // rotation: -90,
            verticalAlign: 'center',
            align: 'left',
            x: 10,
            y: 0,
            formatter: function() {
              return this.y;
            },
            style: {
              fontSize:15
            }
          }
        }]
    }
  }





  ngOnChanges(changes: SimpleChanges): void {
    // Cuando cambia algun valor de los que recibimos por input se produce este evento
    if (changes.datos?.currentValue != undefined) {

      let sumaCalificacion = 0;

      this.datos.forEach(unDato => {

        sumaCalificacion += unDato.y * Number(unDato.name);

        switch (Number(unDato.name)) {
          case 5:
            unDato.color = '#9FC05A';
            break;

          case 4:
            unDato.color = '#ADD633';
            break;

          case 3:
            unDato.color = '#FFD834';
            break;

          case 2:
            unDato.color = '#FFB234';
            break;

          case 1:
            unDato.color = '#FF8B5A';
            break;

        }
      });

  
      this.datos.sort(function (a, b) {
        if (Number(a.name) < Number(b.name)) {
          return 1;
        }
        if (Number(a.name) > Number(b.name)) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

      this.total = this.datos.reduce((unValor, otroValor) => (unValor + otroValor.y), 0);

      this.promedioCalificacion = sumaCalificacion / this.total;
      

      this.cargarGrafico3();
  
    }
  }




}


function setFractionalRating(container, value) {
  var floor = Math.floor(value) ,
      ceil = Math.ceil(value) ,
      star = container.children[floor],
      slice = Array.prototype.slice,
      children = slice.call(container.children),
      visible = slice.call(children, 0, ceil),
      hidden = slice.call(children, ceil),
      size,
      width,
      portion;

  console.log(star);
  console.log(container);
  console.log(value, Math.floor(value));

  visible.forEach(function(star) {
      star.style.visibility = 'visible';
      star.style.width = '';
  });
  hidden.forEach(function(star) {
      star.style.visibility = 'hidden';
      star.style.width = '';
  });

  size = star && star.getBoundingClientRect();
  width = size && size.width;
  portion = value - floor;

  if (star && portion !== 0) {
    star.style.width = (width * portion) + 'px';
    console.log(star.style.width);
  }
      
}



