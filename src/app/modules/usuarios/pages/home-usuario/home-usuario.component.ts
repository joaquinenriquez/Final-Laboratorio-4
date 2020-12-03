import firebase from 'firebase/app';
import { AuthService } from './../../../shared/services/auth.service';
import { UsuarioDataService } from './../../services/usuario-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.scss']
})
export class HomeUsuarioComponent implements OnInit {

  datosUsuarioActual;

  constructor(private usuarioDataService: UsuarioDataService, private authService: AuthService) {
    this.authService.datosUsuario.subscribe(datosUsuario => {
      let usuario = datosUsuario as firebase.User;
      this.usuarioDataService.TraerUsuarioPorId(usuario?.uid).subscribe(datosUsuario => {
        this.datosUsuarioActual = datosUsuario;
      });
    })
  }

  ngOnInit(): void {
  }

}
