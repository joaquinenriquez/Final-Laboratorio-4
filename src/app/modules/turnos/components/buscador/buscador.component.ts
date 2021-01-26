import { Turno } from './../../models/turno';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { VisualizarEncuestaUsuarioDialogComponent } from 'src/app/modules/usuarios/pages/visualizar-encuesta-usuario-dialog/visualizar-encuesta-usuario-dialog.component';
import Swal from 'sweetalert2';
import { EstadoTurno } from '../../models/estado-turno.enum';
import { TurnosDataService } from '../../services/turnos-data.service';
import { ModificarDuracionTurnoDialogComponent } from '../modificar-duracion-turno-dialog/modificar-duracion-turno-dialog.component';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

  @Input() tipoFiltro: string;

  displayedColumns: string[];
  camposAdicionales: string[] = [];

  dataSource: MatTableDataSource<Object>;


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
        
      this.turnosDataService.traerTodasLosTurnos().subscribe(todosLosTurnos => {
        this.dataSource = new MatTableDataSource(todosLosTurnos);
        console.log(todosLosTurnos);

        this.displayedColumns = ['fechaTurno', 'horarioTurno', 'especialidad', 'nombreProfesional', 'nombreUsuario', 'estadoTurno', 'duracionEstimada', 'edad', 'peso', 'temperatura', 'resena'];
        let auxTodosLosCampos = this.getNombrePropiedades(todosLosTurnos);
        
        this.camposAdicionales = auxTodosLosCampos.filter(unCampo => unCampo.substring(0,3) == 'CA_');
        console.log(this.camposAdicionales);
 
        this.displayedColumns = this.displayedColumns.concat(this.camposAdicionales);
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

  getNombrePropiedades(listado: Array<Object>): Array<string> {
    // return Object.keys(listado.reduce((o,c) => Object.assign(o, c)));

    let names = Object.create(null);
    let result;

    listado.forEach(function (o) {
        Object.keys(o).forEach(function (k) {
            names[k] = true;
        });
      });

    result = Object.keys(names);
    return result;

  }

  verEncuesta(turno: Turno): void {

    const dialogoReg = this.dialog.open(VisualizarEncuestaUsuarioDialogComponent,
      {
        width: '600px',
        height: 'auto',
        data: turno
      });

    dialogoReg.afterClosed().subscribe(resultadoDialogo => {

    });

  }

}
