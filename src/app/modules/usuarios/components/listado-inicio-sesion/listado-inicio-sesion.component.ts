import { Log } from './../../models/log';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AuthService } from "src/app/modules/shared/services/auth.service";
import { LogDataService } from "../../services/log.service";
import { FormControl, FormGroup } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { PdfCreator } from 'src/app/modules/shared/tools/pdf-creator';


@Component({
  selector: 'app-listado-inicio-sesion',
  templateUrl: './listado-inicio-sesion.component.html',
  styleUrls: ['./listado-inicio-sesion.component.scss']
})
export class ListadoInicioSesionComponent implements OnInit {

  /* #region  Atributos */

  displayedColumns: string[] = ['fechaLog', 'horaLog', 'emailUsuario', 'rolUsuario', 'nombreUsuario', 'tipoAccion'];
  dataSource: MatTableDataSource<Log>;

  dtPerido: FormGroup;
  fechaMaximaFiltro: Date = new Date();

  tituloInforme: string = "Infome de inicios de sesión";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  /* #endregion */


  constructor(private logDataService: LogDataService,
    private toastManager: MatSnackBar,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private datePipe: DatePipe,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

    this.agregarIconos();

    this.dtPerido = new FormGroup({
      fechaInicio: new FormControl(),
      fechaFin: new FormControl()
    });

  }


  ngOnInit(): void { }

  ngAfterViewInit() {
    this.traerLogs();
  }

  agregarIconos() {
    console.log(this.matIconRegistry.addSvgIcon(`archivo_pdf`, this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/file-pdf.svg")));
    console.log(this.matIconRegistry.addSvgIcon(`archivo_excel`, this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/file-type-excel.svg")));
  }

  traerLogs() {
    this.logDataService.traerTodosLosLogs().subscribe(todosLosLogs => {
      this.dataSource = new MatTableDataSource(todosLosLogs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  filtrarPorFecha() {

    let fechaInicio = this.dtPerido.controls["fechaInicio"].value;
    let fechaFin = this.dtPerido.controls["fechaFin"].value;

    this.dataSource.filterPredicate = (data, filter) => {
      if (fechaInicio && fechaFin) {
        return data.fechaLog.toDate().setHours(0, 0, 0, 0) >= fechaInicio && data.fechaLog.toDate().setHours(0, 0, 0, 0) <= fechaFin;
      }
      return true;
    }

    this.dataSource.filter = '' + Math.random();

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

  limpiarFiltros() {
    this.dtPerido.controls["fechaInicio"].setValue(null);
    this.dtPerido.controls["fechaFin"].setValue(null);
    this.filtrarPorFecha();
  }


  /* #region  Exportar */

  crearPDF() {
    let columnas = ['Fecha', 'Hora', 'Email', 'Rol', 'Usuario', 'Acción'];
    PdfCreator.CrearPDF(columnas, this.tituloInforme, this.convertirDatosEnArray(), false, true);
  }


  convertirDatosEnArray(): Array<[]> {
    let arrayLogs = [];
    this.dataSource.filteredData.forEach(unLog => {
      let unLogArray = new Array;
      unLogArray.push(this.datePipe.transform(unLog.fechaLog.toDate()));
      unLogArray.push(this.datePipe.transform(unLog.fechaLog.toDate(), 'hh:mm:ss'));
      unLogArray.push(unLog.emailUsuario);
      unLogArray.push(unLog.rolUsuario);
      unLogArray.push(unLog.nombreUsuario);
      unLogArray.push(unLog.tipoAccion);
      arrayLogs.push(unLogArray);
    });

    return arrayLogs;
  }

  getDate() {
    return this.datePipe.transform(new Date, "yyyy-MM-dd hh:mm:ss");
  }


  /* #endregion */



}

