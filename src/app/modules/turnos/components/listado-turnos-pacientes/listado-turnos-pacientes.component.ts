import { Turno } from './../../models/turno';
import Swal from 'sweetalert2';
import { AuthService } from './../../../shared/services/auth.service';
import { TurnosDataService } from './../../services/turnos-data.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { EstadoTurno } from '../../models/estado-turno.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-listado-turnos-pacientes',
  templateUrl: './listado-turnos-pacientes.component.html',
  styleUrls: ['./listado-turnos-pacientes.component.scss']
})
export class ListadoTurnosPacientesComponent implements OnInit {

  @Input() tipoFiltro: string;

  displayedColumns: string[];
  dataSource: MatTableDataSource<Turno>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private turnosDataService: TurnosDataService,
    private toastManager: MatSnackBar,
    private authService: AuthService) { }

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
        this.mostrarToast('El turno fue cancelado con éxito', 2000);
      }
    })
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
      mergeMap((usarioActual: any) => this.turnosDataService.traerTurnosPorUsuario(usarioActual.uid))).subscribe(datos => {

        let todosLosTurnos = datos as Turno[];

        if (this.tipoFiltro == 'proximos') {
          this.displayedColumns = ['fechaTurno', 'horarioTurno', 'especialidad', 'nombreProfesional', 'estadoTurno', 'cancelarTurno'];
          this.dataSource = new MatTableDataSource(todosLosTurnos.filter(unTurno => unTurno.estadoTurno != EstadoTurno.Cancelado && unTurno.estadoTurno != EstadoTurno.Suspendido && unTurno.estadoTurno != EstadoTurno.Finalizado));
        
        } else {
          this.dataSource = new MatTableDataSource(todosLosTurnos.filter(unTurno => unTurno.estadoTurno == EstadoTurno.Finalizado || unTurno.estadoTurno == EstadoTurno.Suspendido || unTurno.estadoTurno == EstadoTurno.Cancelado));
          this.displayedColumns = ['fechaTurno', 'horarioTurno', 'especialidad', 'nombreProfesional', 'estadoTurno'];
        }

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

}



// this.turnosDataService.traerTodasLosTurnos().subscribe(datos => {
//   let todosLosTurnos = datos as Turno[];
//   this.dataSource = new MatTableDataSource(todosLosTurnos);
//   this.dataSource.paginator = this.paginator;
//   this.dataSource.sort = this.sort;
// });


  // @ViewChild(MatSort) sort: MatSort;

  // dataSource = new MatTableDataSource();
  // displayedColumns = ['fecha', 'horarioTurno', 'especialidad', 'profesional', 'estado', 'cancelar'];

  // constructor(private turnosDataService: TurnosDataService, private authService: AuthService, private toastManager: MatSnackBar, private changeDetectorRefs: ChangeDetectorRef) {
  // }

  // ngOnInit(): void {
  //   if (this.tipoFiltro == 'anteriores') {
  //     this.displayedColumns = ['fecha', 'horarioTurno', 'especialidad', 'profesional', 'estado'];
  //   }
  //   this.traerTurnos();
  // }

  // prueba() {
  //   this.changeDetectorRefs.detectChanges();
  // }

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }