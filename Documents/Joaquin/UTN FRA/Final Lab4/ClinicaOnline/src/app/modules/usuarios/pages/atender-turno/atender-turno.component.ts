
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TurnosDataService } from 'src/app/modules/turnos/services/turnos-data.service';
import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { UsuarioDataService } from '../../services/usuario-data.service';
import firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';
import { Turno } from 'src/app/modules/turnos/models/turno';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-atender-turno',
  templateUrl: './atender-turno.component.html',
  styleUrls: ['./atender-turno.component.scss']
})
export class AtenderTurnoComponent implements OnInit {

  datosUsuarioActual;
  idTurnoSeleccionado: string;
  turnoSeleccionado: Turno;
  usuarioTurno: Usuario;

  demoForm: FormGroup;

  @ViewChild('target', {
    read: ViewContainerRef
  }) target;
  @Input() type;
  cmpRef: ComponentRef<any>;
  private isViewInitialized: boolean = false;

  referenciaComponente: ComponentRef<any>;
  @ViewChild("target" , {read: ViewContainerRef}) private vcr: ViewContainerRef;
   
  arrayItems: {
    id: number;
    title: string;
  }[];

  constructor(private usuarioDataService: UsuarioDataService,
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private turnoDataService: TurnosDataService,
    private formBuilder: FormBuilder,
    private cvRef: ViewContainerRef, 
    private resolver: ComponentFactoryResolver,
    ) {

      this.idTurnoSeleccionado = this.activateRoute.snapshot.params.id;

      this.demoForm = this.formBuilder.group({
        arrayCampos: this.formBuilder.array([])
      })

  }

  ngOnInit(): void {
    
    
    this.authService.datosUsuario.subscribe(datosUsuario => {
      let usuario = datosUsuario as firebase.User;
      this.usuarioDataService.TraerUsuarioPorId(usuario?.uid).subscribe(datosUsuario => {
        this.datosUsuarioActual = datosUsuario;
      });
    })

    this.turnoDataService.traerTurnoPorId(this.idTurnoSeleccionado).subscribe(datosTurno => {
    
      this.turnoSeleccionado = datosTurno

      this.usuarioDataService.TraerUsuarioPorId(datosTurno.idUsuario).subscribe(datosUsuarioTurno => {
        this.usuarioTurno = datosUsuarioTurno;
      })

      this.arrayItems = [];
    
    });

  }


  get demoArray() {
    return this.demoForm.get('demoArray') as FormArray;
 }
 addItem(item) {
    this.arrayItems.push(item);
    this.demoArray.push(this.formBuilder.control(false));
 }
 removeItem() {
    this.arrayItems.pop();
    this.demoArray.removeAt(this.demoArray.length - 1);
 }

 async agregarDato() {
  //this.cvRef.clear();
  const { TextoComponent } = await import('./../../../turnos/components/DatosAdicionales/texto/texto.component');
  //this.cvRef.createEmbeddedView((this.resolver.resolveComponentFactory(TextoComponent));

  // this.referenciaComponente = this.target.createComponent(TextoComponent);
  // this.cvRef.

  let resolver = this.resolver.resolveComponentFactory(TextoComponent);
  let componentFactory =  this.vcr.createComponent(resolver);
  
  
}



}