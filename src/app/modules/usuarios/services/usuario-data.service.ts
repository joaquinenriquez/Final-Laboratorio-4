import { Rol } from './../models/rol.enum';
import { AuthService } from './../../shared/services/auth.service';
import { Profesional } from './../models/profesional';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from './../models/usuario';
import { DataService } from './../../shared/services/data.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UsuarioDataService {

  private nombreColeccion: string = 'usuarios';
  private campoId: string = 'idUsuario';
  public datosUsuarioActual: Usuario
  
  constructor(private db: DataService) { }

  public GuardarNuevoUsuario(nuevoUsuario: Usuario): Promise<void> {    
    return this.db.nuevoDocumentoConID(this.nombreColeccion, nuevoUsuario.idUsuario, nuevoUsuario);
  }

  public TraerUsuarioPorId(idUsuario: string) {
    return this.db.traerDocumentoPorId('usuarios', idUsuario);
  }

  public TraerTodosLosUsuario() {
    return this.db.traerTodosLosDocumentos(this.nombreColeccion, this.campoId);
  }

  public TraerTodosLosUsuariosPorRol(rol: Rol) {
    return this.db.traerDocumentosPorValorPropiedad(this.nombreColeccion, 'rol', rol, this.campoId);
  }

  public modificarUsuario(usuario: Usuario): Promise<void> {
    return this.db.modificarDocumentoPorId(this.nombreColeccion, usuario.idUsuario , usuario);
  }

  
}
