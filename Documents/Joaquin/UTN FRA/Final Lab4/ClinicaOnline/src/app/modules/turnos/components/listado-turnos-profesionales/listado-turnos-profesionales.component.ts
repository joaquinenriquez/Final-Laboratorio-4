import { Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { EstadoTurno } from 'src/app/modules/turnos/models/estado-turno.enum';
import { Turno } from 'src/app/modules/turnos/models/turno';
import { TurnosDataService } from 'src/app/modules/turnos/services/turnos-data.service';
import Swal from 'sweetalert2';
import { ModificarDuracionTurnoDialogComponent } from '../modificar-duracion-turno-dialog/modificar-duracion-turno-dialog.component';


@Component({
  selector: 'app-listado-turnos-profesionales',
  templateUrl: './listado-turnos-profesionales.component.html',
  styleUrls: ['./listado-turnos-profesionales.component.scss']
})
export class ListadoTurnosProfesionalesComponent implements OnInit {

  @Input() tipoFiltro: string;

  displayedColumns: string[];
  dataSource: MatTableDataSource<Turno>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private turnosDataService: TurnosDataService,
    private toastManager: MatSnackBar,
    private authService: AuthService, 
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void { }


  ngAfterViewInit() {
    console.log(this.tipoFiltro);
    this.traerTurnos();
  }


  cancelarTurno(turno: Turno) {

    Swal.fire({
      title: '<strong>Cancelar turno</strong>',
      icon: 'warning',
      html:
        `¿Estas seguro que queres cancelar el turno con <b><i>${turno.nombreUsuario}</i></b>, ` +
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
        this.mostrarToast('El turno fue cancelado con éxito', 2000);
      }
    })
  }

  confirmarTurno(turno: Turno) {
    turno.estadoTurno = EstadoTurno.Confirmado;
    this.turnosDataService.modificarTurno(turno);
    this.mostrarToast('El turno fue confirmado con éxito', 2000);
  }

  atenderTurno(turno: Turno) {
    turno.estadoTurno = EstadoTurno.Atendiendo;
    this.turnosDataService.modificarTurno(turno);
    this.router.navigate(['/atender-turno', turno.idTurno]);
  }


  mostrarToast(mensaje: string, duracion: number) {
    this.toastManager.open(mensaje, '', { duration: duracion, panelClass: ['toast-confirmado'] })
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
      mergeMap((usarioActual: any) => this.turnosDataService.traerTurnosPorProfesional(usarioActual.uid))).subscribe(datos => {

        let todosLosTurnos = datos as Turno[];

        switch (this.tipoFiltro) {

          case 'confirmados':
            {
              this.displayedColumns = ['fechaTurno', 'horarioTurno', 'especialidad', 'nombreUsuario', 'estadoTurno', 'duracionEstimada', 'atenderTurno', 'cancelarTurno'];
              this.dataSource = new MatTableDataSource(todosLosTurnos.filter(unTurno => unTurno.estadoTurno == EstadoTurno.Confirmado || unTurno.estadoTurno == EstadoTurno.Atendiendo));
              break;
            }

          case 'pendientes':
            {
              this.displayedColumns = ['fechaTurno', 'horarioTurno', 'especialidad', 'nombreUsuario', 'estadoTurno', 'confirmarTurno', 'cancelarTurno'];
              this.dataSource = new MatTableDataSource(todosLosTurnos.filter(unTurno => unTurno.estadoTurno == EstadoTurno.Pendiente_Confirmar));
              break;
            }

          case 'anteriores':
            {
              this.dataSource = new MatTableDataSource(todosLosTurnos.filter(unTurno => unTurno.estadoTurno == EstadoTurno.Finalizado || unTurno.estadoTurno == EstadoTurno.Suspendido || unTurno.estadoTurno == EstadoTurno.Cancelado));
              this.displayedColumns = ['fechaTurno', 'horarioTurno', 'especialidad', 'nombreUsuario', 'estadoTurno'];
              break;
            }
        }

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  modificarDuracionTurno(turno: Turno): void {

    const dialogoReg = this.dialog.open(ModificarDuracionTurnoDialogComponent,
      {
        width: '400px',
        data: turno
      });

    dialogoReg.afterClosed().subscribe(resultadoDialogo => {

      if (resultadoDialogo != undefined) {
        turno.duracionEstimada = resultadoDialogo;
        this.mostrarToast('Se cambió la duración del turno', 2000);
      }

    });

  }


}