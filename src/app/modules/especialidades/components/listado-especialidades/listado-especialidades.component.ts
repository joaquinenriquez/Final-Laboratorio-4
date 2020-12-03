import { MatSnackBar } from '@angular/material/snack-bar';
import { Especialidad } from './../../models/especialidad';
import { AltaModificacionEspecialidadDialogComponent } from './../alta-modificacion-especialidad-dialog/alta-modificacion-especialidad-dialog.component';
import Swal from 'sweetalert2';
import { EspecialidadesDataService } from './../../services/especialidades-data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface DatosDialogo {
  titulo: string;
  mensaje: string;
  nombreEspecialidad: string;
  listaAutoCompletar: Especialidad[];
  textoBotonAceptar: string;
  textoBotonCancelar: string;
}

@Component({
  selector: 'app-especialidades',
  templateUrl: './listado-especialidades.component.html',
  styleUrls: ['./listado-especialidades.component.scss']
})
export class ListadoEspecialidadesComponent implements OnInit {

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  public displayedColumns: string[] = ['nombreEspecialidad', 'modificar', 'eliminar'];

  constructor(private especialidadesDataServices: EspecialidadesDataService,
    private dialog: MatDialog,
    private toastManager: MatSnackBar) { }

  ngOnInit(): void {
    this.especialidadesDataServices.traerTodasLasEspecialidades().subscribe(datos => this.dataSource = new MatTableDataSource(datos));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminarEspecialidad(especialidad: Especialidad) {
    Swal.fire(
      {

        title: 'Eliminar especialidad',
        html: `¿Estas seguro que querés eliminar la especialidad <strong>${especialidad.nombreEspecialidad}?</strong>`,
        icon: 'warning',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        showCancelButton: true,
        cancelButtonText: 'Cancelar'

      }).then(resultadoConfirmacion => {
        if (resultadoConfirmacion.isConfirmed) {
          this.especialidadesDataServices.eliminarEspecialidad(especialidad.idEspecialidad).then(() => {
            this.mostrarToast('Se eliminó la especialidad!', 2000);
          });
        }
      });
  }


  nuevaEspecialidad(): void {

    const dialogRef = this.dialog.open(AltaModificacionEspecialidadDialogComponent, {
      width: '500px',
      data: {
        titulo: 'Nueva Especialidad',
        mensaje: '¿Cómo se llama la nueva especialidad?',
        listaAutoCompletar: this.dataSource.data,
        textoBotonAceptar: 'Crear'
      },
      panelClass: 'alta-modificacion-dialog'
    });

    dialogRef.afterClosed().subscribe(resultadoDialogo => {


      console.log(resultadoDialogo);

      if (resultadoDialogo != undefined) {
        this.especialidadesDataServices.nuevaEspecialidad(resultadoDialogo).then(() => this.mostrarToast('Especialidad creada!', 2000));

      }
    });
  }


  modificarEspecialidad(especialidad: Especialidad): void {

    console.log(especialidad);

    const dialogRef = this.dialog.open(AltaModificacionEspecialidadDialogComponent, {
      width: '500px',
      data: {
        titulo: 'Modificar Especialidad',
        mensaje: '¿Cómo se llama la nueva especialidad?',
        listaAutoCompletar: this.dataSource.data,
        nombreEspecialidad: especialidad.nombreEspecialidad,
        textoBotonAceptar: 'Modificar'
      },
      panelClass: 'alta-modificacion-dialog'
    });

    dialogRef.afterClosed().subscribe(resultadoDialogo => {

      if (resultadoDialogo != undefined) {
        especialidad.nombreEspecialidad = resultadoDialogo.nombreEspecialidad;
        this.especialidadesDataServices.modificarEspecialidad(especialidad).then(() => this.mostrarToast('Especialidad modificada!', 2000));
      }


    });
  }

  mostrarToast(mensaje: string, duracion: number) {
    this.toastManager.open(mensaje, '', { duration: duracion, panelClass: ['toast-confirmado'] })
  }


}
