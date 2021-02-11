import { TranslateService } from '@ngx-translate/core';
import { MatSelect } from '@angular/material/select';
import { EstadoUsuario } from './../../models/estado-usuario.enum';
import { Usuario } from './../../models/usuario';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cambiar-estado-usuario-dialog',
  templateUrl: './cambiar-estado-usuario-dialog.component.html',
  styleUrls: ['./cambiar-estado-usuario-dialog.component.scss']
})
export class CambiarEstadoUsuarioDialogComponent implements OnInit {

  @ViewChild(MatSelect) selectCambiarEstado: MatSelect;
  opcionesEstado: EstadoUsuario[];
  nuevoEstado: EstadoUsuario;


  constructor(@Inject(MAT_DIALOG_DATA) public usuario: Usuario,
              public dialogRef: MatDialogRef<CambiarEstadoUsuarioDialogComponent>,
              private translateService: TranslateService) { }

  ngOnInit(): void {

    switch(this.usuario.estado) 
    {
      case EstadoUsuario.PendienteAprobacion:
        this.opcionesEstado = [EstadoUsuario.Habilitado, EstadoUsuario.Deshabilitado];
        break;
      
      case EstadoUsuario.Deshabilitado:
        this.opcionesEstado = [EstadoUsuario.Habilitado];
        break;

        case EstadoUsuario.Habilitado:
          this.opcionesEstado = [EstadoUsuario.Deshabilitado];
          break;
    }

    setTimeout ( () => { 
      this.selectCambiarEstado.focus();
    }, 0);

  }

  cancelar(): void {
    this.dialogRef.close(undefined);
  }

  cambiarEstado(): void {
    this.dialogRef.close(this.nuevoEstado);
  }

}


















