import { TranslateService } from '@ngx-translate/core';
import { Rol } from './../../models/rol.enum';
import { UsuarioDataService } from './../../services/usuario-data.service';
import { Orden } from './../../../shared/components/tabla/orden.enum';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { VisualizarEncuestaUsuarioDialogComponent } from 'src/app/modules/usuarios/pages/visualizar-encuesta-usuario-dialog/visualizar-encuesta-usuario-dialog.component';
import Swal from 'sweetalert2';
import { TurnosDataService } from 'src/app/modules/turnos/services/turnos-data.service';
import { EstadoTurno } from 'src/app/modules/turnos/models/estado-turno.enum';
import { Turno } from 'src/app/modules/turnos/models/turno';
import { ModificarDuracionTurnoDialogComponent } from 'src/app/modules/turnos/components/modificar-duracion-turno-dialog/modificar-duracion-turno-dialog.component';
import { ListadoHorariosProfesionalesComponent } from '../listado-horarios-profesionales/listado-horarios-profesionales.component';
import { CambiarEstadoUsuarioDialogComponent } from '../cambiar-estado-usuario-dialog/cambiar-estado-usuario-dialog.component';
import { Usuario } from '../../models/usuario';
import { NuevoUsuarioAdminDialogComponent } from '../nuevo-usuario-admin-dialog/nuevo-usuario-admin-dialog.component';





@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent implements OnInit {

  /* #region  Atributos  */

  @Input() tipoFiltro: Rol;
  Rol = Rol;
  displayedColumns: string[];

  dataSource: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cargaTablaPrimeraVez: boolean = true;

  /* #endregion */

  constructor(private turnosDataService: TurnosDataService,
    private toastManager: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private usuariosDataService: UsuarioDataService,
    private translateService: TranslateService) { }

  ngOnInit(): void { 
    this.definirColumnas();
  }


  ngAfterViewInit() {
    this.traerUsuarios(this.tipoFiltro);
  }

  private definirColumnas() {
    switch (this.tipoFiltro) {
      case Rol.Profesional:
        this.displayedColumns = ['fechaAlta', 'displayName', 'email', 'especialidad', 'horarios', 'estado'];
        break;

      case Rol.Paciente:
      case Rol.Administrador:
        this.displayedColumns = ['fechaAlta', 'displayName', 'email', 'estado'];
        break;
    }
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
      confirmButtonColor: '#558B2F',
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


  traerUsuarios(rol: Rol) {

    if (rol == undefined)
    return;

    this.usuariosDataService.TraerTodosLosUsuariosPorRol(rol).subscribe(todosLosUsuarios => {
      


      this.dataSource = new MatTableDataSource(todosLosUsuarios);
      this.dataSource.sort = this.sort;
 
      if (this.cargaTablaPrimeraVez) {
        this.ordernarTabla('fechaAlta', Orden.Descendente);
        this.cargaTablaPrimeraVez = false;
      }

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

  ordernarTabla(nombreColumna: string, orden: Orden) {
    const sortState: Sort = { active: nombreColumna, direction: orden };
    this.dataSource.paginator = this.paginator;
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);

  }


  verHorarios(idUsuario: string): void {

    this.dialog.open(ListadoHorariosProfesionalesComponent,
      {
        width: '500px',
        data: { idUsuario: idUsuario },
        panelClass: 'horarios-profesional-dialog-container'
      });

  }

  cambiarEstado(usuario: Usuario): void {

    const dialogoReg = this.dialog.open(CambiarEstadoUsuarioDialogComponent,
      {
        width: '400px',
        data: usuario
      });

    dialogoReg.afterClosed().subscribe(resultadoDialogo => {

      if (resultadoDialogo != undefined) {
        usuario.estado = resultadoDialogo;
        this.usuariosDataService.modificarUsuario(usuario).then(() => this.mostrarToast(this.translateService.instant('Se cambió el estado del usuario'), 2000));
      }

    });

  }

  nuevoUsuarioAdmin() {
    this.dialog.open(NuevoUsuarioAdminDialogComponent,
      {
        width: 'auto',
        data: { idUsuario: 'sadsad' },
        panelClass: 'horarios-profesional-dialog-container'
      });
  }

  
  formatearArray(unArray: string[]): string {
    return unArray?.join(" - ");
  }

}
