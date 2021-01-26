import { Usuario } from './../../usuarios/models/usuario';
import { Injectable } from '@angular/core';

// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public datosUsuario: Observable<firebase.User>

  constructor(public auth: AngularFireAuth) { 
    this.datosUsuario = this.auth.authState;
    
  }

  public cearUsuarioConEmail(nuevoUsuario: Usuario): Promise<firebase.auth.UserCredential> {
    return this.auth.createUserWithEmailAndPassword(nuevoUsuario.email, nuevoUsuario.password);
  }

  public loginConEmail(usuario: Usuario): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(usuario.email, usuario.password);
  }

  public cerrarSesion(): Promise<void> {
    return this.auth.signOut();
  }

  public async enviarEmailDeVerificacion(): Promise<void> {
    return (await this.auth.currentUser).sendEmailVerification();
  }

}
