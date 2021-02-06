import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { Observable } from 'rxjs';
import { Rol } from './../models/rol.enum';
import { Profesional } from './../models/profesional';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from './../models/usuario';
import { DataService } from './../../shared/services/data.service';
import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuarioDataService {

  private nombreColeccion: string = 'usuarios';
  private campoId: string = 'idUsuario';
  //public datosUsuarioActual: Usuario
  public rolUsuarioActual;
  
  constructor(private db: DataService, private auth: AuthService) {

    // this.auth.datosUsuario.subscribe(userData => {
    //   this.TraerUsuarioPorId(userData.uid).subscribe(datosUsuario => {
    //     this.datosUsuarioActual = datosUsuario;    
    //   })
    // })
   }

  public GuardarNuevoUsuario(nuevoUsuario: Usuario): Promise<void> {    
    return this.db.nuevoDocumentoConID(this.nombreColeccion, nuevoUsuario.idUsuario, nuevoUsuario);
  }

  public TraerUsuarioPorId(idUsuario: string): Observable<Usuario> {
    return this.db.traerDocumentoPorId('usuarios', idUsuario);
  }

  public TraerTodosLosUsuario() {
    return this.db.traerTodosLosDocumentos(this.nombreColeccion, this.campoId);
  }

  public TraerTodosLosUsuariosPorRol(rol: Rol):Observable<Usuario[]> {
    return this.db.traerDocumentosPorValorPropiedad(this.nombreColeccion, 'rol', rol, this.campoId);
  }

  public modificarUsuario(usuario: Usuario): Promise<void> {
    return this.db.modificarDocumentoPorId(this.nombreColeccion, usuario.idUsuario , usuario);
  }
  
}
