import { EstadoTurno } from './estado-turno.enum';
import { Time } from '@angular/common';


export interface Turno {
    idTurno?: string;
    idProfesional: string;
    nombreProfesional: string;
    especialidadProfesional: string;
    fechaTurno: firebase.default.firestore.Timestamp;
    horarioTurno: string;
    idUsuario: string;
    nombreUsuario: string;
    duracionEstimada: number;
    estadoTurno: EstadoTurno;
    contestoEncuesta?: Boolean;
    resena?: string;
}
