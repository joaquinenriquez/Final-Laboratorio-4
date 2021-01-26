import { UsuarioDataService } from './../../../usuarios/services/usuario-data.service';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

import firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  datosUsuarioActual;

  constructor(private authService: AuthService, private usuarioDataService: UsuarioDataService) {

    this.authService.datosUsuario.subscribe(datosUsuario => {
      let usuario = datosUsuario as firebase.User;
      this.usuarioDataService.TraerUsuarioPorId(usuario?.uid).subscribe(datosUsuario => {
        this.datosUsuarioActual = datosUsuario;

      })
    });
  }

  ngOnInit(): void {

  }

}


