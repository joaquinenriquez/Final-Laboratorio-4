import { IComponente, TipoComponente } from './../icomponente';
import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-texto-numerico',
  templateUrl: './texto-numerico.component.html',
  styleUrls: ['./texto-numerico.component.scss']
})
export class TextoNumericoComponent implements OnInit, IComponente {

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
