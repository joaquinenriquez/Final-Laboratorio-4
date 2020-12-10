import { IComponente, TipoComponente } from './../icomponente';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.component.html',
  styleUrls: ['./texto.component.scss']
})
export class TextoComponent implements OnInit, IComponente {
  
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
