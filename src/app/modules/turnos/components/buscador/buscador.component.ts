import { Usuario } from 'src/app/modules/usuarios/models/usuario';
import { Orden } from './../../../shared/components/tabla/orden.enum';
import { Turno } from './../../models/turno';
import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VisualizarEncuestaUsuarioDialogComponent } from 'src/app/modules/usuarios/pages/visualizar-encuesta-usuario-dialog/visualizar-encuesta-usuario-dialog.component';
import { TurnosDataService } from '../../services/turnos-data.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit, AfterViewInit {
  
  /* #region  Atributos  */

  displayedColumns: string[];
  camposAdicionales: string[] = [];

  dataSource: MatTableDataSource<Turno>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cargaTablaPrimeraVez: boolean = true;

  /* #endregion */

  constructor(private turnosDataService: TurnosDataService,
              private dialog: MatDialog) { }

  ngOnInit(): void { }

  
  ngAfterViewInit() {
    this.traerTurnos();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  traerTurnos() {

    this.turnosDataService.traerTodasLosTurnos().subscribe(todosLosTurnos => {
      this.dataSource = new MatTableDataSource(todosLosTurnos);


      this.displayedColumns = ['fechaTurno', 'horarioTurno', 'especialidad', 'nombreProfesional', 'nombreUsuario', 'estadoTurno', 'duracionEstimada', 'edad', 'peso', 'temperatura', 'resena'];
      let auxTodosLosCampos = this.getNombrePropiedades(todosLosTurnos);

      this.camposAdicionales = auxTodosLosCampos.filter(unCampo => unCampo.substring(0, 3) == 'CA_');

      this.displayedColumns = this.displayedColumns.concat(this.camposAdicionales);
      this.dataSource.sort = this.sort;
 
      if (this.cargaTablaPrimeraVez) {
        this.ordernarTabla('fechaTurno', Orden.Descendente);
        this.cargaTablaPrimeraVez = false;
      }

    });


  }


  getNombrePropiedades(listado: Array<Object>): Array<string> {
    // return Object.keys(listado.reduce((o,c) => Object.assign(o, c)));

    let names = Object.create(null);
    let result;

    listado.forEach(function (o) {
      Object.keys(o).forEach(function (k) {
        names[k] = true;
      });
    });

    result = Object.keys(names);
    return result;

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

  ordernarTabla(nombreColumna: string, orden: Orden) {
    const sortState: Sort = { active: nombreColumna, direction: orden };
    this.dataSource.paginator = this.paginator;
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
    console.log('Ordenado');
  }

}
