import { Log } from './../../models/log';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AuthService } from "src/app/modules/shared/services/auth.service";
import { ModificarDuracionTurnoDialogComponent } from "src/app/modules/turnos/components/modificar-duracion-turno-dialog/modificar-duracion-turno-dialog.component";
import { Turno } from "src/app/modules/turnos/models/turno";
import { VisualizarEncuestaUsuarioDialogComponent } from "../../pages/visualizar-encuesta-usuario-dialog/visualizar-encuesta-usuario-dialog.component";
import { LogDataService } from "../../services/log.service";
import { FormControl, FormGroup } from '@angular/forms';

import jspdf  from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';




@Component({
  selector: 'app-listado-inicio-sesion',
  templateUrl: './listado-inicio-sesion.component.html',
  styleUrls: ['./listado-inicio-sesion.component.scss']
})
export class ListadoInicioSesionComponent implements OnInit {

  displayedColumns: string[] =  ['fechaLog', 'horaLog', 'emailUsuario', 'rolUsuario', 'nombreUsuario', 'tipoAccion'];
  dataSource: MatTableDataSource<Log>;

  dtPerido: FormGroup;
  fechaMaximaFiltro: Date = new Date();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private logDataService: LogDataService,
    private toastManager: MatSnackBar,
    private authService: AuthService, 
    private dialog: MatDialog,
    private router: Router,
    private datePipe: DatePipe,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) { 

      this.agregarIconos();

      this.fechaMaximaFiltro.setDate(this.fechaMaximaFiltro.getDate() + 1)

      this.dtPerido = new FormGroup({
        fechaInicio: new FormControl(),
        fechaFin: new FormControl()
      });
  

    }

  ngOnInit(): void { }


  crearPDF() {
    var doc = new jspdf();
    let columnas = ['Fecha', 'Hora', 'Email', 'Rol', 'Usuario', 'Acción'];

    let posicionX = this.getCentroHorizontalPDF(18, 'Informe de inicios de sesión', doc);
    
    doc.setFontSize(18);
    doc.text(`Informe de inicio de sesión`, posicionX, 15);


    let logo = new Image();
    logo.src = 'assets/connombre.jpg';
    doc.addImage(logo, 'jpg', 175, 5, 20, 18);

    doc.setFontSize(11);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: [columnas],
      body: this.convertirDatosEnArray(),    
      theme: 'striped',
      startY: 28,
      showHead: 'everyPage',
      didDrawCell: data => {
        console.log(data.column.index)
      }
    });

    this.agregarFooterAlPDF(doc);

    // Open PDF document in new tab
    doc.output('dataurlnewwindow')
  


    // Download PDF document  
    //doc.save('table.pdf');
  }

  getCentroHorizontalPDF(fontSize: number, texto: string, documento: jspdf): number {
    let textWidth = documento.getStringUnitWidth(texto) * fontSize / documento.internal.scaleFactor;
    return  (documento.internal.pageSize.width - textWidth) / 2;
  }

  agregarIconos() {
    console.log(this.matIconRegistry.addSvgIcon(`archivo_pdf`, this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/file-pdf.svg")));
    console.log(this.matIconRegistry.addSvgIcon(`archivo_excel`, this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/file-type-excel.svg")));
  }

  agregarFooterAlPDF(documento: jspdf) {

    const pageCount = documento.getNumberOfPages();
    documento.setFont('helvetica', 'italic');
    documento.setFontSize(12);

    let fechaActual = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    

    for (var i = 1; i <= pageCount; i++) {
      documento.setPage(i)

      let texto = `${fechaActual} - Página ${i} de ${pageCount}`;
      documento.text(texto, documento.internal.pageSize.width / 2, 287, {align: 'center'});
    }
  }



  
  

  ngAfterViewInit() {
    this.traerLogs();
  }


  convertirDatosEnArray(): Array<[]>  
  {
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

  filtrarPorFecha() {

    let fechaInicio = this.dtPerido.controls["fechaInicio"].value;
    let fechaFin = this.dtPerido.controls["fechaFin"].value;

    this.dataSource.filterPredicate = (data, filter) =>{
      if (fechaInicio && fechaFin) {
        return data.fechaLog.toDate().setHours(0,0,0,0) >= fechaInicio && data.fechaLog.toDate().setHours(0,0,0,0) <= fechaFin;
      }
      return true;
    }

    this.dataSource.filter = ''+Math.random();

  }


  mostrarToast(mensaje: string, duracion: number) {
    this.toastManager.open(mensaje, '', { duration: duracion, panelClass: ['toast-confirmado'] })
  }


  applyFilter(event: Event) {
    
    this.dataSource.filterPredicate = (data, filter) => {
      // Transform the data into a lowercase string of all property values.
      const dataStr = Object.keys(data).reduce((currentTerm, key) => {
          // Use an obscure Unicode character to delimit the words in the concatenated string.
          // This avoids matches where the values of two columns combined will match the user's query
          // (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something
          // that has a very low chance of being typed in by somebody in a text field. This one in
          // particular is "White up-pointing triangle with dot" from
          // https://en.wikipedia.org/wiki/List_of_Unicode_characters
          return currentTerm + data[key] + '◬';
      }, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) != -1;
  };
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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





  traerLogs() {
    this.logDataService.traerTodosLosLogs().subscribe(todosLosLogs =>  {
      this.dataSource = new MatTableDataSource(todosLosLogs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}

