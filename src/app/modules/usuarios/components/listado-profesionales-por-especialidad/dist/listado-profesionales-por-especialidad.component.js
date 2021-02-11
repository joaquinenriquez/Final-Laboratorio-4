"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListadoProfesionalesPorEspecialidadComponent = void 0;
var pdf_creator_1 = require("./../../../shared/tools/pdf-creator");
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var orden_enum_1 = require("src/app/modules/shared/components/tabla/orden.enum");
var ListadoProfesionalesPorEspecialidadComponent = /** @class */ (function () {
    /* #endregion */
    function ListadoProfesionalesPorEspecialidadComponent(toastManager, datePipe, changeDetectorRefs) {
        this.toastManager = toastManager;
        this.datePipe = datePipe;
        this.changeDetectorRefs = changeDetectorRefs;
        /* #region  Atributos */
        this.datos = [];
        this.tituloListado = 'Sin título';
        this.displayedColumns = ['name', 'y'];
    }
    ListadoProfesionalesPorEspecialidadComponent.prototype.ngOnInit = function () { };
    ListadoProfesionalesPorEspecialidadComponent.prototype.ngAfterViewInit = function () { };
    ListadoProfesionalesPorEspecialidadComponent.prototype.ngOnChanges = function (changes) {
        var _a;
        // Cuando cambia algun valor de los que recibimos por input se produce este evento
        if (((_a = changes.datos) === null || _a === void 0 ? void 0 : _a.currentValue) != undefined) {
            this.cargarDatos();
        }
    };
    ListadoProfesionalesPorEspecialidadComponent.prototype.cargarDatos = function () {
        var _this = this;
        this.dataSource = new table_1.MatTableDataSource(this.datos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        setTimeout(function () {
            _this.ordernarTabla('y', orden_enum_1.Orden.Descendente);
        }, 1000);
    };
    ListadoProfesionalesPorEspecialidadComponent.prototype.mostrarToast = function (mensaje, duracion) {
        this.toastManager.open(mensaje, '', { duration: duracion, panelClass: ['toast-confirmado'] });
    };
    ListadoProfesionalesPorEspecialidadComponent.prototype.applyFilter = function (event) {
        // Volvemos el filterPredicate al por Default
        this.dataSource.filterPredicate = function (data, filter) {
            var dataStr = Object.keys(data).reduce(function (currentTerm, key) {
                return currentTerm + data[key] + '◬';
            }, '').toLowerCase();
            var transformedFilter = filter.trim().toLowerCase();
            return dataStr.indexOf(transformedFilter) != -1;
        };
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    ListadoProfesionalesPorEspecialidadComponent.prototype.refrescarTabla = function () {
        this.changeDetectorRefs.detectChanges();
    };
    /* #region  Exportar */
    ListadoProfesionalesPorEspecialidadComponent.prototype.crearPDF = function () {
        var columnasPDF = ['Nombre Profesional', 'Cantidad de turnos'];
        pdf_creator_1.PdfCreator.CrearPDF(columnasPDF, this.tituloListado, this.convertirDatosEnArray(), false, true);
    };
    ListadoProfesionalesPorEspecialidadComponent.prototype.convertirDatosEnArray = function () {
        var arrayDatos = [];
        this.dataSource.filteredData.forEach(function (unDato) {
            var unDatoArray = new Array;
            unDatoArray.push(unDato.name);
            unDatoArray.push(unDato.y);
            arrayDatos.push(unDatoArray);
        });
        return arrayDatos;
    };
    ListadoProfesionalesPorEspecialidadComponent.prototype.getDate = function () {
        return this.datePipe.transform(new Date, "yyyy-MM-dd hh:mm:ss");
    };
    ListadoProfesionalesPorEspecialidadComponent.prototype.ordernarTabla = function (nombreColumna, orden) {
        var sortState = { active: nombreColumna, direction: orden };
        this.dataSource.paginator = this.paginator;
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
    };
    __decorate([
        core_1.Input()
    ], ListadoProfesionalesPorEspecialidadComponent.prototype, "datos");
    __decorate([
        core_1.Input()
    ], ListadoProfesionalesPorEspecialidadComponent.prototype, "tituloListado");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], ListadoProfesionalesPorEspecialidadComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], ListadoProfesionalesPorEspecialidadComponent.prototype, "sort");
    ListadoProfesionalesPorEspecialidadComponent = __decorate([
        core_1.Component({
            selector: 'app-listado-profesionales-por-especialidad',
            templateUrl: './listado-profesionales-por-especialidad.component.html',
            styleUrls: ['./listado-profesionales-por-especialidad.component.scss']
        })
    ], ListadoProfesionalesPorEspecialidadComponent);
    return ListadoProfesionalesPorEspecialidadComponent;
}());
exports.ListadoProfesionalesPorEspecialidadComponent = ListadoProfesionalesPorEspecialidadComponent;
