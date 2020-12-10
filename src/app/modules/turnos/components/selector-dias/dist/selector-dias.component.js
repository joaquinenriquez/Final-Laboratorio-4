"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SelectorDiasComponent = void 0;
var tipo_busqueda_enum_1 = require("./../../models/tipo-busqueda.enum");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var rol_enum_1 = require("src/app/modules/usuarios/models/rol.enum");
var estado_turno_enum_1 = require("../../models/estado-turno.enum");
var SelectorDiasComponent = /** @class */ (function () {
    function SelectorDiasComponent(turnosDataService, usuariosDataService) {
        this.turnosDataService = turnosDataService;
        this.usuariosDataService = usuariosDataService;
        this.CambioDia = new core_1.EventEmitter();
        this.proximasFechasTrabajables = [];
    }
    SelectorDiasComponent.prototype.ngOnInit = function () { };
    SelectorDiasComponent.prototype.ngOnChanges = function (changes) {
        var _a, _b;
        // Cuando cambia algun valor de los que recibimos por input se produce este evento
        if (((_a = changes.profesionalSeleccionado) === null || _a === void 0 ? void 0 : _a.currentValue) != undefined && this.tipoBusqueda == tipo_busqueda_enum_1.TipoBusqueda.Profesional) {
            this.generarDiasPorProfesional();
        }
        if (((_b = changes.especialidadSeleccionada) === null || _b === void 0 ? void 0 : _b.currentValue) != undefined && this.tipoBusqueda == tipo_busqueda_enum_1.TipoBusqueda.Especialidades) {
            this.generarDiasPorEspecialidad();
        }
    };
    SelectorDiasComponent.prototype.generarDiasPorProfesional = function () {
        var _this = this;
        var hoy = new Date();
        var fechaMaximaTurnos = new Date();
        var auxFecha = hoy;
        var indice = 1;
        // Reiniciamos el array de dias trabajables
        this.proximasFechasTrabajables = [];
        fechaMaximaTurnos.setDate(hoy.getDate() + 15);
        while (auxFecha <= fechaMaximaTurnos) {
            this.profesionalSeleccionado.HorarioTrabajo.forEach(function (value, index) {
                if (index + 1 == auxFecha.getDay() && value.check == true) {
                    _this.proximasFechasTrabajables.push(new Date(auxFecha.valueOf()));
                }
            });
            indice++;
            auxFecha.setDate(auxFecha.getDate() + 1);
        }
    };
    SelectorDiasComponent.prototype.generarDiasPorEspecialidad = function () {
        var _this = this;
        var hoy = new Date();
        var fechaMaximaTurnos = new Date();
        var auxFecha = hoy;
        var indice = 1;
        var profesionalesPorEspecialidad = [];
        fechaMaximaTurnos.setDate(hoy.getDate() + 15);
        this.usuariosDataService.TraerTodosLosUsuariosPorRol(rol_enum_1.Rol.Profesional).pipe(operators_1.first()).subscribe(function (todosLosProfesionales) {
            profesionalesPorEspecialidad = todosLosProfesionales.filter(function (unProfesional) {
                return unProfesional.especialidades.filter(function (unaEspecialidad) { return unaEspecialidad == _this.especialidadSeleccionada.nombreEspecialidad; });
            });
            while (auxFecha <= fechaMaximaTurnos) {
                profesionalesPorEspecialidad.forEach(function (unProfesional) {
                    unProfesional.HorarioTrabajo.forEach(function (value, index) {
                        if (index + 1 == auxFecha.getDay() && value.check == true) {
                            _this.proximasFechasTrabajables.push(new Date(auxFecha.valueOf()));
                        }
                    });
                });
                indice++;
                auxFecha.setDate(auxFecha.getDate() + 1);
            }
        });
    };
    SelectorDiasComponent.prototype.traerTurnosPorEspecialidad = function () {
        var _this = this;
        var hoy = new Date();
        var fechaMaximaTurnos = new Date();
        var auxFecha = hoy;
        var indice = 1;
        var auxDatosDeTodosLosProfesionales = [];
        var profesionalesPorEspecialidad = [];
        this.usuariosDataService.TraerTodosLosUsuariosPorRol(rol_enum_1.Rol.Profesional).pipe(operators_1.first()).subscribe(function (todosLosProfesionales) {
            profesionalesPorEspecialidad = todosLosProfesionales.filter(function (unProfesional) {
                return unProfesional.especialidades.filter(function (unaEspecialidad) { return unaEspecialidad == _this.especialidadSeleccionada.nombreEspecialidad; });
            });
            profesionalesPorEspecialidad.forEach(function (unProfesional) {
                var datosUnProfesional = {}; // Crea una nueva instancia basada en una interface
                datosUnProfesional.profesionalSeleccionado = unProfesional;
                _this.turnosDataService.traerTurnosPorProfesional(unProfesional.idUsuario).pipe(operators_1.first()).subscribe(function (turnosDelProfesional) {
                    datosUnProfesional.turnosSolicitados = turnosDelProfesional.filter(function (unTurnoSolicitado) {
                        return (unTurnoSolicitado.estadoTurno != estado_turno_enum_1.EstadoTurno.Cancelado && unTurnoSolicitado.estadoTurno != estado_turno_enum_1.EstadoTurno.Finalizado && unTurnoSolicitado.estadoTurno != estado_turno_enum_1.EstadoTurno.Suspendido);
                    });
                });
                auxDatosDeTodosLosProfesionales.push(datosUnProfesional);
            });
        });
    };
    SelectorDiasComponent.prototype.traerTurnosPorProfesional = function () {
        var _this = this;
        var hoy = new Date();
        var fechaMaximaTurnos = new Date();
        var auxFecha = hoy;
        var indice = 1;
        this.turnosDataService.traerTurnosPorProfesional(this.profesionalSeleccionado.idUsuario).pipe(operators_1.first()).subscribe(function (turnosSolicitados) {
            _this.turnosProfesionalSeleccionado = turnosSolicitados.filter(function (unTurnoSolicitado) {
                return (unTurnoSolicitado.estadoTurno != estado_turno_enum_1.EstadoTurno.Cancelado && unTurnoSolicitado.estadoTurno != estado_turno_enum_1.EstadoTurno.Finalizado && unTurnoSolicitado.estadoTurno != estado_turno_enum_1.EstadoTurno.Suspendido);
            });
            fechaMaximaTurnos.setDate(hoy.getDate() + 15);
            while (auxFecha <= fechaMaximaTurnos) {
                _this.profesionalSeleccionado.HorarioTrabajo.forEach(function (value, index) {
                    if (index + 1 == auxFecha.getDay() && value.check == true) {
                        _this.proximasFechasTrabajables.push(new Date(auxFecha.valueOf()));
                    }
                });
                indice++;
                auxFecha.setDate(auxFecha.getDate() + 1);
            }
        });
    };
    SelectorDiasComponent.prototype.seleccionarDia = function (dia) {
        var datosDiaSeleccionado = [];
        var auxDatos;
        // Seteamos la hora en cero del dia seleccionado para poder compararla sin problemas
        dia.setHours(0, 0, 0, 0);
        switch (this.tipoBusqueda) {
            case tipo_busqueda_enum_1.TipoBusqueda.Profesional:
                auxDatos =
                    {
                        profesionalSeleccionado: this.profesionalSeleccionado,
                        diaSeleccionado: dia,
                        turnosSolicitados: this.turnosProfesionalSeleccionado.filter(function (unTurnoSolicitado) { return unTurnoSolicitado.fechaTurno.toDate().toString() == dia.toString(); })
                    };
                datosDiaSeleccionado.push(auxDatos);
                break;
            case tipo_busqueda_enum_1.TipoBusqueda.Especialidades:
                break;
        }
        this.CambioDia.emit(datosDiaSeleccionado);
    };
    __decorate([
        core_1.Input()
    ], SelectorDiasComponent.prototype, "tipoBusqueda");
    __decorate([
        core_1.Input()
    ], SelectorDiasComponent.prototype, "profesionalSeleccionado");
    __decorate([
        core_1.Input()
    ], SelectorDiasComponent.prototype, "especialidadSeleccionada");
    __decorate([
        core_1.Output()
    ], SelectorDiasComponent.prototype, "CambioDia");
    SelectorDiasComponent = __decorate([
        core_1.Component({
            selector: 'app-selector-dias',
            templateUrl: './selector-dias.component.html',
            styleUrls: ['./selector-dias.component.scss']
        })
    ], SelectorDiasComponent);
    return SelectorDiasComponent;
}());
exports.SelectorDiasComponent = SelectorDiasComponent;
