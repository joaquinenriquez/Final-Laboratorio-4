import { EncuestaProfesionalDialogComponent } from './../encuesta-profesional-dialog/encuesta-profesional-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { IComponente, TipoComponente } from './../../../turnos/components/DatosAdicionales/icomponente';
import { GeneradorCamposDinamicoComponent } from './../../../turnos/components/DatosAdicionales/generador-campos-dinamico/generador-campos-dinamico.component';

import { FormControl, FormGroup } from '@angular/forms';
import { TurnosDataService } from 'src/app/modules/turnos/services/turnos-data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { UsuarioDataService } from '../../services/usuario-data.service';
import firebase from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';
import { Turno } from 'src/app/modules/turnos/models/turno';
import { Usuario } from '../../models/usuario';
import { DefinirTituloDialogComponent } from 'src/app/modules/turnos/components/DatosAdicionales/definir-titulo-dialog/definir-titulo-dialog.component';
import { EstadoTurno } from 'src/app/modules/turnos/models/estado-turno.enum';
import Swal from 'sweetalert2';
import { Encuesta, PreguntaEncuesta } from 'src/app/modules/turnos/models/encuesta';
import { EncuestaUsuarioDialogComponent } from '../encuesta-usuario-dialog/encuesta-usuario-dialog.component';

@Component({
  selector: 'app-atender-turno',
  templateUrl: './atender-turno.component.html',
  styleUrls: ['./atender-turno.component.scss']
})
export class AtenderTurnoComponent implements OnInit {

  @ViewChild('generadorCampos') generadorDeDatos: GeneradorCamposDinamicoComponent;

  TipoComponente = TipoComponente;

  datosUsuarioActual;
  idTurnoSeleccionado: string;
  turnoSeleccionado: Turno;
  usuarioTurno: Usuario;

  componentesAdicionales: IComponente[] = [];
  idComponente = 0;

  formDatosTurno: FormGroup = new FormGroup({
    edad: new FormControl(''),
    peso: new FormControl(''),
    temperatura: new FormControl(''),
    altura: new FormControl('')
  });
  encuestaDataService: any;



  constructor(private usuarioDataService: UsuarioDataService,
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private turnoDataService: TurnosDataService,
    private dialog: MatDialog,
    private router: Router
  ) {

    this.idTurnoSeleccionado = this.activateRoute.snapshot.params.id;
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

    });

  }




  agregarDato(tipoComponente: TipoComponente) {

    let nombreDato = '';
    let tituloDialogo;

    switch (tipoComponente) {
      case 0:
        tituloDialogo = "Tipo de dato texto"
        break;

      case 1:
        tituloDialogo = "Casilla de verificación"
        break;

      case 2:
        tituloDialogo = "Tipo de dato numérico"
        break;
    }




    const dialogoReg = this.dialog.open(DefinirTituloDialogComponent,
      {
        width: '400px',
        data: tituloDialogo
      });

    dialogoReg.afterClosed().subscribe(resultadoDialogo => {

      if (resultadoDialogo != undefined) {
        nombreDato = resultadoDialogo;

        let nuevoComponente: IComponente = {

          id: this.idComponente,
          titulo: nombreDato,
          tipoComponente: tipoComponente,
          valor: ''

        };

        this.idComponente++;
        this.generadorDeDatos.loadComponent(nuevoComponente);
        this.componentesAdicionales.push(nuevoComponente);

      }
    })
  }

  cambioEnDatos(datosComponente: IComponente) {
    this.componentesAdicionales[datosComponente.id] = datosComponente;
  }

  finalizarTurno(resultado: boolean) {

    if (!resultado) {
      this.turnoSeleccionado.estadoTurno = EstadoTurno.Confirmado;
      this.turnoDataService.modificarTurno(this.turnoSeleccionado).then(() => this.router.navigate(['/gestion-turnos']));
      return;
    }

    // Agregamos datos adionales al turno
    this.componentesAdicionales.forEach(unComponente => {
      this.turnoSeleccionado[unComponente.titulo] = unComponente.valor
    });

    this.turnoSeleccionado['edad'] = this.formDatosTurno.value.edad;
    this.turnoSeleccionado['peso'] = this.formDatosTurno.value.peso;
    this.turnoSeleccionado['temperatura'] = this.formDatosTurno.value.temperatura;
    this.turnoSeleccionado['peso'] = this.formDatosTurno.value.peso;


    this.dialog.open(EncuestaProfesionalDialogComponent,
      {
        width: '400px',
        height: 'auto',
        data: { turno: this.turnoSeleccionado },
        panelClass: 'horarios-profesional-dialog-container'
      }).afterClosed().subscribe(resultadoDialogo => {

        if (resultadoDialogo != undefined) {

          this.turnoSeleccionado.resena = resultadoDialogo.resena
          this.turnoSeleccionado.estadoTurno = EstadoTurno.Finalizado;
          this.turnoSeleccionado.contestoEncuesta = false;


          this.usuarioTurno.calificacion = resultadoDialogo.calificacionUsuario;

          console.log(this.usuarioTurno);
          console.log(this.turnoSeleccionado);


          this.usuarioDataService.modificarUsuario(this.usuarioTurno);
          this.turnoDataService.modificarTurno(this.turnoSeleccionado).then(() => {

            Swal.fire({
              title: 'Turno finalizado con éxito!',
              text: 'El turno fue finalizado. Gracias!',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });

          }).then(() => this.router.navigate(['/gestion-turnos']));

        }
      });
  }



}