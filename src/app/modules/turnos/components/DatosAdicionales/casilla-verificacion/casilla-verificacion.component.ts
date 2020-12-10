import { IComponente, TipoComponente } from './../icomponente';
import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-casilla-verificacion',
  templateUrl: './casilla-verificacion.component.html',
  styleUrls: ['./casilla-verificacion.component.scss']
})
export class CasillaVerificacionComponent implements OnInit, IComponente {

  @Output() evento: EventEmitter<any> = new EventEmitter<any>();

  @Input() tipoComponente: TipoComponente;
  @Input() titulo: string;
  @Input() id: number;
  valor: string;

  datosRetorno: IComponente;

  constructor() { }

  ngOnInit(): void {
  }

  cambioValor() {
    this.datosRetorno = {
      titulo: this.titulo,
      id: this.id,
      tipoComponente: this.tipoComponente,
      valor: this.valor
    }

    this.evento.emit(this.datosRetorno);
  }
}
  