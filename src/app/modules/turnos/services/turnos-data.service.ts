import { Observable } from 'rxjs';
import { Turno } from './../models/turno';
import { DataService } from './../../shared/services/data.service';
import { Injectable } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TurnosDataService {

  private nombreColeccion: string = 'turnos';
  private campoId: string = 'idTurno';

  constructor(private db: DataService) { }


  public traerTodasLosTurnos(): Observable<Turno> {
    return this.db.traerTodosLosDocumentos(this.nombreColeccion, this.campoId);
  }

  public eliminarUnTurno(idTurno: string) {
    return this.db.eliminarDocumentoPorId(this.nombreColeccion, idTurno);
  }

  public nuevaTurno(turno: Turno): Promise<DocumentReference<firebase.default.firestore.DocumentData>> {
    return this.db.nuevoDocumentoIDAutomatico(this.nombreColeccion, turno);
  }

  public modificarTurno(turno: Turno): Promise<void> {
    return this.db.modificarDocumentoPorId(this.nombreColeccion, turno.idTurno, turno);
  }

  public traerTurnosPorUsuario(idUsuario: string) {
    return this.db.traerDocumentosPorValorPropiedad(this.nombreColeccion, 'idUsuario', idUsuario, this.campoId);
  }

  public traerTurnosPorProfesional(idProfesional: string):Observable<Turno[]> {
    return this.db.traerDocumentosPorValorPropiedad(this.nombreColeccion, 'idProfesional', idProfesional, this.campoId);
  }

  public traerTodosLosTurnosPorEspecialidad(especialidad: string): Observable<Turno[]> {
    return this.db.traerDocumentosPorValorPropiedad(this.nombreColeccion, 'especialidadProfesional', especialidad, this.campoId);
  }

  public traerTurnoPorId(idTurno: string): Observable<Turno> {
    return this.db.traerDocumentoPorId(this.nombreColeccion, idTurno);
  }

}
