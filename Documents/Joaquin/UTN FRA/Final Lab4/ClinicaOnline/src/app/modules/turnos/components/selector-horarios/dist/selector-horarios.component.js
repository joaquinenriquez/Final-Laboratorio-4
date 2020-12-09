"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SelectorHorariosComponent = void 0;
var tipo_busqueda_enum_1 = require("./../../models/tipo-busqueda.enum");
var core_1 = require("@angular/core");
var moment = require("moment");
var SelectorHorariosComponent = /** @class */ (function () {
    function SelectorHorariosComponent() {
        this.horariosDisponibles = [];
        this.horarioSeleccionado = new core_1.EventEmitter();
    }
    SelectorHorariosComponent.prototype.ngOnInit = function () { };
    SelectorHorariosComponent.prototype.ngOnChanges = function (changes) {
        var _a, _b;
        // Cuando cambia algun valor de los que recibimos por input se produce este evento
        if (((_a = changes.datosDiaSeleccionado) === null || _a === void 0 ? void 0 : _a.currentValue) != undefined && this.tipoBusqueda == tipo_busqueda_enum_1.TipoBusqueda.Profesional) {
            this.mostrarHorariosDisponiblesProfesional();
        }
        if (((_b = changes.datosDiaSeleccionado) === null || _b === void 0 ? void 0 : _b.currentValue) != undefined && this.tipoBusqueda == tipo_busqueda_enum_1.TipoBusqueda.Especialidades) {
            //this.mostrarHorariosDisponiblesEspecialidades();
            this.getHorarioInicioDiaSeleccionado();
        }
    };
    SelectorHorariosComponent.prototype.mostrarHorariosDisponiblesEspecialidades = function () {
        var _this = this;
        // Vaciamos el array
        this.horariosDisponibles = [];
        // Seteamos la hora en cero del dia seleccionado para poder compararla sin problemas
        this.datosDiaSeleccionado.diaSeleccionado.setHours(0, 0, 0, 0);
        // Nos quedamos con los turnos del dia seleccionado
        var turnosDelDiaSeleccionado = this.datosDiaSeleccionado.turnosSolicitados.filter(function (unTurnoSolicitado) { return unTurnoSolicitado.fechaTurno.toDate().toString() == _this.datosDiaSeleccionado.diaSeleccionado.toString(); });
        // Ordenamos los turnos del dia por horarios
        turnosDelDiaSeleccionado.sort(CompararHorariosTurnos);
        // Si ese dia no hay turnos generamos todos los turnos como libres y nos vamos
        if (turnosDelDiaSeleccionado.length == 0) {
            this.horariosDisponibles = this.generarTodosLosHorariosDisponibles();
            return;
        }
        var horarioFinalizacion = this.getHorarioFinDiaSeleccionado();
        var horaFinTurnoAnterior = this.getHorarioInicioDiaSeleccionado();
        var auxHorarioDisponible = horaFinTurnoAnterior.clone();
        // Agregamos los turnos disponibles antes e intermedios
        turnosDelDiaSeleccionado.forEach(function (turnoOcupado, indice) {
            console.log(indice, turnoOcupado);
            var horaInicioTurnoActual = moment(turnoOcupado.horarioTurno, 'HH:mm');
            while (auxHorarioDisponible < horaInicioTurnoActual) {
                console.log(indice, auxHorarioDisponible.format('HH:mm'));
                _this.horariosDisponibles.push(auxHorarioDisponible.format('HH:mm'));
                auxHorarioDisponible.add(30, 'minutes');
            }
            auxHorarioDisponible = moment(turnoOcupado.horarioTurno, 'HH:mm').add(turnoOcupado.duracionEstimada, 'minutes');
        });
        // Agregamos los turnos disponibles en la cola
        var ultimoTurnoDelDia = turnosDelDiaSeleccionado[turnosDelDiaSeleccionado.length - 1];
        auxHorarioDisponible = moment(ultimoTurnoDelDia.horarioTurno, 'HH:mm').add(ultimoTurnoDelDia.duracionEstimada, 'minutes');
        while (auxHorarioDisponible < horarioFinalizacion) {
            console.log(auxHorarioDisponible.format('HH:mm'));
            this.horariosDisponibles.push(auxHorarioDisponible.format('HH:mm'));
            auxHorarioDisponible.add(30, 'minutes');
        }
    };
    // Generamos todos los turnos en el horario disponible
    SelectorHorariosComponent.prototype.mostrarHorariosDisponiblesProfesional = function () {
        var _this = this;
        // Vaciamos el array
        this.horariosDisponibles = [];
        // Seteamos la hora en cero del dia seleccionado para poder compararla sin problemas
        this.datosDiaSeleccionado.diaSeleccionado.setHours(0, 0, 0, 0);
        // Nos quedamos con los turnos del dia seleccionado
        var turnosDelDiaSeleccionado = this.datosDiaSeleccionado.turnosSolicitados.filter(function (unTurnoSolicitado) { return unTurnoSolicitado.fechaTurno.toDate().toString() == _this.datosDiaSeleccionado.diaSeleccionado.toString(); });
        // Ordenamos los turnos del dia por horarios
        turnosDelDiaSeleccionado.sort(CompararHorariosTurnos);
        // Si ese dia no hay turnos generamos todos los turnos como libres y nos vamos
        if (turnosDelDiaSeleccionado.length == 0) {
            this.horariosDisponibles = this.generarTodosLosHorariosDisponibles();
            return;
        }
        var horarioFinalizacion = this.getHorarioFinDiaSeleccionado();
        var horaFinTurnoAnterior = this.getHorarioInicioDiaSeleccionado();
        var auxHorarioDisponible = horaFinTurnoAnterior.clone();
        // Agregamos los turnos disponibles antes e intermedios
        turnosDelDiaSeleccionado.forEach(function (turnoOcupado, indice) {
            console.log(indice, turnoOcupado);
            var horaInicioTurnoActual = moment(turnoOcupado.horarioTurno, 'HH:mm');
            while (auxHorarioDisponible < horaInicioTurnoActual) {
                console.log(indice, auxHorarioDisponible.format('HH:mm'));
                _this.horariosDisponibles.push(auxHorarioDisponible.format('HH:mm'));
                auxHorarioDisponible.add(30, 'minutes');
            }
            auxHorarioDisponible = moment(turnoOcupado.horarioTurno, 'HH:mm').add(turnoOcupado.duracionEstimada, 'minutes');
        });
        // Agregamos los turnos disponibles en la cola
        var ultimoTurnoDelDia = turnosDelDiaSeleccionado[turnosDelDiaSeleccionado.length - 1];
        auxHorarioDisponible = moment(ultimoTurnoDelDia.horarioTurno, 'HH:mm').add(ultimoTurnoDelDia.duracionEstimada, 'minutes');
        while (auxHorarioDisponible < horarioFinalizacion) {
            console.log(auxHorarioDisponible.format('HH:mm'));
            this.horariosDisponibles.push(auxHorarioDisponible.format('HH:mm'));
            auxHorarioDisponible.add(30, 'minutes');
        }
    };
    SelectorHorariosComponent.prototype.getHorarioInicioDiaSeleccionado = function () {
        var horarioInicio;
        //Nos quedamos con el dia de la semana seleccionado. Restamos uno para sincronizarlo con las posiciones del array que tenemos guardado (no tiene domingo)
        var nroDia = this.datosDiaSeleccionado.diaSeleccionado.getDay() - 1;
        // Horario de inicio y finalizacion de trabajo del profesional
        if (this.tipoBusqueda == tipo_busqueda_enum_1.TipoBusqueda.Profesional) {
            horarioInicio = moment(this.datosDiaSeleccionado.profesionalSeleccionado.HorarioTrabajo[nroDia].horarioInicio, 'HH:mm');
        }
        else {
            var horariosInicio = this.datosDiaSeleccionado.profesionales.forEach(function (unProfesional) {
                // return moment (unProfesional.HorarioTrabajo[nroDia].horarioInicio, 'HH:mm');
                console.log('assdasd', unProfesional.HorarioTrabajo[nroDia]);
            });
            console.log('horarios', horarioInicio);
        }
        return horarioInicio;
    };
    SelectorHorariosComponent.prototype.getHorarioFinDiaSeleccionado = function () {
        //Nos quedamos con el dia de la semana seleccionado. Restamos uno para sincronizarlo con las posiciones del array que tenemos guardado (no tiene domingo)
        var nroDia = this.datosDiaSeleccionado.diaSeleccionado.getDay() - 1;
        var horarioFin = moment(this.datosDiaSeleccionado.profesionalSeleccionado.HorarioTrabajo[nroDia].horarioFin, 'HH:mm');
        return horarioFin;
    };
    SelectorHorariosComponent.prototype.generarTodosLosHorariosDisponibles = function () {
        var horarioInicio = this.getHorarioInicioDiaSeleccionado();
        var horarioFinalizacion = this.getHorarioFinDiaSeleccionado();
        // Array con todos los horarios posibles
        var horariosPosibles = [];
        var auxHorario = horarioInicio;
        horariosPosibles.push(horarioInicio.format('HH:mm'));
        while (auxHorario <= horarioFinalizacion) {
            var nuevoHorario = auxHorario.add(30, 'minutes').format('HH:mm');
            horariosPosibles.push(nuevoHorario);
        }
        return horariosPosibles;
    };
    SelectorHorariosComponent.prototype.confirmarTurno = function (horarioSeleccionado) {
        this.horarioSeleccionado.emit(horarioSeleccionado);
    };
    __decorate([
        core_1.Input()
    ], SelectorHorariosComponent.prototype, "tipoBusqueda");
    __decorate([
        core_1.Input()
    ], SelectorHorariosComponent.prototype, "datosDiaSeleccionado");
    __decorate([
        core_1.Output()
    ], SelectorHorariosComponent.prototype, "horarioSeleccionado");
    SelectorHorariosComponent = __decorate([
        core_1.Component({
            selector: 'app-selector-horarios',
            templateUrl: './selector-horarios.component.html',
            styleUrls: ['./selector-horarios.component.scss']
        })
    ], SelectorHorariosComponent);
    return SelectorHorariosComponent;
}());
exports.SelectorHorariosComponent = SelectorHorariosComponent;
function CompararHorariosTurnos(a, b) {
    if (a.horarioTurno < b.horarioTurno) {
        return -1;
    }
    if (a.horarioTurno > b.horarioTurno) {
        return 1;
    }
    return 0;
}
