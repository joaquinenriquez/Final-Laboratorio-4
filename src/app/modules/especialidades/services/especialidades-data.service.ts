import { Observable } from 'rxjs';
import { Especialidad } from './../models/especialidad';
import { DataService } from './../../shared/services/data.service';
import { Injectable } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesDataService {

  nombreColeccion: string = 'especialidades';
  campoId: string = 'idEspecialidad';
  
  constructor(private db: DataService) { }

  public traerTodasLasEspecialidades(): Observable<Especialidad[]> {
    return this.db.traerTodosLosDocumentos(this.nombreColeccion, this.campoId);
  }

  public eliminarEspecialidad(idEspecialidad: string) {
    return this.db.eliminarDocumentoPorId(this.nombreColeccion, idEspecialidad);
  }

  public nuevaEspecialidad(especialidad: Especialidad): Promise<DocumentReference<firebase.default.firestore.DocumentData>> {
    return this.db.nuevoDocumentoIDAutomatico(this.nombreColeccion, especialidad);
  }

  public modificarEspecialidad(especialidad: Especialidad): Promise<void> {
    return this.db.modificarDocumentoPorId(this.nombreColeccion, especialidad.idEspecialidad, especialidad);
  }


}
