import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { UsuarioDataService } from '../../services/usuario-data.service';

import firebase from 'firebase/app';

@Component({
  selector: 'app-informe-inicio-sesion',
  templateUrl: './informe-inicio-sesion.component.html',
  styleUrls: ['./informe-inicio-sesion.component.scss']
})
export class InformeInicioSesionComponent implements OnInit {

  datosUsuarioActual;

  constructor(private usuarioDataService: UsuarioDataService, private authService: AuthService) {}

  ngOnInit(): void {
      this.authService.datosUsuario.subscribe(datosUsuario => {
      let usuario = datosUsuario as firebase.User;
      this.usuarioDataService.TraerUsuarioPorId(usuario?.uid).subscribe(datosUsuario => {
      this.datosUsuarioActual = datosUsuario;
      });
    })
  }

}