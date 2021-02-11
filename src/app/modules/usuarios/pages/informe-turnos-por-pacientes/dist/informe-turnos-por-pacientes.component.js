"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InformeTurnosPorPacientesComponent = void 0;
var widget_general_component_1 = require("./../../../graficos/widget-general/widget-general.component");
var core_1 = require("@angular/core");
var estado_turno_enum_1 = require("src/app/modules/turnos/models/estado-turno.enum");
var rol_enum_1 = require("../../models/rol.enum");
var InformeTurnosPorPacientesComponent = /** @class */ (function () {
    function InformeTurnosPorPacientesComponent(usuarioDataService, turnoDataService) {
        this.usuarioDataService = usuarioDataService;
        this.turnoDataService = turnoDataService;
        this.TipoGrafico = widget_general_component_1.TipoGrafico;
        this.datosInforme = [{ name: 'sin datos', y: 0 }];
        this.tituloInforme = 'Turnos por paciente';
        this.ocultarDatosCero = true;
    }
    InformeTurnosPorPacientesComponent.prototype.ngOnInit = function () { };
    InformeTurnosPorPacientesComponent.prototype.ngAfterViewInit = function () {
        this.traerDatos();
    };
    InformeTurnosPorPacientesComponent.prototype.traerDatos = function () {
        var _this = this;
        this.turnoDataService.traerTodasLosTurnos().subscribe(function (todosLosTurnos) {
            _this.usuarioDataService.TraerTodosLosUsuariosPorRol(rol_enum_1.Rol.Paciente).subscribe(function (todosLosUsuarios) {
                _this.datosInforme = [];
                todosLosUsuarios.forEach(function (unUsuario) {
                    _this.datosInforme.push({ name: unUsuario.displayName, y: _this.calcularTurnosPorPaciente(todosLosTurnos, unUsuario.idUsuario) });
                });
                if (_this.ocultarDatosCero) {
                    _this.datosInforme = _this.datosInforme.filter(function (unDato) { return unDato.y > 0; });
                }
            });
        });
    };
    InformeTurnosPorPacientesComponent.prototype.calcularTurnosPorPaciente = function (todosLosTurnos, idUsuario) {
        return todosLosTurnos.filter(function (unTurno) { return unTurno.idUsuario == idUsuario && unTurno.estadoTurno != estado_turno_enum_1.EstadoTurno.Cancelado && unTurno.estadoTurno && estado_turno_enum_1.EstadoTurno.Suspendido; }).length;
    };
    InformeTurnosPorPacientesComponent = __decorate([
        core_1.Component({
            selector: 'app-informe-turnos-por-pacientes',
            templateUrl: './informe-turnos-por-pacientes.component.html',
            styleUrls: ['./informe-turnos-por-pacientes.component.scss']
        })
    ], InformeTurnosPorPacientesComponent);
    return InformeTurnosPorPacientesComponent;
}());
exports.InformeTurnosPorPacientesComponent = InformeTurnosPorPacientesComponent;
