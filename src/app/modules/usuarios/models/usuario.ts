import { HorarioTrabajo } from './../../turnos/models/horario-trabajo';
import { EstadoUsuario } from './estado-usuario.enum';
import firebase from 'firebase/app'
import { Rol } from './rol.enum';

export interface Usuario extends firebase.User {
    idUsuario?: string;
    rol: Rol
    estado: EstadoUsuario
    password?: string;
    nombre?: string;
    apellido?: string;
    dni?: string;
    telefono?: string;
    especialidades?: string[];
    nroAfiliado?: string;
    HorarioTrabajo?: HorarioTrabajo[];
    imagen1?: string;
    imagen2?: string;
    calificacion?: number;
    fechaAlta?: firebase.firestore.Timestamp;
}
