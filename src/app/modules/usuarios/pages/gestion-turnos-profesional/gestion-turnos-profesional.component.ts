import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { UsuarioDataService } from '../../services/usuario-data.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-gestion-turnos-profesional',
  templateUrl: './gestion-turnos-profesional.component.html',
  styleUrls: ['./gestion-turnos-profesional.component.scss']
})
export class GestionTurnosProfesionalComponent implements OnInit {

  datosUsuarioActual;


  constructor(private usuarioDataService: UsuarioDataService, private authService: AuthService) {}

  ngOnInit(): void {
      this.authService.datosUsuario.subscribe(datosUsuario => {
      let usuario = datosUsuario as firebase.User;
      this.usuarioDataService.TraerUsuarioPorId(usuario?.uid).subscribe(datosUsuario => {
      this.datosUsuarioActual = datosUsuario;
      });
    });

    const idiomaSeleccionado = localStorage.getItem('idioma') || 'ar';

  }

}