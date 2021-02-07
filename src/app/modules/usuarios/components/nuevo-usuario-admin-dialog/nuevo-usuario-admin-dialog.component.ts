
import { EstadoUsuario } from './../../models/estado-usuario.enum';
import { Usuario } from './../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { UsuarioDataService } from '../../services/usuario-data.service';
import Swal from 'sweetalert2';
import { Rol } from '../../models/rol.enum';
import { first, mergeMap } from 'rxjs/operators';
import firebase from 'firebase/app';

@Component({
  selector: 'app-nuevo-usuario-admin-dialog',
  templateUrl: './nuevo-usuario-admin-dialog.component.html',
  styleUrls: ['./nuevo-usuario-admin-dialog.component.scss']
})
export class NuevoUsuarioAdminDialogComponent implements OnInit {

  largoMinPassword: number = environment.seguridad.minimoLargoPassword;
  ocultarPassword = true;

  usuario = new Object();

  formRegistro: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(this.largoMinPassword)]),
    nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$')]),
    apellido: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$')]),
  });

  constructor(public dialogRef: MatDialogRef<NuevoUsuarioAdminDialogComponent>,
              private authService: AuthService,
              private usuarioDataSvc: UsuarioDataService) { }

  ngOnInit(): void {
    this.authService.datosUsuario.pipe(
      mergeMap((usarioActual: any) => this.usuarioDataSvc.TraerUsuarioPorId(usarioActual.uid))).pipe(first()).subscribe(datos => {
        Object.assign(this.usuario, datos);
      });
  }

  cancelar(): void {
    this.dialogRef.close(undefined);
  }

  registrarConEmail(nuevoUsuario: Usuario) {
    console.log(this.usuario);

    nuevoUsuario.displayName = `${nuevoUsuario.nombre} ${nuevoUsuario.apellido}`;
    this.authService.cearUsuarioConEmail(nuevoUsuario)
      .then(resultado => {

        resultado.user.updateProfile({ displayName: nuevoUsuario.displayName });
        nuevoUsuario.idUsuario = resultado.user.uid
        nuevoUsuario.fechaAlta = firebase.firestore.Timestamp.now();
        nuevoUsuario.rol = Rol.Administrador;
        nuevoUsuario.estado = EstadoUsuario.Habilitado;

        this.usuarioDataSvc.GuardarNuevoUsuario(nuevoUsuario).then(() => {
          this.authService.cerrarSesion();
          this.authService.loginConEmail(this.usuario as Usuario);
          this.dialogRef.close();
        });
      }).catch(error => {
        let mensajeError = '';
        switch (error.code) {
          case 'auth/email-already-in-use':
            mensajeError = 'Ya alguien se registro con ese email'
            break;
        }

        Swal.fire({ icon: 'error', title: 'Error al crear el usuario', text: mensajeError, confirmButtonText: 'Acpetar' })

        console.log(error)
      });
  }

}



