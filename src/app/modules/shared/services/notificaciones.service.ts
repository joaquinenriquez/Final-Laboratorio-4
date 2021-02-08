import { Notificacion } from './../models/notificacion';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  private nombreColeccion: string = 'notificaciones';
  private campoId: string = 'idNotificacion';
  //public datosUsuarioActual: Usuario
  public rolUsuarioActual;
  
  constructor(private db: DataService, private auth: AuthService) {}

  public GuardarNuevaNotificacionConId(nuevaNotificacion: Notificacion): Promise<void> {    
    return this.db.nuevoDocumentoConID(this.nombreColeccion, nuevaNotificacion.idNotificacion, nuevaNotificacion);
  }

  public GuardarNuevaNotificacionConIdAutomatico(nuevaNotificacion: Notificacion): Promise<DocumentReference<firebase.default.firestore.DocumentData>> {
    return this.db.nuevoDocumentoIDAutomatico(this.nombreColeccion, nuevaNotificacion);
  }

  public TraerNotificacionPorId(idNotificacion: string): Observable<Notificacion> {
    return this.db.traerDocumentoPorId(this.nombreColeccion, idNotificacion);
  }

  public TraerTodasLasNotificaciones(): Observable<Notificacion[]> {
    return this.db.traerTodosLosDocumentos(this.nombreColeccion, this.campoId);
  }

  public TraerNotificacionesPorUsuarioDestino(idUsuarioDestino: string):Observable<Notificacion[]> {
    return this.db.traerDocumentosPorValorPropiedad(this.nombreColeccion, 'idUsuarioDestino', idUsuarioDestino, this.campoId);
  }

  public ModificarNotificacion(notificacion: Notificacion): Promise<void> {
    return this.db.modificarDocumentoPorId(this.nombreColeccion, notificacion.idNotificacion , notificacion);
  }

}
  