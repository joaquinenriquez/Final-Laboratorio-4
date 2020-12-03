import { UsuarioDataService } from './../../services/usuario-data.service';
import { environment } from './../../../../../environments/environment';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import firebase from 'firebase/app';
import { Usuario } from '../../models/usuario';
import { Rol } from '../../models/rol.enum';
import { EstadoUsuario } from '../../models/estado-usuario.enum';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(environment.seguridad.minimoLargoPassword)])
  })

  constructor(private authService: AuthService,
    private router: Router,
    public usuarioDataService: UsuarioDataService) { }

  ngOnInit(): void {

  }


  iniciarSesion(usuario: any) {

    let mensajeError = '';

    this.authService.loginConEmail(usuario)
      .then(resultadoLogin => { this.verificadoEstadoCuenta(resultadoLogin) })
      .catch(error => {

        switch (error.code) {
          case 'auth/user-not-found':
            mensajeError = 'El usuario no existe';
            break;

          case 'auth/wrong-password':
            mensajeError = 'La contraseña es incorrecta';
            break;

          case 'auth/too-many-requests':
            mensajeError = 'Demasiados intentos fallidos. La cuenta esta inhabilitada temporalmente';
        }

        Swal.fire({
          icon: 'error',
          title: 'Error al intentar iniciar sesión',
          html: mensajeError,
          confirmButtonText: 'Acpetar'
        })

        console.log(error)
      });
  }

  // verificadoEstadoCuenta(resultadoLogin: firebase.auth.UserCredential) {

  //   this.usuarioDataService.TraerUsuarioPorId(resultadoLogin.user.uid).subscribe(datosUsuario => {

  //     let usuario = datosUsuario as Usuario;
  //     this.usuarioDataService.datosUsuarioActual = usuario;

  //     switch (usuario.rol) {
  //       case Rol.Paciente:
  //         {
  //           if (resultadoLogin.user.emailVerified) {
  //             console.log('Login Correcto!', resultadoLogin);
  //             this.router.navigate(['/home-usuario']);
  //           } else {
  //             this.mostrarMensajeCuentaNoVerificadaPaciente();
  //           }

  //           break;
  //         }

  //       case Rol.Profesional:
  //         {
  //           if (usuario.estado == EstadoUsuario.Habilitado) {
  //             console.log('Login Correcto!', resultadoLogin);
  //             this.router.navigate(['/home-usuario']);
  //           } else {
  //             this.mostrarMensajeCuentaNoAprobadaProfesional();
  //             this.authService.cerrarSesion();
  //           }
  //           break;
  //         }

  //     }
  //   });

  // }

  verificadoEstadoCuenta(resultadoLogin: firebase.auth.UserCredential) {

    // se ejecuta solo una vez
    this.usuarioDataService.TraerUsuarioPorId(resultadoLogin.user.uid).pipe(first()).subscribe(datosUsuario => 
    {
      let usuario = datosUsuario as Usuario;
      this.usuarioDataService.datosUsuarioActual = usuario;

      switch (usuario.rol) {
        case Rol.Paciente:
          {
            if (!resultadoLogin.user.emailVerified) {
              this.mostrarMensajeCuentaNoVerificadaPaciente();
            } else {
              if (usuario.estado == EstadoUsuario.Deshabilitado) {
                this.mostrarMensajeCuentaDeshabilitada();
              } else {
                console.log('Login Correcto!', resultadoLogin);
                this.router.navigate(['/home-usuario']);
              }
            }

            break;
          }

        case Rol.Profesional:
          {
            if (usuario.estado == EstadoUsuario.Habilitado) {
              console.log('Login Correcto!', resultadoLogin);
              this.router.navigate(['/home-usuario']);
            } else {
              this.mostrarMensajeCuentaNoAprobadaProfesional();
              this.authService.cerrarSesion();
            }
            break;
          }

      }
    });

  }



  mostrarMensajeCuentaNoVerificadaPaciente() {
    Swal.fire({
      title: 'Aún no verificaste tu cuenta',
      html: "Te enviamos un email para que verifiques tu cuenta.<br>¿Aún no te llegó? Probemos enviartelo nuevamente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Reenviar email de verificación!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.enviarEmailDeVerificacion().then(() => {
          this.authService.cerrarSesion();
          Swal.fire(
            'Enviado!',
            'Acabamos de enviarte nuevamente el correo.',
            'success'
          )
        });
      }
    })
  }

  mostrarMensajeCuentaNoAprobadaProfesional() {
    Swal.fire({
      title: 'Tu cuenta todavía no fue aprobada',
      html: "Aún ningún administrador pudo aprobar tu cuenta. Por favor volvé a intentar mas tarde",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar'
    });
  }

  mostrarMensajeCuentaDeshabilitada() {
    Swal.fire({
      title: 'Tu cuenta se encuentra deshabilitada',
      html: "Por favor volvé a intentar mas tarde",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar'
    });
  }


}
