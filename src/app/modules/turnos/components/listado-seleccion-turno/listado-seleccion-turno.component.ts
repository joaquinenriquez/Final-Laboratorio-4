import { Notificacion } from './../../../shared/models/notificacion';
import { NotificacionesService } from './../../../shared/services/notificaciones.service';
import { VisualizarResenaUsuarioDialogComponent } from './../../../usuarios/pages/visualizar-resena-usuario-dialog/visualizar-resena-usuario-dialog.component';
import { EncuestasDataService } from './../../services/encuestas-data.service';
import { PreguntaEncuesta } from './../../models/encuesta';
import { MatDialog } from '@angular/material/dialog';
import { EncuestaUsuarioDialogComponent } from './../../../usuarios/pages/encuesta-usuario-dialog/encuesta-usuario-dialog.component';
import { Turno } from './../../models/turno';
import Swal from 'sweetalert2';
import { AuthService } from './../../../shared/services/auth.service';
import { TurnosDataService } from './../../services/turnos-data.service';
import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { EstadoTurno } from '../../models/estado-turno.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Encuesta } from '../../models/encuesta';
import firebase from 'firebase/app';

@Component({
  selector: 'app-listado-seleccion-turno',
  templateUrl: './listado-seleccion-turno.component.html',
  styleUrls: ['./listado-seleccion-turno.component.scss']
})
export class ListadoSeleccionTurnoComponent implements OnInit {

  @Input() tipoFiltro: string;

  @Input() datosUsuarioActual;

  @Output() cambioCantidadTurnos: EventEmitter<number> = new EventEmitter();

  displayedColumns: string[];
  dataSource: MatTableDataSource<Turno>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private turnosDataService: TurnosDataService,
    private toastManager: MatSnackBar,
    private authService: AuthService,
    private dialog: MatDialog,
    private encuestaDataService: EncuestasDataService,
    private notificacionService: NotificacionesService) { }

  ngOnInit(): void { }


  ngAfterViewInit() {
    this.traerTurnos();
  }


  cancelarTurno(turno: Turno) {

    Swal.fire({
      title: '<strong>Cancelar turno</strong>',
      icon: 'warning',
      html:
        `¿Estas seguro que queres cancelar el turno con <b><i>${turno.nombreProfesional}</i></b>, ` +
        `para el día <b>${turno.fechaTurno.toDate().toLocaleDateString()}</b> ` +
        `a las <b>${turno.horarioTurno}</b>?`,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: '#F44336',
      confirmButtonText: '<i>Si, estoy seguro!</i>',
      cancelButtonText: '<b>No cancelar</b>',
    }).then(resultadoDialogo => {
      if (resultadoDialogo.isConfirmed) {
        turno.estadoTurno = EstadoTurno.Cancelado;
        this.turnosDataService.modificarTurno(turno);
        this.crearNotificacionDeTurnoCancelado(turno);
        this.mostrarToast('El turno fue cancelado con éxito', 2000);
      }
    })
  }


  mostrarToast(mensaje: string, duracion: number) {
    this.toastManager.open(mensaje, '', { duration: duracion, panelClass: ['toast-confirmado'] })
  }

  crearNotificacionDeTurnoCancelado(turno: Turno) {

    let  opcionesFormatoFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    let fechaTurnoString = turno.fechaTurno.toDate().toLocaleDateString("es-AR", opcionesFormatoFecha);

    let notificacionCancelarTurno: Notificacion = {

      idUsuarioDestino: turno.idProfesional,
      idUsuarioOrigen:  turno.idUsuario,
      nombreUsuarioOrigen: turno.nombreUsuario,
      fechaCreacion: firebase.firestore.Timestamp.now(),
      textoNotificacion: `${turno.nombreUsuario} canceló el turno para el día ${fechaTurnoString}`,
      notificacionLeida: false,
      fotoUsuarioOrigen: this.datosUsuarioActual?.imagen1,
      colorNotificacion: "#F44336"
    }

    this.notificacionService.GuardarNuevaNotificacionConIdAutomatico(notificacionCancelarTurno);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  traerTurnos() {

    this.authService.datosUsuario.pipe(
      mergeMap((usarioActual: any) => this.turnosDataService.traerTurnosPorUsuario(usarioActual?.uid))).subscribe(datos => {

        let todosLosTurnos = datos as Turno[];

        if (this.tipoFiltro == 'proximos') {
          this.displayedColumns = ['fechaTurno', 'horarioTurno', 'especialidad', 'nombreProfesional', 'estadoTurno', 'cancelarTurno'];
          this.dataSource = new MatTableDataSource(todosLosTurnos.filter(unTurno => unTurno.estadoTurno != EstadoTurno.Cancelado && unTurno.estadoTurno != EstadoTurno.Suspendido && unTurno.estadoTurno != EstadoTurno.Finalizado));

        } else {
          this.dataSource = new MatTableDataSource(todosLosTurnos.filter(unTurno => unTurno.estadoTurno == EstadoTurno.Finalizado || unTurno.estadoTurno == EstadoTurno.Suspendido || unTurno.estadoTurno == EstadoTurno.Cancelado));
          this.displayedColumns = ['fechaTurno', 'horarioTurno', 'especialidad', 'nombreProfesional', 'estadoTurno', 'contestarEncuesta', 'verResena'];
        }

        this.cambioCantidadTurnos.emit(this.dataSource.data.length);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  mostrarEncuesta(turnoSeleccionado: Turno): void {

    this.dialog.open(EncuestaUsuarioDialogComponent,
      {
        width: '400px',
        height: '600px',
        data: { turno: turnoSeleccionado },
        panelClass: 'horarios-profesional-dialog-container'
      }).afterClosed().subscribe(resultadoDialogo => {

        if (resultadoDialogo != undefined) {

          let preguntasEncuesta = resultadoDialogo as PreguntaEncuesta[];

          // Las respuestas de la encuesta
          let nuevaEncuesta: Encuesta =
          {
            idTurno: turnoSeleccionado.idTurno,
            preguntas: preguntasEncuesta
          }

          this.encuestaDataService.nuevaEncuesta(nuevaEncuesta);

          turnoSeleccionado.contestoEncuesta = true;
          this.turnosDataService.modificarTurno(turnoSeleccionado);

          Swal.fire({
            title: 'Gracias por elegirnos!',
            text: 'Sus datos fueron guardos con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });

        }
      });

  }


  mostrarResena(turnoSeleccionado: Turno): void {

    const dialogoReg = this.dialog.open(VisualizarResenaUsuarioDialogComponent,
      {
        width: '400px',
        data: turnoSeleccionado
      });

    dialogoReg.afterClosed().subscribe(resultadoDialogo => {

      if (resultadoDialogo != undefined) {

      }

    });
  }


}


