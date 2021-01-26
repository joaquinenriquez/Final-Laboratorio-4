import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { UsuarioDataService } from '../../services/usuario-data.service';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrls: ['./busquedas.component.scss']
})
export class BusquedasComponent implements OnInit {

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