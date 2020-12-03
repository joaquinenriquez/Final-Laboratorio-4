import { environment } from './../../../../../environments/environment';
import { UsuarioDataService } from '../../services/usuario-data.service';
import { DataService } from '../../../shared/services/data.service';
import { Usuario } from '../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

import Swal from 'sweetalert2';
import { Rol } from '../../models/rol.enum';
import { EstadoUsuario } from '../../models/estado-usuario.enum';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.scss']
})
export class RegistroPacienteComponent implements OnInit {

  largoMinPassword: number = environment.seguridad.minimoLargoPassword;
  ocultarPassword = true;

  formRegistro: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(this.largoMinPassword)]),
    nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$')]),
    apellido: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$')]),
  });

  constructor(private authService: AuthService,
    private router: Router,
    private usuarioDataSvc: UsuarioDataService) { }

  ngOnInit(): void {
  }



  registrarConEmail(nuevoUsuario: Usuario) {
    nuevoUsuario.displayName = `${nuevoUsuario.nombre} ${nuevoUsuario.apellido}`;
    this.authService.cearUsuarioConEmail(nuevoUsuario)
      .then(resultado => {
        resultado.user.updateProfile({displayName: nuevoUsuario.displayName});
        nuevoUsuario.idUsuario = resultado.user.uid
        this.guardarBD(nuevoUsuario);
        Swal.fire({
          icon: 'info', 
          title: 'Gracias por registrarte', 
          html: `Vamos a enviarte un correo a <strong>${this.formRegistro.get('email').value}</strong> para que verifiques tu cuenta`, 
          confirmButtonText: 'Acpetar'
        }).then( async registroExitoso => {
          await this.authService.enviarEmailDeVerificacion();
          this.authService.cerrarSesion();
          //Mostrar spinner
          this.router.navigate(['/login']);
        });
        console.log(resultado)
      })
      .catch(error => {
        let mensajeError = '';
        switch (error.code) {
          case 'auth/email-already-in-use':
            mensajeError = 'Ya alguien se registro con ese email'
            break;
        }

        Swal.fire({icon: 'error', title: 'Error al crear el usuario', text: mensajeError, confirmButtonText: 'Acpetar'})

        console.log(error)
      });
  }

  guardarBD(nuevoUsuario: Usuario) {
    nuevoUsuario.rol = Rol.Paciente;
    nuevoUsuario.estado = EstadoUsuario.Habilitado;
    console.log('Guardar en DB', this.usuarioDataSvc.GuardarNuevoUsuario(nuevoUsuario));
  }
  
}
