import { Rol } from 'src/app/modules/usuarios/models/rol.enum';

export interface Log {
    idLog?: string;
    fechaLog: firebase.default.firestore.Timestamp;
    tipoAccion: string;
    idUsuario: string;
    nombreUsuario: string;
    emailUsuario: string;
    rolUsuario: Rol;
}
