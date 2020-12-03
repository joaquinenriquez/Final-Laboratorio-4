import { CambiarEstadoUsuarioDialogComponent } from './../cambiar-estado-usuario-dialog/cambiar-estado-usuario-dialog.component';
import { ListadoHorariosProfesionalesComponent } from './../listado-horarios-profesionales/listado-horarios-profesionales.component';
import { Rol } from './../../models/rol.enum';
import { UsuarioDataService } from './../../services/usuario-data.service';
import { Usuario } from './../../models/usuario';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NuevoUsuarioAdminDialogComponent } from '../nuevo-usuario-admin-dialog/nuevo-usuario-admin-dialog.component';


@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent implements OnInit {

  @Input() filtroRol: Rol;

  Rol = Rol;

  displayedColumns: string[];
  dataSource: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  especialidadesDataServices: any;


  constructor(private usuarioDataService: UsuarioDataService,
    private toastManager: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.traerUsuarios(this.filtroRol);
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
        this.usuarioDataService.modificarUsuario(usuario).then(() => this.mostrarToast('Se cambió el estado del usuario', 2000));
      }

    });

  }


  ngAfterViewInit() { }


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

    switch (rol) {
      case Rol.Profesional:
        this.displayedColumns = ['displayName', 'email', 'especialidad', 'verHorarios', 'estado'];
        break;

      case Rol.Paciente:
      case Rol.Administrador:
        this.displayedColumns = ['displayName', 'email', 'estado'];
        break;
    }

    this.usuarioDataService.TraerTodosLosUsuariosPorRol(rol).subscribe(datosUsusario => {
      this.dataSource = new MatTableDataSource(datosUsusario)
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




}







//         let todosLosTurnos = datos as Turno[];

//         switch (this.tipoFiltro) {

//           case 'confirmados':
//             {
//               this.displayedColumns = ['fechaTurno', 'horarioTurno', 'especialidad', 'nombreUsuario', 'estadoTurno', 'atenderTurno', 'cancelarTurno'];
//               this.dataSource = new MatTableDataSource(todosLosTurnos.filter(unTurno => unTurno.estadoTurno == EstadoTurno.Confirmado || unTurno.estadoTurno == EstadoTurno.Atendiendo));
//               break;
//             }

//           case 'pendientes':
//             {
//               this.displayedColumns = ['fechaTurno', 'horarioTurno', 'especialidad', 'nombreUsuario', 'estadoTurno', 'confirmarTurno', 'cancelarTurno'];
//               this.dataSource = new MatTableDataSource(todosLosTurnos.filter(unTurno => unTurno.estadoTurno == EstadoTurno.Pendiente_Confirmar));
//               break;
//             }

//           case 'anteriores':
//             {
//               this.dataSource = new MatTableDataSource(todosLosTurnos.filter(unTurno => unTurno.estadoTurno == EstadoTurno.Finalizado || unTurno.estadoTurno == EstadoTurno.Suspendido || unTurno.estadoTurno == EstadoTurno.Cancelado));
//               this.displayedColumns = ['fechaTurno', 'horarioTurno', 'especialidad', 'nombreUsuario', 'estadoTurno'];
//               break;
//             }
//         }

//         this.dataSource.paginator = this.paginator;
//         this.dataSource.sort = this.sort;
//       });
//   }

// }