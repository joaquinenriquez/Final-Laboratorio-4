import { DatosSolicitudTurno } from './../../models/datos-solicitud-turno';
import { Profesional } from './../../../usuarios/models/profesional';
import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-confirmacion-solicitud-turno',
  templateUrl: './confirmacion-solicitud-turno.component.html',
  styleUrls: ['./confirmacion-solicitud-turno.component.scss']
})
export class ConfirmacionSolicitudTurnoComponent implements OnInit {

  @Input() datosTurnoConfirmado: DatosSolicitudTurno;

  @Output() turnoConfirmado: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);
  }

  confirmarTurno() {
    this.turnoConfirmado.emit(true);
  }

}
