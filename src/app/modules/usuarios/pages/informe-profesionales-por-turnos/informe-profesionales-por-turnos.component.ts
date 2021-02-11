import { TipoGrafico } from './../../../graficos/widget-general/widget-general.component';
import { ListadoProfesionalesPorTurnosComponent } from './../../components/listado-profesionales-por-turnos/listado-profesionales-por-turnos.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WidgetTartaComponent } from 'src/app/modules/graficos/components/widget-tarta/widget-tarta.component';
import { DatosGrafico } from 'src/app/modules/graficos/models/datos-grafico';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { TurnosDataService } from 'src/app/modules/turnos/services/turnos-data.service';
import { UsuarioDataService } from '../../services/usuario-data.service';
import firebase from 'firebase/app';
import { EstadoTurno } from 'src/app/modules/turnos/models/estado-turno.enum';
import { Turno } from 'src/app/modules/turnos/models/turno';
import { Rol } from '../../models/rol.enum';


@Component({
  selector: 'app-informe-profesionales-por-turnos',
  templateUrl: './informe-profesionales-por-turnos.component.html',
  styleUrls: ['./informe-profesionales-por-turnos.component.scss']
})
export class InformeProfesionalesPorTurnosComponent implements OnInit {

  TipoGrafico = TipoGrafico;

  datosUsuarioActual;
  datosInforme: DatosGrafico[] = [{name: 'sin datos', y:0}];

  tituloInforme: string = 'Profesionales por turnos';
  ocultarDatosCero: boolean = true;

  @ViewChild('listado') listado: ListadoProfesionalesPorTurnosComponent;
  @ViewChild('widget') widget: WidgetTartaComponent;

  constructor(
    private usuarioDataService: UsuarioDataService,
    private authService: AuthService,
    private turnoDataService: TurnosDataService) { }

  ngOnInit(): void {



    this.authService.datosUsuario.subscribe(datosUsuario => {
      let usuario = datosUsuario as firebase.User;
      this.usuarioDataService.TraerUsuarioPorId(usuario?.uid).subscribe(datosUsuario => {
        this.datosUsuarioActual = datosUsuario;
      });
    })


  }

  ngAfterViewInit() {
    this.traerDatos();
  }

  traerDatos() {
      this.turnoDataService.traerTodasLosTurnos().subscribe(todosLosTurnos => {
        this.usuarioDataService.TraerTodosLosUsuariosPorRol(Rol.Profesional).subscribe(todosLosProfesionales => {
          this.datosInforme = [];
          todosLosProfesionales.forEach(unProfesional => {
            this.datosInforme.push({name: unProfesional.displayName, y: this.calcularTurnosPorProfesional(todosLosTurnos, unProfesional.idUsuario)});
          });

          if (this.ocultarDatosCero) {
            this.datosInforme = this.datosInforme.filter(unDato => unDato.y > 0);
          }

      });
    });
  }

  calcularTurnosPorProfesional(todosLosTurnos: Turno[], idProfesional: string): number 
  {
    return todosLosTurnos.filter(unTurno => unTurno.idProfesional == idProfesional && unTurno.estadoTurno != EstadoTurno.Cancelado && unTurno.estadoTurno && EstadoTurno.Suspendido).length;
  }


}