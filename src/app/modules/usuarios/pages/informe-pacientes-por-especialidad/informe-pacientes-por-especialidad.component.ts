import { EspecialidadesDataService } from 'src/app/modules/especialidades/services/especialidades-data.service';
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


@Component({
  selector: 'app-informe-pacientes-por-especialidad',
  templateUrl: './informe-pacientes-por-especialidad.component.html',
  styleUrls: ['./informe-pacientes-por-especialidad.component.scss']
})
export class InformePacientesPorEspecialidadComponent implements OnInit {

  datosUsuarioActual;
  datosInforme: DatosGrafico[] = [{name: 'sin datos', y:0}];

  tituloInforme: string = 'Pacientes por especialidad';
  ocultarDatosCero: boolean = true;

  @ViewChild('listado') listado: ListadoProfesionalesPorTurnosComponent;
  @ViewChild('widget') widget: WidgetTartaComponent;

  constructor(private turnoDataService: TurnosDataService,
    private especialidadDataService: EspecialidadesDataService) { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.traerDatos();
  }



  traerDatos() {
    

    this.turnoDataService.traerTodasLosTurnos().subscribe(todosLosTurnos => {

      this.especialidadDataService.traerTodasLasEspecialidades().subscribe(todasLasEspecialidades => {
        
        this.datosInforme = [];

        todasLasEspecialidades.forEach(unaEspecialidad => {
          this.datosInforme.push({name: unaEspecialidad.nombreEspecialidad, y: this.calcularPacientesPorEspecialidad(todosLosTurnos, unaEspecialidad.nombreEspecialidad)})
        });

        if (this.ocultarDatosCero) {
          this.datosInforme = this.datosInforme.filter(unDato => unDato.y > 0);
        }
      });
    });
  }


calcularPacientesPorEspecialidad(todosLosTurnos: Turno[], nombreEspecialidad: string): number {
  let turnosEspecialidadSeleccionada = todosLosTurnos.filter(unTurno => unTurno.especialidadProfesional == nombreEspecialidad && unTurno.estadoTurno != EstadoTurno.Cancelado && unTurno.estadoTurno && EstadoTurno.Suspendido);
  let pacientesEspecialidadSeleccionada = turnosEspecialidadSeleccionada.map(unTurno => unTurno.idUsuario);
  let pacientesUnicos = [...new Set(pacientesEspecialidadSeleccionada)];
  return pacientesUnicos.length;
}


}