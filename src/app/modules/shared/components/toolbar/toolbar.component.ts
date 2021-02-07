import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { Usuario } from 'src/app/modules/usuarios/models/usuario';
import { Rol } from './../../../usuarios/models/rol.enum';
import { UsuarioDataService } from './../../../usuarios/services/usuario-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  Roles = Rol;
  datosUsuarioActual: Observable<Usuario>;

  idiomaSeleccionado

  constructor(public auth: AuthService,
    private router: Router,
    public usuarioDataService: UsuarioDataService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private translateService: TranslateService) {
    this.agregarIconos();
  }

  ngOnInit(): void {

    this.auth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.datosUsuarioActual = this.usuarioDataService.TraerUsuarioPorId(user.uid);
      }
      else {
        this.datosUsuarioActual = null;
      }
    });

    this.idiomaSeleccionado = localStorage.getItem('idioma') || 'ar';

  }


  onLogOut() {
    this.auth.cerrarSesion();
    this.datosUsuarioActual
    this.router.navigate(['/login']);
  }

  agregarIconos() {
    this.matIconRegistry.addSvgIcon(`ar`, this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/flag-for-argentina.svg"));
    this.matIconRegistry.addSvgIcon(`br`, this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/flag-for-brazil.svg"));
    this.matIconRegistry.addSvgIcon(`en`, this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/uk.svg"));
  }


  cambiarIdioma(idioma) {
    localStorage.setItem('idioma', idioma);
    this.idiomaSeleccionado = idioma;
    this.translateService.use(idioma);
    this.translateService.setDefaultLang(idioma);

    //window.location.reload();
    // Hacemos esto para no tener que recargar la página
    const prev = this.router.url;
    this.router.navigate(['/']).then(data => {
      this.router.navigate([prev]);
    });
  }



}
