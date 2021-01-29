import { WidgetTartaComponent } from './../../../graficos/components/widget-tarta/widget-tarta.component';
import { DatosGrafico } from './../../../graficos/models/datos-grafico';
import { EspecialidadesDataService } from './../../../especialidades/services/especialidades-data.service';
import { TurnosDataService } from './../../../turnos/services/turnos-data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { UsuarioDataService } from '../../services/usuario-data.service';
import firebase from 'firebase/app';
import { EstadoTurno } from 'src/app/modules/turnos/models/estado-turno.enum';
import { ListadoOperacionesPorEspecialidadComponent } from '../../components/listado-operaciones-por-especialidad/listado-operaciones-por-especialidad.component';

@Component({
  selector: 'app-informe-operaciones-por-especialidad',
  templateUrl: './informe-operaciones-por-especialidad.component.html',
  styleUrls: ['./informe-operaciones-por-especialidad.component.scss']
})
export class InformeOperacionesPorEspecialidadComponent implements OnInit {

  datosUsuarioActual;
  datosInforme: DatosGrafico[] = [];
  tituloInforme: string = 'Turnos por especialidad';

  @ViewChild('listado') listado: ListadoOperacionesPorEspecialidadComponent;
  @ViewChild('widget') widget: WidgetTartaComponent;

  constructor(
    private usuarioDataService: UsuarioDataService,
    private authService: AuthService,
    private turnoDataService: TurnosDataService,
    private especialidadesDataService: EspecialidadesDataService) { }

  ngOnInit(): void {

    this.authService.datosUsuario.subscribe(datosUsuario => {
      let usuario = datosUsuario as firebase.User;
      this.usuarioDataService.TraerUsuarioPorId(usuario?.uid).subscribe(datosUsuario => {
        this.datosUsuarioActual = datosUsuario;
      });
    })

  }

  traerDatos() {
    
    this.turnoDataService.traerTodasLosTurnos().subscribe(todosLosTurnos => {
      
      let auxDatos: DatosGrafico[] = [];

      this.especialidadesDataService.traerTodasLasEspecialidades().subscribe(todasLasEspecialidades => {

        todasLasEspecialidades.forEach(unaEspecialidad => {
          let unDato: DatosGrafico;
          unDato = {
            name: unaEspecialidad.nombreEspecialidad,
            y: todosLosTurnos.filter(unTurno => unTurno.especialidadProfesional == unaEspecialidad.nombreEspecialidad && unTurno.estadoTurno != EstadoTurno.Cancelado && unTurno.estadoTurno != EstadoTurno.Suspendido).length
          }

          auxDatos.push(unDato);

        });

        this.datosInforme = auxDatos;

      })
    });
  }
}