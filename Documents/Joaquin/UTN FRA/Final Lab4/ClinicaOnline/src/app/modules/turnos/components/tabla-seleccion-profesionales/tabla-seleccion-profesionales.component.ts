import { UsuarioDataService } from '../../../usuarios/services/usuario-data.service';
import { Profesional } from '../../../usuarios/models/profesional';
import { Columna } from '../../../shared/components/tabla/columna';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Rol } from 'src/app/modules/usuarios/models/rol.enum';

@Component({
  selector: 'app-tabla-seleccion-profesionales',
  templateUrl: './tabla-seleccion-profesionales.component.html',
  styleUrls: ['./tabla-seleccion-profesionales.component.scss']
})
export class TablaSeleccionProfesionalesComponent implements OnInit {

  datos;
  columnas: Columna[];
  columnaSeleccionar: Columna;
  tipoBusqueda = 1;
  @Output() filaSeleccionada: EventEmitter<any> = new EventEmitter<any>();
  

  constructor(private usuarioDataService: UsuarioDataService) { }

  ngOnInit(): void {
    this.usuarioDataService.TraerTodosLosUsuariosPorRol(Rol.Profesional).subscribe(datosProfesionales => this.datos = datosProfesionales);
    this.inicializarColumnasProfesional();
  }

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.datos = this.datos.sort((a: Profesional, b: Profesional) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.datos = this.datos.sort((a: Profesional, b: Profesional) => b[keyName].localeCompare(a[keyName]));
    } else {
      return this.datos;
    }
  }

  removeOrder(order: Profesional) {
    this.datos = this.datos.filter(item => item.idUsuario !== order.idUsuario)
  }

  inicializarColumnasProfesional(): void {

    this.columnaSeleccionar = {
      tituloColumna: 'Seleccionar',
      icono: 'check'
    }


    this.columnas = [
      {
        tituloColumna: 'Profesional',
        valorFila: 'displayName',
        posicion: 'left',
        ordenable: true
      },
      {
        tituloColumna: 'Especialidades',
        valorFila: 'especialidades',
        posicion: 'left',
        ordenable: false
      }
    ];
  }

  seleccionarFila(fila) {
    this.filaSeleccionada.emit(fila);
  }

}
