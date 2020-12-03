import { Rol } from './../../models/rol.enum';
import { Component, OnInit } from '@angular/core';
import { UsuarioDataService } from '../../services/usuario-data.service';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.scss']
})
export class GestionUsuariosComponent implements OnInit {

  datosUsuarioActual;

  Roles = Rol;

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
