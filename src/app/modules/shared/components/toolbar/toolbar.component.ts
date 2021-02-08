import { ToastService } from './../../services/toast.service';
import { Notificacion } from './../../models/notificacion';
import { NotificacionesService } from './../../services/notificaciones.service';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Usuario } from 'src/app/modules/usuarios/models/usuario';
import { Rol } from './../../../usuarios/models/rol.enum';
import { UsuarioDataService } from './../../../usuarios/services/usuario-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';

import { NotificacionesDialogComponent } from '../notificaciones-dialog/notificaciones-dialog.component';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  Roles = Rol;
  datosUsuarioActual: Observable<Usuario>;

  notificaciones: Notificacion[];

  idiomaSeleccionado

  constructor(public auth: AuthService,
    private router: Router,
    public usuarioDataService: UsuarioDataService,
    private translateService: TranslateService,
    private notificacionesService: NotificacionesService,
    private dialog: MatDialog,
    private toastService: ToastService) {
  }


  ngOnInit(): void {

    this.auth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.datosUsuarioActual = this.usuarioDataService.TraerUsuarioPorId(user.uid);
        this.notificacionesService.TraerNotificacionesPorUsuarioDestino(user.uid).subscribe(datosNotificaciones => {
          this.notificaciones = datosNotificaciones.filter(unaNotificacion => unaNotificacion.notificacionLeida == false)
          console.log(this.notificaciones.length, this.notificaciones);
        });
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


  cambiarIdioma(idioma) {
    localStorage.setItem('idioma', idioma);
    this.idiomaSeleccionado = idioma;
    this.translateService.use(idioma);

    //window.location.reload();
    // Hacemos esto para no tener que recargar la página
    
    const prev = this.router.url;
    this.router.navigate(['/']).then(data => {
      this.router.navigate([prev]);
    });
  }


  mostrarNotificaciones(event): void {

    if (this.notificaciones.length == 0) 
    {
      this.toastService.MostrarToast('No hay notificaciones nuevas', 2000);
      return;
    }

    this.dialog.open(NotificacionesDialogComponent,
      {
        width: '400px',
        height: '400px',
        data: { datos: this.notificaciones, posicionX:event.clientX, posicionY: event.clientY }
      }).afterClosed().subscribe(datos => {
        if (datos == true) {
          this.toastService.MostrarToast('No hay mas notificaciones por el momento...', 2000);
        }
      });
      
  }


}
