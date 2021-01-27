import { Log } from './../models/log';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../shared/services/data.service';
import { DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LogDataService {
  private nombreColeccion: string = 'logs';
  private campoId: string = 'idLog';

  constructor(private db: DataService) { }


  public traerTodosLosLogs(): Observable<Log[]> {
    return this.db.traerTodosLosDocumentos(this.nombreColeccion, this.campoId);
  }

  public eliminarUnLog(idLog: string) {
    return this.db.eliminarDocumentoPorId(this.nombreColeccion, idLog);
  }

  public nuevoLog(nuevoLog: Log): Promise<DocumentReference<firebase.default.firestore.DocumentData>> {
    return this.db.nuevoDocumentoIDAutomatico(this.nombreColeccion, nuevoLog);
  }

  public modificarLog(logAModificar: Log): Promise<void> {
    return this.db.modificarDocumentoPorId(this.nombreColeccion, logAModificar.idLog, logAModificar);
  }

  public traerLogsPorUsuario(idUsuario: string) {
    return this.db.traerDocumentosPorValorPropiedad(this.nombreColeccion, 'idUsuario', idUsuario, this.campoId);
  }


  public traerLogPorId(idLog: string): Observable<Log> {
    return this.db.traerDocumentoPorId(this.nombreColeccion, idLog);
  }
}