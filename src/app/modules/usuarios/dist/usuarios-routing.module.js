"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsuariosRoutingModule = void 0;
var informe_usuarios_component_1 = require("./pages/informe-usuarios/informe-usuarios.component");
var informe_profesionales_por_especialidad_component_1 = require("./pages/informe-profesionales-por-especialidad/informe-profesionales-por-especialidad.component");
var perfil_usuario_component_1 = require("./pages/perfil-usuario/perfil-usuario.component");
var informe_turnos_por_pacientes_component_1 = require("./pages/informe-turnos-por-pacientes/informe-turnos-por-pacientes.component");
var informe_detalle_respuestas_encuestas_component_1 = require("./pages/informe-detalle-respuestas-encuestas/informe-detalle-respuestas-encuestas.component");
var informe_pacientes_por_especialidad_component_1 = require("./pages/informe-pacientes-por-especialidad/informe-pacientes-por-especialidad.component");
var informe_profesionales_por_dias_trabajados_component_1 = require("./pages/informe-profesionales-por-dias-trabajados/informe-profesionales-por-dias-trabajados.component");
var informe_profesionales_por_turnos_component_1 = require("./pages/informe-profesionales-por-turnos/informe-profesionales-por-turnos.component");
var informe_turnos_por_dia_semana_component_1 = require("./pages/informe-turnos-por-dia-semana/informe-turnos-por-dia-semana.component");
var informe_operaciones_por_especialidad_component_1 = require("./pages/informe-operaciones-por-especialidad/informe-operaciones-por-especialidad.component");
var informe_inicio_sesion_component_1 = require("./pages/informe-inicio-sesion/informe-inicio-sesion.component");
var busquedas_component_1 = require("./pages/busquedas/busquedas.component");
var listado_especialidades_component_1 = require("./../especialidades/components/listado-especialidades/listado-especialidades.component");
var encuesta_usuario_component_1 = require("./pages/encuesta-usuario/encuesta-usuario.component");
var home_component_1 = require("./../core/pages/home/home.component");
var atender_turno_component_1 = require("./pages/atender-turno/atender-turno.component");
var verificar_login_guard_1 = require("./../shared/guards/verificar-login.guard");
var gestion_usuarios_component_1 = require("./pages/gestion-usuarios/gestion-usuarios.component");
var gestion_turnos_profesional_component_1 = require("./pages/gestion-turnos-profesional/gestion-turnos-profesional.component");
var mis_turnos_component_1 = require("./pages/mis-turnos/mis-turnos.component");
var registro_profesional_component_1 = require("./pages/registro-profesional/registro-profesional.component");
var login_component_1 = require("./pages/login/login.component");
var registro_paciente_component_1 = require("./pages/registro-paciente/registro-paciente.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var solicitar_turno_component_1 = require("./pages/solicitar-turno/solicitar-turno.component");
var routes = [
    {
        path: '',
        children: [
            { path: 'login', component: login_component_1.LoginComponent },
            { path: 'registro-pacientes', component: registro_paciente_component_1.RegistroPacienteComponent },
            { path: 'especialidades', data: { animation: 'Mover-Derecha' }, component: listado_especialidades_component_1.ListadoEspecialidadesComponent },
            { path: 'registro-profesionales', component: registro_profesional_component_1.RegistroProfesionalComponent },
            { path: 'mis-turnos', data: { animation: 'Mover-Izquierda' }, component: mis_turnos_component_1.MisTurnosComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: 'gestion-turnos', component: gestion_turnos_profesional_component_1.GestionTurnosProfesionalComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: 'gestion-usuarios', data: { animation: 'Mover-Izquierda' }, component: gestion_usuarios_component_1.GestionUsuariosComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: 'solicitar-turno', data: { animation: 'Mover-Derecha' }, component: solicitar_turno_component_1.SolicitarTurnoComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: 'busquedas', data: { animation: 'Mover-Derecha' }, component: busquedas_component_1.BusquedasComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: 'encuesta-usuario', component: encuesta_usuario_component_1.EncuestaUsuarioComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: 'atender-turno/:id', component: atender_turno_component_1.AtenderTurnoComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: 'home', component: home_component_1.HomeComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: 'informe-inicio-sesion', component: informe_inicio_sesion_component_1.InformeInicioSesionComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: 'informe-operaciones-por-especialidad', component: informe_operaciones_por_especialidad_component_1.InformeOperacionesPorEspecialidadComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: 'informe-turnos-por-dia-semana', component: informe_turnos_por_dia_semana_component_1.InformeTurnosPorDiaSemanaComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: 'informe-profesionales-por-turnos', component: informe_profesionales_por_turnos_component_1.InformeProfesionalesPorTurnosComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: 'informe-profesionales-por-dias-trabajados', component: informe_profesionales_por_dias_trabajados_component_1.InformeProfesionalesPorDiasTrabajadosComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: 'informe-pacientes-por-especialidad', component: informe_pacientes_por_especialidad_component_1.InformePacientesPorEspecialidadComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: 'informe-detalle-respuestas-encuestas', component: informe_detalle_respuestas_encuestas_component_1.InformeDetalleRespuestasEncuestasComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: 'informe-turnos-por-paciente', component: informe_turnos_por_pacientes_component_1.InformeTurnosPorPacientesComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: 'informe-usuarios', component: informe_usuarios_component_1.InformeUsuariosComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: 'informe-profesionales-por-especialidad', component: informe_profesionales_por_especialidad_component_1.InformeProfesionalesPorEspecialidadComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: 'perfil-usuario', component: perfil_usuario_component_1.PerfilUsuarioComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: '', component: home_component_1.HomeComponent, canActivate: [verificar_login_guard_1.VerificarLoginGuard] },
            { path: '**', redirectTo: '', pathMatch: 'full', canActivate: [verificar_login_guard_1.VerificarLoginGuard] }
        ]
    },
];
var UsuariosRoutingModule = /** @class */ (function () {
    function UsuariosRoutingModule() {
    }
    UsuariosRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], UsuariosRoutingModule);
    return UsuariosRoutingModule;
}());
exports.UsuariosRoutingModule = UsuariosRoutingModule;
