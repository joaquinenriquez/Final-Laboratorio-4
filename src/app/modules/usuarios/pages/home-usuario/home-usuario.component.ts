import { SelectorHorariosComponent } from './../../../turnos/components/selector-horarios/selector-horarios.component';
import firebase from 'firebase/app';
import { AuthService } from './../../../shared/services/auth.service';
import { UsuarioDataService } from './../../services/usuario-data.service';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.scss']
})
export class HomeUsuarioComponent implements OnInit {

  tipoDeBusqueda = 'profesional';
  // opcionSeleccionada = this.usuarioDataService.TraerUsuarioPorId('daJ2D4JqhFeJ6L2oCum4bRiGB2m2');
  idProfesionalSeleccionado = 'daJ2D4JqhFeJ6L2oCum4bRiGB2m2';
  datosDiaSeleccionado;
  @ViewChild('selectorHorarios') selectorHorarios: SelectorHorariosComponent;


  datosUsuarioActual;

  constructor(private usuarioDataService: UsuarioDataService, private authService: AuthService) {
    this.authService.datosUsuario.subscribe(datosUsuario => {
      let usuario = datosUsuario as firebase.User;
      this.usuarioDataService.TraerUsuarioPorId(usuario?.uid).subscribe(datosUsuario => {
        this.datosUsuarioActual = datosUsuario;
      });
    })
  }

  ngOnInit(): void {
  }

  mostrarHorarios(e) {
    this.datosDiaSeleccionado = e;
    // this.selectorHorarios.traerTurnosDisponibles();
  }

}