"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListadoTurnosPacientesComponent = void 0;
var encuesta_usuario_dialog_component_1 = require("./../../../usuarios/pages/encuesta-usuario-dialog/encuesta-usuario-dialog.component");
var sweetalert2_1 = require("sweetalert2");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var estado_turno_enum_1 = require("../../models/estado-turno.enum");
var table_1 = require("@angular/material/table");
var sort_1 = require("@angular/material/sort");
var paginator_1 = require("@angular/material/paginator");
var visualizar_resena_dialog_component_1 = require("src/app/modules/usuarios/pages/visualizar-resena-dialog/visualizar-resena-dialog.component");
var ListadoTurnosPacientesComponent = /** @class */ (function () {
    function ListadoTurnosPacientesComponent(turnosDataService, toastManager, authService, dialog, encuestaDataService) {
        this.turnosDataService = turnosDataService;
        this.toastManager = toastManager;
        this.authService = authService;
        this.dialog = dialog;
        this.encuestaDataService = encuestaDataService;
    }
    ListadoTurnosPacientesComponent.prototype.ngOnInit = function () { };
    ListadoTurnosPacientesComponent.prototype.ngAfterViewInit = function () {
        this.traerTurnos();
    };
    ListadoTurnosPacientesComponent.prototype.cancelarTurno = function (turno) {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: '<strong>Cancelar turno</strong>',
            icon: 'warning',
            html: "\u00BFEstas seguro que queres cancelar el turno con <b><i>" + turno.nombreProfesional + "</i></b>, " +
                ("para el d\u00EDa <b>" + turno.fechaTurno.toDate().toLocaleDateString() + "</b> ") +
                ("a las <b>" + turno.horarioTurno + "</b>?"),
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonColor: '#F44336',
            confirmButtonText: '<i>Si, estoy seguro!</i>',
            cancelButtonText: '<b>No cancelar</b>'
        }).then(function (resultadoDialogo) {
            if (resultadoDialogo.isConfirmed) {
                turno.estadoTurno = estado_turno_enum_1.EstadoTurno.Cancelado;
                _this.turnosDataService.modificarTurno(turno);
                _this.mostrarToast('El turno fue cancelado con éxito', 2000);
            }
        });
    };
    ListadoTurnosPacientesComponent.prototype.mostrarToast = function (mensaje, duracion) {
        this.toastManager.open(mensaje, '', { duration: duracion, panelClass: ['toast-confirmado'] });
    };
    ListadoTurnosPacientesComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    ListadoTurnosPacientesComponent.prototype.traerTurnos = function () {
        var _this = this;
        this.authService.datosUsuario.pipe(operators_1.mergeMap(function (usarioActual) { return _this.turnosDataService.traerTurnosPorUsuario(usarioActual === null || usarioActual === void 0 ? void 0 : usarioActual.uid); })).subscribe(function (datos) {
            var todosLosTurnos = datos;
            if (_this.tipoFiltro == 'proximos') {
                _this.displayedColumns = ['fechaTurno', 'horarioTurno', 'especialidad', 'nombreProfesional', 'estadoTurno', 'cancelarTurno'];
                _this.dataSource = new table_1.MatTableDataSource(todosLosTurnos.filter(function (unTurno) { return unTurno.estadoTurno != estado_turno_enum_1.EstadoTurno.Cancelado && unTurno.estadoTurno != estado_turno_enum_1.EstadoTurno.Suspendido && unTurno.estadoTurno != estado_turno_enum_1.EstadoTurno.Finalizado; }));
            }
            else {
                _this.dataSource = new table_1.MatTableDataSource(todosLosTurnos.filter(function (unTurno) { return unTurno.estadoTurno == estado_turno_enum_1.EstadoTurno.Finalizado || unTurno.estadoTurno == estado_turno_enum_1.EstadoTurno.Suspendido || unTurno.estadoTurno == estado_turno_enum_1.EstadoTurno.Cancelado; }));
                _this.displayedColumns = ['fechaTurno', 'horarioTurno', 'especialidad', 'nombreProfesional', 'estadoTurno', 'contestarEncuesta', 'verResena'];
            }
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    ListadoTurnosPacientesComponent.prototype.mostrarEncuesta = function (turnoSeleccionado) {
        var _this = this;
        this.dialog.open(encuesta_usuario_dialog_component_1.EncuestaUsuarioDialogComponent, {
            width: '400px',
            height: '600px',
            data: { turno: turnoSeleccionado },
            panelClass: 'horarios-profesional-dialog-container'
        }).afterClosed().subscribe(function (resultadoDialogo) {
            if (resultadoDialogo != undefined) {
                var preguntasEncuesta = resultadoDialogo;
                // Las respuestas de la encuesta
                var nuevaEncuesta = {
                    idTurno: turnoSeleccionado.idTurno,
                    preguntas: preguntasEncuesta
                };
                _this.encuestaDataService.nuevaEncuesta(nuevaEncuesta);
                turnoSeleccionado.contestoEncuesta = true;
                _this.turnosDataService.modificarTurno(turnoSeleccionado);
                sweetalert2_1["default"].fire({
                    title: 'Gracias por elegirnos!',
                    text: 'Sus datos fueron guardos con éxito',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    };
    ListadoTurnosPacientesComponent.prototype.mostrarResena = function (turnoSeleccionado) {
        this.dialog.open(visualizar_resena_dialog_component_1.VisualizarResenaDialogComponent, {
            width: '400px',
            height: '600px',
            data: { turno: turnoSeleccionado },
            panelClass: 'horarios-profesional-dialog-container'
        });
        // this.dialog.open(VisualizarResenaDialogComponent,
        //   {
        //     width: '400px',
        //     height: '600px',
        //     data: { turno: turnoSeleccionado },
        //     panelClass: 'horarios-profesional-dialog-container'
        //   });
    };
    __decorate([
        core_1.Input()
    ], ListadoTurnosPacientesComponent.prototype, "tipoFiltro");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], ListadoTurnosPacientesComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], ListadoTurnosPacientesComponent.prototype, "sort");
    ListadoTurnosPacientesComponent = __decorate([
        core_1.Component({
            selector: 'app-listado-turnos-pacientes',
            templateUrl: './listado-turnos-pacientes.component.html',
            styleUrls: ['./listado-turnos-pacientes.component.scss']
        })
    ], ListadoTurnosPacientesComponent);
    return ListadoTurnosPacientesComponent;
}());
exports.ListadoTurnosPacientesComponent = ListadoTurnosPacientesComponent;
