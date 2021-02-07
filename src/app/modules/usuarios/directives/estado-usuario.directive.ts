import { EstadoUsuario } from './../models/estado-usuario.enum';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appEstadoUsuario]'
})
export class EstadoUsuarioDirective implements OnInit {

  @Input('appEstadoUsuario') estadoUsuario: string;

  constructor(private elemento: ElementRef) { }

  private pintarEstado(): void
  {

    this.elemento.nativeElement.style.fontWeight="bold" 

    switch(this.estadoUsuario) 
    {
      case "Pendiente Aprobación":
        this.elemento.nativeElement.style.color = '#FFC925';
        break;

      case "Habilitado":
        this.elemento.nativeElement.style.color = '#3BAF55';
      break;

      case "Deshabilitado":
        this.elemento.nativeElement.style.color = '#8E959B';
        break;

      default:
        this.elemento.nativeElement.style.color = '#1177D7';

    }

  }

  ngOnInit() {
    this.pintarEstado();
  }

}
