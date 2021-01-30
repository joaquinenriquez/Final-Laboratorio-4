import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponente, TipoComponente } from '../icomponente';

@Component({
  selector: 'app-rango',
  templateUrl: './rango.component.html',
  styleUrls: ['./rango.component.scss']
})
export class RangoComponent implements OnInit {

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
  