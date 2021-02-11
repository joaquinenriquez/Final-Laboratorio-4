import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Especialidad } from './../../models/especialidad';
import { AltaModificacionEspecialidadDialogComponent } from './../alta-modificacion-especialidad-dialog/alta-modificacion-especialidad-dialog.component';
import Swal from 'sweetalert2';
import { EspecialidadesDataService } from './../../services/especialidades-data.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Orden } from 'src/app/modules/shared/components/tabla/orden.enum';
import { templateJitUrl } from '@angular/compiler';

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
export class ListadoEspecialidadesComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cargaTablaPrimeraVez: boolean = true;

  public displayedColumns: string[] = ['nombreEspecialidad', 'modificar', 'eliminar'];

  constructor(private especialidadesDataServices: EspecialidadesDataService,
    private dialog: MatDialog,
    private toastManager: MatSnackBar,
    private translateService: TranslateService) { }

  ngOnInit(): void {
  }

  traerDatos() {
    this.especialidadesDataServices.traerTodasLasEspecialidades().subscribe(datos => {
      this.dataSource = new MatTableDataSource(datos)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // Ordenamos por default
      if (this.cargaTablaPrimeraVez) {
        this.ordernarTabla('nombreEspecialidad', Orden.Ascendente);
        this.cargaTablaPrimeraVez = false;
      }

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.traerDatos();
  }

  eliminarEspecialidad(especialidad: Especialidad) {
    Swal.fire(
      {

        title: this.translateService.instant('Eliminar especialidad'),
        html: this.translateService.instant("¿Estas seguro que querés eliminar la especialidad") + `<strong>${especialidad.nombreEspecialidad}?</strong>`,
        icon: 'warning',
        confirmButtonColor: '#558B2F',
        confirmButtonText: this.translateService.instant('Si, eliminar!'),
        showCancelButton: true,
        cancelButtonText: this.translateService.instant('Cancelar')

      }).then(resultadoConfirmacion => {
        if (resultadoConfirmacion.isConfirmed) {
          this.especialidadesDataServices.eliminarEspecialidad(especialidad.idEspecialidad).then(() => {
            this.mostrarToast(this.translateService.instant('Se eliminó la especialidad!'), 2000);
          });
        }
      });
  }


  nuevaEspecialidad(): void {

    const dialogRef = this.dialog.open(AltaModificacionEspecialidadDialogComponent, {
      width: '500px',
      data: {
        titulo: this.translateService.instant('Nueva Especialidad'),
        mensaje: this.translateService.instant('¿Cómo se llama la nueva especialidad?'),
        listaAutoCompletar: this.dataSource.data,
        textoBotonAceptar: this.translateService.instant('Crear')
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
        titulo: this.translateService.instant('Modificar Especialidad'),
        mensaje: this.translateService.instant('¿Cómo se llama la nueva especialidad?'),
        listaAutoCompletar: this.dataSource.data,
        nombreEspecialidad: especialidad.nombreEspecialidad,
        textoBotonAceptar: this.translateService.instant('Modificar')
      },
      panelClass: 'alta-modificacion-dialog'
    });

    dialogRef.afterClosed().subscribe(resultadoDialogo => {

      if (resultadoDialogo != undefined) {
        especialidad.nombreEspecialidad = resultadoDialogo.nombreEspecialidad;
        this.especialidadesDataServices.modificarEspecialidad(especialidad).then(() => this.mostrarToast(this.translateService.instant('Especialidad modificada!'), 2000));
      }


    });
  }

  mostrarToast(mensaje: string, duracion: number) {
    this.toastManager.open(mensaje, '', { duration: duracion, panelClass: ['toast-confirmado'] })
  }

  ordernarTabla(nombreColumna: string, orden: Orden) {
    const sortState: Sort = { active: nombreColumna, direction: orden };
    this.dataSource.paginator = this.paginator;
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }



}
