import { TurnosDataService } from 'src/app/modules/turnos/services/turnos-data.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Turno } from '../../models/turno';

@Component({
  selector: 'app-datos-turnos-bar',
  templateUrl: './datos-turnos-bar.component.html',
  styleUrls: ['./datos-turnos-bar.component.scss']
})
export class DatosTurnosBarComponent implements OnInit {

  @Input() turno: Turno;
  @Output() resultado: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit(): void {
    console.log('usuario', this.turno);
  }

  finalizarTurno() {
    this.resultado.emit(true);
  }

  cancelarAtencion() {
    this.resultado.emit(false);
  }

}
