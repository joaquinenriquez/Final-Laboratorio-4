import { SelectorEspecialidadDialogComponent } from './../../../turnos/components/selector-especialidad-dialog/selector-especialidad-dialog.component';
import { TipoBusqueda } from './../../../turnos/models/tipo-busqueda.enum';
import { DatosSolicitudTurno } from './../../../turnos/models/datos-solicitud-turno';
import { Especialidad } from './../../models/especialidad';
import { Router } from '@angular/router';
import { TurnosDataService } from './../../../turnos/services/turnos-data.service';
import { Profesional } from './../../models/profesional';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { UsuarioDataService } from '../../services/usuario-data.service';
import firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { MatStepper } from '@angular/material/stepper';
import { Turno } from 'src/app/modules/turnos/models/turno';
import { EstadoTurno } from 'src/app/modules/turnos/models/estado-turno.enum';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = true;

  tipoBusqueda = TipoBusqueda.Profesional;

  datosDiaSeleccionado: DatosSolicitudTurno[];
  datosTurnoConfirmado: DatosSolicitudTurno;
  
  profesionalSeleccionado: Profesional;
  especialidadSeleccionada: Especialidad;
  horarioSeleccionado: string;


  @ViewChild(MatStepper) stepper: MatStepper;



  datosUsuarioActual;


  constructor(private usuarioDataService: UsuarioDataService, 
              private authService: AuthService, 
              private _formBuilder: FormBuilder,
              private turnosDataService: TurnosDataService,
              private router: Router,
              private dialog: MatDialog) {

    this.authService.datosUsuario.subscribe(datosUsuario => {
      let usuario = datosUsuario as firebase.User;
      this.usuarioDataService.TraerUsuarioPorId(usuario?.uid).subscribe(datosUsuario => {
        this.datosUsuarioActual = datosUsuario;
      });
    })
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      //firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      //secondCtrl: ['', Validators.required]
    });
  }

  cambiarTipoBusqueda(tipoBusqueda: MatRadioChange) {
    this.tipoBusqueda = tipoBusqueda.value;
  }

  mostrarHorarios(datosTurno: DatosSolicitudTurno[]) {
    this.datosDiaSeleccionado = datosTurno;
  }

  seleccionarProfesional(profesional: Profesional) {
    
    this.profesionalSeleccionado = profesional;
    
    let especialidad = <Especialidad>{};

    // Si el profesional tiene una sola especialidad
    if (this.profesionalSeleccionado.especialidades.length == 1) {
      especialidad.nombreEspecialidad =  this.profesionalSeleccionado.especialidades[0];
      this.especialidadSeleccionada = especialidad;  
      this.stepper.next();
    } else {

      const dialogoReg = this.dialog.open(SelectorEspecialidadDialogComponent, {width: '400px', data: profesional.especialidades});

      dialogoReg.afterClosed().subscribe(resultadoDialogo => {
      
        if (resultadoDialogo != undefined ) {
          especialidad.nombreEspecialidad = resultadoDialogo;
          this.stepper.next();
          this.especialidadSeleccionada = especialidad;  
        } 
      })
    }
  }

  seleccionarEspecialidad(especialidad: Especialidad) {
    this.especialidadSeleccionada = especialidad;
    this.stepper.next();
  }


  seleccionarHorario(datosTurno: DatosSolicitudTurno) {
    datosTurno.especialidadSeleccionada = this.especialidadSeleccionada;
    this.datosTurnoConfirmado = datosTurno;
    this.stepper.next();
  }


  confirmarTurno() {

    let nuevoTurno: Turno = {

      idProfesional: this.datosTurnoConfirmado.profesionalSeleccionado.idUsuario,
      nombreProfesional: this.datosTurnoConfirmado.profesionalSeleccionado.displayName,
      especialidadProfesional: this.datosTurnoConfirmado.especialidadSeleccionada.nombreEspecialidad,

      fechaTurno: firebase.firestore.Timestamp.fromDate(this.datosTurnoConfirmado.diaSeleccionado),
      horarioTurno: this.datosTurnoConfirmado.horarioSeleccionado,
      duracionEstimada: 30,
      estadoTurno: EstadoTurno.Pendiente_Confirmar,

      idUsuario: this.datosUsuarioActual.idUsuario,
      nombreUsuario: this.datosUsuarioActual.displayName
    }

    console.log(nuevoTurno);
    this.turnosDataService.nuevaTurno(nuevoTurno).then(resultado => {
      Swal.fire({
        title: 'Ya reservamos tu turno!',
        text: 'Ahora tenés aguardar que el profesional lo confirme',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => this.router.navigate(['/mis-turnos']));
    });

    console.log(this.datosTurnoConfirmado);

  }




}

