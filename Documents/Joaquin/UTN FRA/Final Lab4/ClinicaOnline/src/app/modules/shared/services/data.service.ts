import { Usuario } from './../../usuarios/models/usuario';
import { Injectable } from '@angular/core';

// Firebase
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  public nuevoDocumentoIDAutomatico(nombreColeccion: string, objecto: any): Promise<DocumentReference>{
    return this.afs.collection(nombreColeccion).add(Object.assign({}, objecto));
  }

  public nuevoDocumentoConID(nombreColeccion: string, idDocumento: string, objeto: any): Promise<void> {
    return this.afs.collection(nombreColeccion).doc(idDocumento).set(Object.assign({}, objeto));
  }

  public traerDocumentoPorId(nombreColeccion: string, idDocumento: string): Observable<any> {
    return this.afs.collection(nombreColeccion).doc(idDocumento).valueChanges();
  }

  public traerTodosLosDocumentos(nombreColeccion: string, campoId: string): Observable<any> {
    return this.afs.collection(nombreColeccion).valueChanges({idField: campoId});
  }

  public eliminarDocumentoPorId(nombreColeccion: string, idDocumento: string): Promise<void> {
    return this.afs.collection(nombreColeccion).doc(idDocumento).delete();
  }

  public modificarDocumentoPorId(nombreColeecion: string, idDocumento: string, objeto: any): Promise<void> {
    return this.afs.collection(nombreColeecion).doc(idDocumento).set(Object.assign({}, objeto));
  }

  public traerDocumentosPorValorPropiedad(nombreColeecion: string, nombrePropiedad: string, valorPropiedad: string, campoId: string): Observable<any> {
    return this.afs.collection(nombreColeecion, referencia => referencia.where(nombrePropiedad, '==', valorPropiedad)).valueChanges({idField: campoId});;
  }

  


}
