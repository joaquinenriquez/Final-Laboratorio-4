"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InformeUsuariosComponent = void 0;
var widget_general_component_1 = require("./../../../graficos/widget-general/widget-general.component");
var core_1 = require("@angular/core");
var rol_enum_1 = require("../../models/rol.enum");
var estado_usuario_enum_1 = require("../../models/estado-usuario.enum");
var InformeUsuariosComponent = /** @class */ (function () {
    function InformeUsuariosComponent(usuarioDataService) {
        this.usuarioDataService = usuarioDataService;
        this.TipoGrafico = widget_general_component_1.TipoGrafico;
        this.datosInformeUsuariosPorRol = [{ name: 'sin datos', y: 0 }];
        this.datosInformeUsuariosPorEstado = [{ name: 'sin datos', y: 0 }];
        this.datosInforme = [{ name: 'sin datos', y: 0 }];
        this.tituloInformePorRol = 'Usuarios por rol';
        this.tituloInformePorEstado = 'Usuarios por estado';
        this.tituloInformeTodosLosUsuarios = 'Todos los usuarios';
        this.ocultarDatosCero = true;
    }
    InformeUsuariosComponent.prototype.ngOnInit = function () { };
    InformeUsuariosComponent.prototype.ngAfterViewInit = function () {
        this.traerDatos();
    };
    InformeUsuariosComponent.prototype.traerDatos = function () {
        var _this = this;
        this.usuarioDataService.TraerTodosLosUsuario().subscribe(function (todosLosUsuarios) {
            _this.todosLosUsuarios = todosLosUsuarios;
            _this.datosInformeUsuariosPorRol = [];
            _this.datosInformeUsuariosPorEstado = [];
            _this.datosInformeUsuariosPorRol.push({ name: rol_enum_1.Rol.Paciente, y: _this.calcularUsuariosPorRol(todosLosUsuarios, rol_enum_1.Rol.Paciente) });
            _this.datosInformeUsuariosPorRol.push({ name: rol_enum_1.Rol.Profesional, y: _this.calcularUsuariosPorRol(todosLosUsuarios, rol_enum_1.Rol.Profesional) });
            _this.datosInformeUsuariosPorRol.push({ name: rol_enum_1.Rol.Administrador, y: _this.calcularUsuariosPorRol(todosLosUsuarios, rol_enum_1.Rol.Administrador) });
            _this.datosInformeUsuariosPorEstado.push({ name: estado_usuario_enum_1.EstadoUsuario.Habilitado, y: _this.calcularUsuariosPorEstado(todosLosUsuarios, estado_usuario_enum_1.EstadoUsuario.Habilitado) });
            _this.datosInformeUsuariosPorEstado.push({ name: estado_usuario_enum_1.EstadoUsuario.PendienteAprobacion, y: _this.calcularUsuariosPorEstado(todosLosUsuarios, estado_usuario_enum_1.EstadoUsuario.PendienteAprobacion) });
            _this.datosInformeUsuariosPorEstado.push({ name: estado_usuario_enum_1.EstadoUsuario.Deshabilitado, y: _this.calcularUsuariosPorEstado(todosLosUsuarios, estado_usuario_enum_1.EstadoUsuario.Deshabilitado) });
        });
    };
    InformeUsuariosComponent.prototype.calcularUsuariosPorRol = function (todosLosUsuarios, rol) {
        return todosLosUsuarios.filter(function (unUsuario) { return unUsuario.rol == rol && unUsuario.estado != estado_usuario_enum_1.EstadoUsuario.Deshabilitado; }).length;
    };
    InformeUsuariosComponent.prototype.calcularUsuariosPorEstado = function (todosLosUsuarios, estado) {
        return todosLosUsuarios.filter(function (unUsuario) { return unUsuario.estado == estado; }).length;
    };
    InformeUsuariosComponent = __decorate([
        core_1.Component({
            selector: 'app-informe-usuarios',
            templateUrl: './informe-usuarios.component.html',
            styleUrls: ['./informe-usuarios.component.scss']
        })
    ], InformeUsuariosComponent);
    return InformeUsuariosComponent;
}());
exports.InformeUsuariosComponent = InformeUsuariosComponent;
