import { PdfCreator } from './../../../shared/tools/pdf-creator';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Orden } from 'src/app/modules/shared/components/tabla/orden.enum';


@Component({
  selector: 'app-listado-profesionales-por-dias-trabajados',
  templateUrl: './listado-profesionales-por-dias-trabajados.component.html',
  styleUrls: ['./listado-profesionales-por-dias-trabajados.component.scss']
})
export class ListadoProfesionalesPorDiasTrabajadosComponent implements OnInit {

  /* #region  Atributos */

  @Input() datos: any = [];
  @Input() tituloListado: string = 'Sin título';
  @Output() filtrar: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = ['name', 'y'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dtPerido: FormGroup;
  fechaMaximaFiltro: Date = new Date();

  /* #endregion */


  constructor(
    private toastManager: MatSnackBar,
    private datePipe: DatePipe,
    private changeDetectorRefs: ChangeDetectorRef) {


    this.dtPerido = new FormGroup({
      fechaInicio: new FormControl(),
      fechaFin: new FormControl()
    });

  }

  ngOnInit(): void {}

  ngAfterViewInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    // Cuando cambia algun valor de los que recibimos por input se produce este evento
    if (changes.datos?.currentValue != undefined) {
      this.cargarDatos();
    }
  }

  public cargarDatos() {
    this.dataSource = new MatTableDataSource(this.datos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    setTimeout(() => {
      this.ordernarTabla('y', Orden.Descendente);
    }, 1000); 
  }

  mostrarToast(mensaje: string, duracion: number) {
    this.toastManager.open(mensaje, '', { duration: duracion, panelClass: ['toast-confirmado'] })
  }


  applyFilter(event: Event) {

    // Volvemos el filterPredicate al por Default
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = Object.keys(data).reduce((currentTerm, key) => {
        return currentTerm + data[key] + '◬';
      }, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) != -1;

    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  refrescarTabla() {
    this.changeDetectorRefs.detectChanges();
  }


  /* #region  Exportar */


  crearPDF() {
    let columnasPDF = ['Nombre Profesional', 'Cantidad de días trabajados'];
    PdfCreator.CrearPDF(columnasPDF, this.tituloListado, this.convertirDatosEnArray(), false, true);
  }


  convertirDatosEnArray(): Array<[]> {
    let arrayDatos = [];
    this.dataSource.filteredData.forEach(unDato => {
      let unDatoArray = new Array;
      unDatoArray.push(unDato.name);
      unDatoArray.push(unDato.y);
      arrayDatos.push(unDatoArray);
    });

    return arrayDatos;
  }


  getDate() {
    return this.datePipe.transform(new Date, "yyyy-MM-dd hh:mm:ss");
  }


  /* #endregion */

  filtrarPorFecha() {

    let fechaInicio = this.dtPerido.controls["fechaInicio"].value;
    let fechaFin = this.dtPerido.controls["fechaFin"].value;

    this.filtrar.emit({'fechaInicio': fechaInicio, 'fechaFin': fechaFin});
  }

  limpiarFiltros() {
    this.dtPerido.controls["fechaInicio"].setValue(null);
    this.dtPerido.controls["fechaFin"].setValue(null);
    this.filtrarPorFecha();
  }

  ordernarTabla(nombreColumna: string, orden: Orden) {
    const sortState: Sort = { active: nombreColumna, direction: orden };
    this.dataSource.paginator = this.paginator;
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

}

