import { Rol } from 'src/app/modules/usuarios/models/rol.enum';
import { Observable } from 'rxjs';
import { UsuarioDataService } from './../../../usuarios/services/usuario-data.service';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { Usuario } from './../../../usuarios/models/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-usuario-bar',
  templateUrl: './datos-usuario-bar.component.html',
  styleUrls: ['./datos-usuario-bar.component.scss']
})
export class DatosUsuarioBarComponent implements OnInit {

  datosUsuarioActual: Observable<Usuario>;
  Rol = Rol;
  
  constructor(private auth: AuthService,
              private usuarioDataService: UsuarioDataService) { }

  ngOnInit(): void {

    this.auth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.datosUsuarioActual = this.usuarioDataService.TraerUsuarioPorId(user.uid);
      }
    });
  }

}
