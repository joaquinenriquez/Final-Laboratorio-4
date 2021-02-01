import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DatosGrafico } from '../models/datos-grafico';

const Wordcloud = require('highcharts/modules/wordcloud');
Wordcloud(Highcharts);

@Component({
  selector: 'app-widget-nube-de-palabras',
  templateUrl: './widget-nube-de-palabras.component.html',
  styleUrls: ['./widget-nube-de-palabras.component.scss']
})
export class WidgetNubeDePalabrasComponent implements OnInit {

  @Input() datos: DatosGrafico[] = [];
  total: number = 0;
  datosPorcentaje: DatosGrafico[] = [];
  @Input() tituloGrafico: string = '';
  @Input() subtituloGrafico: string = '';
  @Input() nombreSerie: string = '';
  @Input() leyendaEjeVertical: string = '';
  @Input() fontSizeTitulo: number = 25;
  tipoGrafico

  chartOptions: {};
  Highcharts: typeof Highcharts = Highcharts;


  constructor() { }

  ngOnInit(): void {
    HC_exporting(Highcharts); // Para mostrar las opciones de exportación
  }

  cargarOpcionesNubeDePalabras() {
    this.chartOptions = 
    {
      accessibility: {
        screenReaderSection: {
            beforeChartFormat: '<h5>{chartTitle}</h5>' +
                '<div>{chartSubtitle}</div>' +
                '<div>{chartLongdesc}</div>' +
                '<div>{viewTableButton}</div>'
        }
    },
    series: [{
        type: 'wordcloud',
        data: this.datos,
        name: 'Ocurrencias'
    }],
    title: {
        text: this.tituloGrafico,
        style: {
          fontFamily: 'roboto',
          fontSize: this.fontSizeTitulo
      },
    }
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    // Cuando cambia algun valor de los que recibimos por input se produce este evento
    if (changes.datos?.currentValue != undefined) {
      this.datos.forEach(unDato => unDato['weight'] = unDato.y);
      this.cargarOpcionesNubeDePalabras();
    }
  }

}



