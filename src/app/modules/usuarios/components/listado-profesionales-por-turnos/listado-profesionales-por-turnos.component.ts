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
  selector: 'app-listado-profesionales-por-turnos',
  templateUrl: './listado-profesionales-por-turnos.component.html',
  styleUrls: ['./listado-profesionales-por-turnos.component.scss']
})
export class ListadoProfesionalesPorTurnosComponent implements OnInit {

  /* #region  Atributos */

  @Input() datos: any = [];
  displayedColumns: string[] = ['name', 'y'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /* #endregion */


  constructor(
    private toastManager: MatSnackBar,
    private datePipe: DatePipe,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private changeDetectorRefs: ChangeDetectorRef) {
    this.agregarIconos();

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

  prueba() {
    console.log(this.datos);
    console.log(this.dataSource.data);
    //this.cargarDatos();
  }

  refrescarTabla() {
    this.changeDetectorRefs.detectChanges();
  }


  /* #region  Exportar */

  crearPDF() {
    alert('aasdas');
    let columnasPDF = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábados'];
    PdfCreator.CrearPDF(columnasPDF, 'Turnos por días de la semana', this.convertirDatosEnArray, false, true);
    this.mostrarToast('Archivo generado correctamente', 300);
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

