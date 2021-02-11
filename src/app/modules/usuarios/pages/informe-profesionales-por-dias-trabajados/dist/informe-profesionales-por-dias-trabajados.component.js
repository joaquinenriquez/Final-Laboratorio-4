"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.InformeProfesionalesPorDiasTrabajadosComponent = void 0;
var widget_general_component_1 = require("./../../../graficos/widget-general/widget-general.component");
var core_1 = require("@angular/core");
var estado_turno_enum_1 = require("src/app/modules/turnos/models/estado-turno.enum");
var rol_enum_1 = require("../../models/rol.enum");
var InformeProfesionalesPorDiasTrabajadosComponent = /** @class */ (function () {
    function InformeProfesionalesPorDiasTrabajadosComponent(usuarioDataService, turnoDataService) {
        this.usuarioDataService = usuarioDataService;
        this.turnoDataService = turnoDataService;
        this.TipoGrafico = widget_general_component_1.TipoGrafico;
        this.datosInforme = [{ name: 'sin datos', y: 0 }];
        this.tituloInforme = 'Profesionales por días trabajados';
        this.ocultarDatosCero = true;
    }
    InformeProfesionalesPorDiasTrabajadosComponent.prototype.ngOnInit = function () { };
    InformeProfesionalesPorDiasTrabajadosComponent.prototype.ngAfterViewInit = function () {
        this.traerDatos();
    };
    InformeProfesionalesPorDiasTrabajadosComponent.prototype.traerDatos = function (fechaInicio, fechaFin) {
        var _this = this;
        this.turnoDataService.traerTodasLosTurnos().subscribe(function (todosLosTurnos) {
            if (fechaInicio != null && fechaFin != null) {
                todosLosTurnos = todosLosTurnos.filter(function (unTurno) { return unTurno.fechaTurno.toDate() >= fechaInicio && unTurno.fechaTurno.toDate() <= fechaFin; });
            }
            if (fechaInicio != null && fechaFin == null) {
                todosLosTurnos = todosLosTurnos.filter(function (unTurno) { return unTurno.fechaTurno.toDate() >= fechaInicio; });
            }
            _this.usuarioDataService.TraerTodosLosUsuariosPorRol(rol_enum_1.Rol.Profesional).subscribe(function (todosLosProfesionales) {
                _this.datosInforme = [];
                todosLosProfesionales.forEach(function (unProfesional) {
                    _this.datosInforme.push({ name: unProfesional.displayName, y: _this.calcularDiasPorProfesional(todosLosTurnos, unProfesional.idUsuario) });
                });
                if (_this.ocultarDatosCero) {
                    _this.datosInforme = _this.datosInforme.filter(function (unDato) { return unDato.y > 0; });
                }
            });
        });
    };
    InformeProfesionalesPorDiasTrabajadosComponent.prototype.calcularDiasPorProfesional = function (todosLosTurnos, idProfesional) {
        var turnosAtendidos = todosLosTurnos.filter(function (unTurno) { return unTurno.idProfesional == idProfesional && unTurno.estadoTurno == estado_turno_enum_1.EstadoTurno.Finalizado; });
        // La convertimos en string para poder compararla (si no es complejo encontrar los dias repetidos)
        var fechasTurnos = turnosAtendidos.map(function (unTurno) { return unTurno.fechaTurno.toDate().toString(); });
        var fechaUnicas = __spreadArrays(new Set(fechasTurnos));
        return fechaUnicas.length;
    };
    InformeProfesionalesPorDiasTrabajadosComponent.prototype.filtrarPorFecha = function (evento) {
        this.traerDatos(evento === null || evento === void 0 ? void 0 : evento.fechaInicio, evento === null || evento === void 0 ? void 0 : evento.fechaFin);
    };
    InformeProfesionalesPorDiasTrabajadosComponent = __decorate([
        core_1.Component({
            selector: 'app-informe-profesionales-por-dias-trabajados',
            templateUrl: './informe-profesionales-por-dias-trabajados.component.html',
            styleUrls: ['./informe-profesionales-por-dias-trabajados.component.scss']
        })
    ], InformeProfesionalesPorDiasTrabajadosComponent);
    return InformeProfesionalesPorDiasTrabajadosComponent;
}());
exports.InformeProfesionalesPorDiasTrabajadosComponent = InformeProfesionalesPorDiasTrabajadosComponent;
