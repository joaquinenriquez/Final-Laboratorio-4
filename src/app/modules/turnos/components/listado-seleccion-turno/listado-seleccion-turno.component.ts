import { SpinnerService } from './../../../shared/services/spinner.service';
import { TipoBusqueda } from './../../models/tipo-busqueda.enum';
import { Orden } from './../../../shared/components/tabla/orden.enum';
import { Usuario } from 'src/app/modules/usuarios/models/usuario';
import { UsuarioDataService } from './../../../usuarios/services/usuario-data.service';
import { EspecialidadesDataService } from 'src/app/modules/especialidades/services/especialidades-data.service';
import { Component, OnInit, Output, ViewChild, EventEmitter, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Especialidad } from 'src/app/modules/usuarios/models/especialidad';
import { Rol } from 'src/app/modules/usuarios/models/rol.enum';

@Component({
  selector: 'app-listado-seleccion-turno',
  templateUrl: './listado-seleccion-turno.component.html',
  styleUrls: ['./listado-seleccion-turno.component.scss']
})
export class ListadoSeleccionTurnoComponent implements OnInit, AfterViewInit {

  @Output() profesionalSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  @Output() especialidadSeleccionada: EventEmitter<any> = new EventEmitter<any>();
  @Output() cambioTipoBusqueda: EventEmitter<any> = new EventEmitter<any>();

  displayedColumns: string[];
  dataSource: MatTableDataSource<object>;

  especialidades: Especialidad[];
  profesionales: Usuario[];

  tipoBusquedaSeleccionada: TipoBusqueda = TipoBusqueda.Especialidades;

  cargaTablaPrimeraVezProfesionales: boolean = true;
  cargaTablaPrimeraVezEspecialidades: boolean = true;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private toastManager: MatSnackBar,
    private especialidadesService: EspecialidadesDataService,
    private ususariosService: UsuarioDataService,
    private spinnerService: SpinnerService) { }

  ngOnInit(): void { }


  ngAfterViewInit() {
    this.traerEspecialidades();
  }

  private traerEspecialidades(): void {
    this.especialidadesService.traerTodasLasEspecialidades().subscribe(datosEspecialidades => {
      this.especialidades = datosEspecialidades;
      this.dataSource = new MatTableDataSource(this.especialidades);
      this.displayedColumns = ['nombreEspecialidad', 'seleccionar'];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      if (this.cargaTablaPrimeraVezEspecialidades) {
        this.ordernarTabla('especialidades', Orden.Ascendente);
        this.cargaTablaPrimeraVezEspecialidades = false;
      }
    });
  }

  private traerProfesionales(): void {
    this.ususariosService.TraerTodosLosUsuariosPorRol(Rol.Profesional).subscribe(datosProfesionales => {
      this.profesionales = datosProfesionales;
      this.dataSource = new MatTableDataSource(this.profesionales);
      this.displayedColumns = ['displayName', 'especialidades', 'seleccionar'];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      if (this.cargaTablaPrimeraVezProfesionales) {
        this.ordernarTabla('profesionales', Orden.Ascendente);
        this.cargaTablaPrimeraVezProfesionales = false;
      }
      
    });
  }

  cambiarDataSource(event): void {

    this.spinnerService.mostrarSpinner(1000);

    setTimeout(() => {

      if (event.value == TipoBusqueda.Profesional){
        this.traerProfesionales();
      }
  
      if (event.value == TipoBusqueda.Especialidades) {
        this.traerEspecialidades();
      }
  
      this.tipoBusquedaSeleccionada = event.value;
      this.cambioTipoBusqueda.emit(event);

    }, 1000);

  }

  ordernarTabla(nombreColumna: string, orden: Orden) {
    const sortState: Sort = { active: nombreColumna, direction: orden };
    this.dataSource.paginator = this.paginator;
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
    console.log('Ordenado');
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


  formatearArray(unArray: string[]): string {
    return unArray?.join(" - ");
  }

  seleccionarFila(fila) {

    if (this.tipoBusquedaSeleccionada == TipoBusqueda.Especialidades) {
      this.especialidadSeleccionada.emit(fila);
    }

    if (this.tipoBusquedaSeleccionada == TipoBusqueda.Profesional) {
      this.profesionalSeleccionado.emit(fila);
    }

  }
  

}


