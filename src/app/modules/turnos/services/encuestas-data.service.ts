import { Injectable } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DataService } from '../../shared/services/data.service';
import { Encuesta } from '../models/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestasDataService {

  private nombreColeccion: string = 'encuestas';
  private campoId: string = 'idEncuesta';

  constructor(private db: DataService) { }


  public traerTodasLasEncuestas(): Observable<Encuesta> {
    return this.db.traerTodosLosDocumentos(this.nombreColeccion, this.campoId);
  }

  public eliminarUnaEncuesta(idEncuesta: string) {
    return this.db.eliminarDocumentoPorId(this.nombreColeccion, idEncuesta);
  }


  public nuevaEncuesta(encuesta: Encuesta): Promise<void> {    
    return this.db.nuevoDocumentoConID(this.nombreColeccion, encuesta.idTurno, encuesta);
  }

  public modificarEncuesta(encuesta: Encuesta): Promise<void> {
    return this.db.modificarDocumentoPorId(this.nombreColeccion, encuesta.idEncuesta, encuesta);
  }

  public traerEncuestasPorUsuario(idUsuario: string) {
    return this.db.traerDocumentosPorValorPropiedad(this.nombreColeccion, 'idUsuario', idUsuario, this.campoId);
  }

  public traerEncuestasPorProfesional(idProfesional: string):Observable<Encuesta[]> {
    return this.db.traerDocumentosPorValorPropiedad(this.nombreColeccion, 'idProfesional', idProfesional, this.campoId);
  }

  public traerTodosLasEncuestasPorEspecialidad(especialidad: string): Observable<Encuesta[]> {
    return this.db.traerDocumentosPorValorPropiedad(this.nombreColeccion, 'especialidadProfesional', especialidad, this.campoId);
  }

  public traerEncuestaPorId(idEncuesta: string): Observable<Encuesta> {
    return this.db.traerDocumentoPorId(this.nombreColeccion, idEncuesta);
  }

  public traerEncuestaPorIdTurno(idTurno: string): Observable<Encuesta> {
    return this.db.traerDocumentosPorValorPropiedad(this.nombreColeccion, 'especialidadProfesional', idTurno, this.campoId);
  }

}
