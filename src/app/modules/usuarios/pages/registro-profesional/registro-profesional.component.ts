import { DiaSemana } from './../../../turnos/models/dia-semana.enum';
import { HorarioTrabajo } from './../../../turnos/models/horario-trabajo';
import { Especialidad } from './../../../especialidades/models/especialidad';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { environment } from './../../../../../environments/environment';
import { Usuario } from './../../models/usuario';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MultiSelectConBuscadorComponent } from 'src/app/modules/shared/components/multi-select-con-buscador/multi-select-con-buscador.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../../models/rol.enum';
import { UsuarioDataService } from '../../services/usuario-data.service';
import { EstadoUsuario } from '../../models/estado-usuario.enum';
import { EspecialidadesDataService } from 'src/app/modules/especialidades/services/especialidades-data.service';

// Firebase
import firebase from 'firebase/app';


@Component({
  selector: 'app-registro-profesional',
  templateUrl: './registro-profesional.component.html',
  styleUrls: ['./registro-profesional.component.scss']
})
export class RegistroProfesionalComponent implements OnInit {

  cardNumber = 0;

  largoMinPassword: number = environment.seguridad.minimoLargoPassword;
  ocultarPassword = true;
  @ViewChild('especialidadesControl') especialidadesControl: MultiSelectConBuscadorComponent;
  especiales: Especialidad[];
  espacialesString: string[] = [];

  horariosTrabajo: HorarioTrabajo[] = [{ nombreDia: DiaSemana.Lunes, check: false }, { nombreDia: DiaSemana.Martes, check: false }, { nombreDia: DiaSemana.Miercoles, check: false }, { nombreDia: DiaSemana.Jueves, check: false }, { nombreDia: DiaSemana.Viernes, check: false }, { nombreDia: DiaSemana.Sabado, check: false }]

  //diasTrabajo = [{nombreDia: 'Lunes', check: false}, {nombreDia: 'Martes', check: false}, {nombreDia: 'Miércoles', check: false}, {nombreDia: 'Jueves', check: false}, {nombreDia: 'Viernes', check: false}, {nombreDia: 'Sábado', check: false}];
  horariosApertura = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'];

  deshabilitarcaptcha: boolean = false;

  formRegistro: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(this.largoMinPassword)]),
    nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$')]),
    apellido: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$')]),
    captcha: new FormControl({ value: '', disabled: this.deshabilitarcaptcha }, Validators.required)
  });

  constructor(private authService: AuthService,
    private router: Router,
    private usuarioDataSvc: UsuarioDataService,
    private especialidadDataService: EspecialidadesDataService) { }

  ngOnInit() {
    this.especialidadDataService.traerTodasLasEspecialidades().subscribe(datos => {
      this.espacialesString = datos.map(item => item['nombreEspecialidad']);
      setTimeout(() => { this.especialidadesControl.cargarLista() }, 3);
    });

  }

  registrarConEmail(nuevoUsuario: Usuario) {
    nuevoUsuario.displayName = `${nuevoUsuario.nombre} ${nuevoUsuario.apellido}`;
    nuevoUsuario.HorarioTrabajo = this.horariosTrabajo;
    this.authService.cearUsuarioConEmail(nuevoUsuario)
      .then(resultado => {
        resultado.user.updateProfile({ displayName: nuevoUsuario.displayName });
        nuevoUsuario.idUsuario = resultado.user.uid
        this.guardarBD(nuevoUsuario);
        Swal.fire({
          icon: 'info',
          title: 'Gracias por registrarte',
          html: `Nuestro staff debe aprobar su cuenta. Por favor intente ingresar en unos momentos`,
          confirmButtonText: 'Acpetar'
        }).then(async registroExitoso => {
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

        Swal.fire({ icon: 'error', title: 'Error al crear el usuario', text: mensajeError, confirmButtonText: 'Acpetar' })

        console.log(error)
      });
  }


  guardarBD(nuevoUsuario: Usuario) {
    nuevoUsuario.fechaAlta = firebase.firestore.Timestamp.now();
    nuevoUsuario.rol = Rol.Profesional;
    nuevoUsuario.estado = EstadoUsuario.PendienteAprobacion;
    nuevoUsuario.especialidades = this.especialidadesControl.selectControl?.value;
    console.log('Guardar en DB', this.usuarioDataSvc.GuardarNuevoUsuario(nuevoUsuario));
  }

  verficarCamposPaso1(): boolean {
    return (
      this.formRegistro.controls['email'].valid &&
      this.formRegistro.controls['password'].valid &&
      this.formRegistro.controls['nombre'].valid &&
      this.formRegistro.controls['apellido'].valid
    );
  }

  validarHorarios(): boolean {
    let auxReturn = true;

    this.horariosTrabajo.forEach(unHorario => {
      if (unHorario.check) {
        if (unHorario?.horarioInicio && unHorario?.horarioFin) {
          auxReturn = false;
        } else {
          auxReturn = true;
        }
      }
    });

    return auxReturn;
  }

  deshabilitarCaptcha() {
    if (this.deshabilitarcaptcha) {
      this.deshabilitarcaptcha = false;
      this.formRegistro.addControl('captcha', new FormControl({ value: '', disabled: this.deshabilitarcaptcha }, Validators.required));

    } else {
      this.deshabilitarcaptcha = true;
      this.formRegistro.removeControl('captcha');
    }
  }



}


