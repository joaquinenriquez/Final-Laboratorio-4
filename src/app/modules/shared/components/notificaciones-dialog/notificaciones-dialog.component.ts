import { ToastService } from './../../services/toast.service';
import { NotificacionesService } from './../../services/notificaciones.service';
import { Component, Inject, OnInit } from '@angular/core';
import { DialogPosition, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notificacion } from '../../models/notificacion';


@Component({
  selector: 'app-notificaciones-dialog',
  templateUrl: './notificaciones-dialog.component.html',
  styleUrls: ['./notificaciones-dialog.component.scss']
})
export class NotificacionesDialogComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public datosNotificaciones,
    public dialogRef: MatDialogRef<NotificacionesDialogComponent>,
    private notificacionService: NotificacionesService) { }

  ngOnInit() {

    console.log(this.datosNotificaciones);

    if (this.datosNotificaciones.datos.length == 0) {
      this.dialogRef.updateSize("200px", "100px");
    }


    this.changePosition();
  }

  changePosition() {
    let posicion: DialogPosition = {
      right: "20px",
      top: `${this.datosNotificaciones.posicionY + 50}px`
    };

    this.dialogRef.updatePosition(posicion);
  }

  getImagenPerfil(imagen: string): string {
    
    if (imagen == null || imagen == undefined || imagen.length === 0) 
    {
      return `url('/assets/img/utn_avatar.png')`;
    }

    return `url('${imagen}')`
  }


  marcarComoLeeida(unaNotificacion: Notificacion): void {
    unaNotificacion.notificacionLeida = true;
    this.notificacionService.ModificarNotificacion(unaNotificacion);

    for (var i = 0; i < this.datosNotificaciones.datos.length; i++) {
      if (this.datosNotificaciones.datos[i].idNotificacion === unaNotificacion.idNotificacion) {
        this.datosNotificaciones.datos.splice(i, 1);
      }

    }

    if (this.datosNotificaciones.datos.length === 0) {
      this.dialogRef.close(true);
    }

  }


}

