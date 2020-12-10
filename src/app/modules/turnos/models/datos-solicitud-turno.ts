import { Especialidad } from '../../usuarios/models/especialidad';
import { Usuario } from '../../usuarios/models/usuario';
import { Turno } from './turno';

export interface DatosSolicitudTurno {
    
    turnosSolicitados?: Turno[];
    horariosDisponibles?: string[];

    especialidadSeleccionada?: Especialidad;
    profesionalSeleccionado?: Usuario;
    diaSeleccionado?: Date;
    horarioSeleccionado?: string;
}
