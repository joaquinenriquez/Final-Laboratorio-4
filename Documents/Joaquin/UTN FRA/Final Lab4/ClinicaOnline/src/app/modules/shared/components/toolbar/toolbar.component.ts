import { Usuario } from 'src/app/modules/usuarios/models/usuario';
import { Rol } from './../../../usuarios/models/rol.enum';
import { UsuarioDataService } from './../../../usuarios/services/usuario-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  Roles = Rol;
  datosUsuarioActual: Usuario;

  constructor(public auth: AuthService,
    private router: Router,
    public userDataSvc: UsuarioDataService) { }

  ngOnInit(): void {

    this.auth.datosUsuario.subscribe(datosUsuario => {
      let usuario = datosUsuario as firebase.User;
      this.userDataSvc.TraerUsuarioPorId(usuario?.uid).subscribe(datosUsuario => {
        this.datosUsuarioActual = datosUsuario
      });
    })
  }

  onLogOut() {
    this.auth.cerrarSesion();
    this.router.navigate(['/login']);
  }

}
