import { ToastService } from './../../../shared/services/toast.service';
import { SpinnerService } from './../../../shared/services/spinner.service';
import { Rol } from './../../models/rol.enum';
import { AuthService } from './../../../shared/services/auth.service';
import { UsuarioDataService } from './../../services/usuario-data.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { ListadoHorariosProfesionalesComponent } from '../../components/listado-horarios-profesionales/listado-horarios-profesionales.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  Rol = Rol;

  datosUsuarioActual$: Observable<Usuario>;
  datosUsuario: Usuario;

  porcentajeSubidaImagen: Observable<number>;
  @ViewChild('inputFile') inputFile: ElementRef;

  formPerfil: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$')]),
    apellido: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$')]),
    nroAfiliado: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(4)]),
    dni: new FormControl('', [Validators.required,   Validators.pattern("^[0-9]*$"), Validators.minLength(8)]),

  });

  constructor(private usuarioDataService: UsuarioDataService,
              private auth: AuthService,
              private storage: AngularFireStorage,
              private spinnerService: SpinnerService,
              private dialog: MatDialog,
              private toastService: ToastService) { }

  ngOnInit(): void {
    this.auth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.datosUsuarioActual$ = this.usuarioDataService.TraerUsuarioPorId(user.uid);
        this.datosUsuarioActual$.subscribe(datosUsuario => {
          this.formPerfil.controls['nombre'].setValue(datosUsuario?.nombre);
          this.formPerfil.controls['apellido'].setValue(datosUsuario?.apellido);
          this.formPerfil.controls['nroAfiliado'].setValue(datosUsuario?.nroAfiliado);
          this.formPerfil.controls['dni'].setValue(datosUsuario?.dni);

          this.datosUsuario = datosUsuario;
        
          if (datosUsuario.rol == Rol.Administrador) {
            this.formPerfil.removeControl('nroAfiliado');
          }
        
        }
        
        
        );
      }
      else {
        this.datosUsuarioActual$ = null;
      }
    });
  }

  guardarDatos(datos) {

    this.spinnerService.mostrarSpinner(2000);

    setTimeout(() => {
      this.datosUsuario.displayName = `${datos.nombre} ${datos.apellido}`;

      this.datosUsuario.nroAfiliado = datos.nroAfiliado;
      this.datosUsuario.nombre = datos.nombre;
      this.datosUsuario.apellido = datos.apellido;
      this.datosUsuario.dni = datos.dni;
  
      this.usuarioDataService.modificarUsuario(this.datosUsuario);

      this.toastService.MostrarToast('Actualizaste tu perfil con éxito', 2000);

    }, 2000);
  }


  subirFoto(event) {  

    const idFoto = Math.random().toString(36).substring(2);
    const archivo = event.target.files[0];
    const ruta = `fotosPerfil/${idFoto}`;
    const ref = this.storage.ref(ruta);

    const tarea = this.storage.upload(ruta, archivo);
    this.porcentajeSubidaImagen = tarea.percentageChanges();

    tarea.snapshotChanges().pipe(finalize(() => {

      ref.getDownloadURL().subscribe(datos => this.datosUsuario.imagen1 = datos);


    })).subscribe();

  }


  verHorarios(idUsuario: string): void {

    this.dialog.open(ListadoHorariosProfesionalesComponent,
      {
        width: '500px',
        data: { idUsuario: idUsuario },
        panelClass: 'horarios-profesional-dialog-container'
      });

  }

}
