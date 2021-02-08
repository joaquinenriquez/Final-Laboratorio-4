import firebase from 'firebase/app'

export interface Notificacion {
    idNotificacion?: string;
    idUsuarioDestino: string;
    idUsuarioOrigen: string;
    nombreUsuarioOrigen?: string;
    fotoUsuarioOrigen?: string;
    nombreUsuarioDestino?: string;
    colorNotificacion?: string;
    fechaCreacion: firebase.firestore.Timestamp;
    textoNotificacion: string;
    notificacionLeida: boolean;
}
