import { PdfCreator } from './../../../shared/tools/pdf-creator';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-listado-operaciones-por-especialidad',
  templateUrl: './listado-operaciones-por-especialidad.component.html',
  styleUrls: ['./listado-operaciones-por-especialidad.component.scss']
})
export class ListadoOperacionesPorEspecialidadComponent implements OnInit {


  /* #region  Atributos */

  displayedColumns: string[] = ['name', 'y'];
  dataSource: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /* #endregion */


  constructor(
    private toastManager: MatSnackBar,
    private datePipe: DatePipe,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.agregarIconos();

  }

  ngOnInit(): void {}

  ngAfterViewInit() {}

  public cargarDatos(datos) {
    this.dataSource = new MatTableDataSource(datos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  agregarIconos() {
    console.log(this.matIconRegistry.addSvgIcon(`archivo_pdf`, this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/file-pdf.svg")));
    console.log(this.matIconRegistry.addSvgIcon(`archivo_excel`, this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/file-type-excel.svg")));
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


  /* #region  Exportar */

  crearPDF() {
    PdfCreator.CrearPDF(['Especialidad', 'Cantidad'], `Informe turnos por especialidad`, this.convertirDatosEnArray(), true, false);
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

