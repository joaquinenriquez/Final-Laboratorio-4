import { Especialidad } from './../../usuarios/models/especialidad';
import { Usuario } from '../../usuarios/models/usuario';
import { Profesional } from './../../usuarios/models/profesional';
import { Turno } from './turno';

export interface DatosSolicitudTurnoPorEspecialidad {
    especialidadSeleccionada: Especialidad;
    profesionales: Usuario[];
    turnosSolicitados: Turno[];
    diaSeleccionado: Date;
}
