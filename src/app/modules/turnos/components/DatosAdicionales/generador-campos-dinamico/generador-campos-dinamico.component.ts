import { TextoNumericoComponent } from './../texto-numerico/texto-numerico.component';
import { CasillaVerificacionComponent } from './../casilla-verificacion/casilla-verificacion.component';
import { IComponente } from './../icomponente';
import { TextoComponent } from './../texto/texto.component';
import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { PlaceholderDirective } from '../../../directives/placeholder.directive';
import { RangoComponent } from '../rango/rango.component';


@Component({
  selector: 'app-generador-campos-dinamico',
  templateUrl: './generador-campos-dinamico.component.html',
  styleUrls: ['./generador-campos-dinamico.component.scss']
})
export class GeneradorCamposDinamicoComponent implements OnInit {

  /**Here we grab reference placeholder directive  */
  @ViewChild(PlaceholderDirective, {static: true}) placeholder: PlaceholderDirective;

  @Output() changeEmit: EventEmitter<string> = new EventEmitter<string>();
  /**An array where we register what component we want to load */
  components = [TextoComponent, CasillaVerificacionComponent, TextoNumericoComponent, RangoComponent];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
  }


  public loadComponent(datosComponente: IComponente){

    console.log('adsd', datosComponente);
    /** Preparing our component for creation */
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.components[datosComponente.tipoComponente]);
    /** Grabbing reference of our view placeholder */
    const viewContainerRef = this.placeholder.viewContainerRef;
    /** Clearing our placeholder  */
    //viewContainerRef.clear();
    /** Magic of creating a component instance  */
    const componentRef = viewContainerRef.createComponent(componentFactory);
    /** 
     * @Input data into our instance.
     */
    (componentRef.instance as IComponente).titulo = datosComponente.titulo;
    (componentRef.instance as IComponente).id = datosComponente.id;
    (componentRef.instance as IComponente).tipoComponente = datosComponente.tipoComponente;
    /** @Output data from our instance  */
    (componentRef.instance as IComponente).evento.subscribe(
      data => this.changeEmit.emit(data)
    );
  }
}