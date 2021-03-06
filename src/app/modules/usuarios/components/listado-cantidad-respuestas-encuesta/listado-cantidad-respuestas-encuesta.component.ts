import { PdfCreator } from './../../../shared/tools/pdf-creator';
import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DatePipe } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-listado-cantidad-respuestas-encuesta',
  templateUrl: './listado-cantidad-respuestas-encuesta.component.html',
  styleUrls: ['./listado-cantidad-respuestas-encuesta.component.scss']
})
export class ListadoCantidadRespuestasEncuestaComponent implements OnInit {

  /* #region  Atributos */

  @Input() datos: any = [];
  @Input() tituloListado: string = 'Sin título';
  displayedColumns: string[] = ['name', 'y'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /* #endregion */


  constructor(
    private toastManager: MatSnackBar,
    private datePipe: DatePipe,
    private changeDetectorRefs: ChangeDetectorRef) {
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
    let columnasPDF = ['Nombre Profesional', 'Cantidad de turnos'];
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



}

