import { SpinnerService } from './../../../shared/services/spinner.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { UsuarioDataService } from '../../services/usuario-data.service';
import { Usuario } from '../../models/usuario';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

import Swal from 'sweetalert2';
import { Rol } from '../../models/rol.enum';
import { EstadoUsuario } from '../../models/estado-usuario.enum';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

// Firebase
import firebase from 'firebase/app';

export interface FormModel {
  captcha?: string;
}


@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.scss']
})
export class RegistroPacienteComponent implements OnInit {

  largoMinPassword: number = environment.seguridad.minimoLargoPassword;
  ocultarPassword = true;

  CaptchaKey = '6Lf3fQAaAAAAAByz1gtAp9jcdUOO6RXCuhaRsuOF';

  deshabilitarcaptcha: boolean = false;

  porcentajeSubidaImagen: Observable<number>;
  imagenes: Imagen[] = [];
  @ViewChild('inputFile') inputFile: ElementRef;

  public formModel: FormModel = {};

  formRegistro: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(this.largoMinPassword)]),
    nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$')]),
    apellido: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$')]),
    captcha: new FormControl({value: '', disabled: this.deshabilitarcaptcha}, Validators.required)
  });

  constructor(private authService: AuthService,
    private router: Router,
    private usuarioDataSvc: UsuarioDataService,
    private storage: AngularFireStorage,
    private translateService: TranslateService) { }

  ngOnInit(): void {
  }

  registrarConEmail(nuevoUsuario: Usuario) {
    nuevoUsuario.displayName = `${nuevoUsuario.nombre} ${nuevoUsuario.apellido}`;
    this.authService.cearUsuarioConEmail(nuevoUsuario)
      .then(resultado => {
        resultado.user.updateProfile({ displayName: nuevoUsuario.displayName });
        nuevoUsuario.idUsuario = resultado.user.uid
        this.guardarBD(nuevoUsuario);
        Swal.fire({
          icon: 'info',
          title: 'Gracias por registrarte',
          html: `Vamos a enviarte un correo a <strong>${this.formRegistro.get('email').value}</strong> para que verifiques tu cuenta`,
          confirmButtonText: 'Acpetar',
          confirmButtonColor: '#558B2F'
        }).then(async registroExitoso => {
          await this.authService.enviarEmailDeVerificacion();
          this.authService.cerrarSesion();
          //Mostrar spinner
          this.router.navigate(['/login']);
        });
        console.log(resultado)
      })
      .catch(error => {
        let mensajeError = '';
        switch (error.code) 
        {
          case 'auth/email-already-in-use':
            mensajeError = 'Ya alguien se registro con ese email'
            break;
        }

        Swal.fire({ icon: 'error', title: this.translateService.instant('Error al crear el usuario'), text: mensajeError, confirmButtonText: 'Acpetar', confirmButtonColor: '#558B2F'})

        console.log(error)
      });
  }

  guardarBD(nuevoUsuario: Usuario) {

    if (this.imagenes.length > 1) {
      nuevoUsuario.imagen1 = this.imagenes[0].urlImagen;
      nuevoUsuario.imagen2 = this.imagenes[1].urlImagen;
    } else if (this.imagenes.length == 1) {
      nuevoUsuario.imagen1 = this.imagenes[0].urlImagen;
    }

    nuevoUsuario.fechaAlta = firebase.firestore.Timestamp.now();
    nuevoUsuario.rol = Rol.Paciente;
    nuevoUsuario.estado = EstadoUsuario.Habilitado;
    console.log('Guardar en DB', this.usuarioDataSvc.GuardarNuevoUsuario(nuevoUsuario));
  }

  subirFoto(event) {  

    const idFoto = Math.random().toString(36).substring(2);
    const archivo = event.target.files[0];
    const ruta = `fotosPerfil/${idFoto}`;
    const ref = this.storage.ref(ruta);

    const tarea = this.storage.upload(ruta, archivo);
    this.porcentajeSubidaImagen = tarea.percentageChanges();

    tarea.snapshotChanges().pipe(finalize(() => {



      let imagen: Imagen =
      {
        texto: `Foto ${this.imagenes.length + 1}`
      }

      ref.getDownloadURL().subscribe(datos => this.imagenes[this.imagenes.length - 1].urlImagen = datos);

      this.imagenes.push(imagen);
      //this.inputFile.nativeElement.value = '';
      console.log('finalizo subida');

    })).subscribe();



    console.log(event);
  }

  quitarFoto(unaImagen) {
    const indice = this.imagenes.indexOf(unaImagen);
    this.imagenes.splice(indice, 1);
  }

  deshabilitarCaptcha() {

    if (this.deshabilitarcaptcha) {
      this.formRegistro.controls['captcha']?.disable();
      this.formRegistro.addControl('captcha', new FormControl({value: '', disabled: this.deshabilitarcaptcha}, Validators.required));
    } else {
      this.formRegistro.removeControl('captcha');
    }

    this.deshabilitarcaptcha = !this.deshabilitarcaptcha;

    console.log(this.formRegistro);

  }

}

interface Imagen {
  urlImagen?: string;
  texto?: string;
}
