import { Especialidad } from './../../../usuarios/models/especialidad';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EspecialidadesDataService } from 'src/app/modules/especialidades/services/especialidades-data.service';
import { Columna } from 'src/app/modules/shared/components/tabla/columna';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-tabla-seleccion-especialidades',
  templateUrl: './tabla-seleccion-especialidades.component.html',
  styleUrls: ['./tabla-seleccion-especialidades.component.scss']
})
export class TablaSeleccionEspecialidadesComponent implements OnInit {

  datos;
  columnas: Columna[];
  columnaSeleccionar: Columna;
  @Output() filaSeleccionada: EventEmitter<any> = new EventEmitter<any>();

  constructor(private especialidadesDataService: EspecialidadesDataService) { }

  ngOnInit(): void {
    this.especialidadesDataService.traerTodasLasEspecialidades().subscribe(datosEspecialidades => this.datos = datosEspecialidades);
    this.inicializarColumnasEspecialidades();
  }

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.datos = this.datos.sort((a: Especialidad, b: Especialidad) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.datos = this.datos.sort((a: Especialidad, b: Especialidad) => b[keyName].localeCompare(a[keyName]));
    } else {
      return this.datos;
    }
  }

  inicializarColumnasEspecialidades(): void {

    this.columnaSeleccionar = {
      tituloColumna: 'Seleccionar',
      icono: 'check'
    }


    this.columnas = [
      {
        tituloColumna: 'Especialidad',
        valorFila: 'nombreEspecialidad',
        posicion: 'left',
        ordenable: true
      }
    ];
  }

  seleccionarFila(fila) {
    this.filaSeleccionada.emit(fila);
  }

}