import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, EventEmitter, OnInit, Output, Input, ViewChild, SimpleChanges } from '@angular/core';
import { Sort, MatSort } from '@angular/material/sort';
import { Columna } from './columna';
import { MatRadioChange } from '@angular/material/radio';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  public tableDataSource =  new MatTableDataSource([]);
  public displayedColumns: string[];
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort: MatSort;

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: Columna[];
  @Input() rowActionIcon: Columna;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];

  @Input() placeHolderInputBuscar: string = "";

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() cambioTipoBusqueda: EventEmitter<number> = new EventEmitter<number>();

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  constructor() {
  }

  ngOnInit(): void {
    const columnNames = this.tableColumns.map((tableColumn: Columna) => tableColumn.tituloColumna);
    if (this.rowActionIcon) {
      this.displayedColumns = [...columnNames, this.rowActionIcon.tituloColumna]
    } else {
      this.displayedColumns = columnNames;
    }
  }

  inicializar() {
    const columnNames = this.tableColumns.map((tableColumn: Columna) => tableColumn.tituloColumna);
    if (this.rowActionIcon) {
      this.displayedColumns = [...columnNames, this.rowActionIcon.tituloColumna]
    } else {
      this.displayedColumns = columnNames;
    }

    this.tableDataSource.paginator = this.matPaginator;
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }


  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns.find(column => column.tituloColumna === sortParameters.active).valorFila;
    this.sort.emit(sortParameters);
  }

  emitRowAction(row: any) {
    this.rowAction.emit(row);
  }

}
