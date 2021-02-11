import { EspecialidadesDataService } from 'src/app/modules/especialidades/services/especialidades-data.service';
import { TipoGrafico } from './../../../graficos/widget-general/widget-general.component';
import { DatosGrafico } from './../../../graficos/models/datos-grafico';
import { TurnosDataService } from './../../../turnos/services/turnos-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { EstadoTurno } from 'src/app/modules/turnos/models/estado-turno.enum';
import { Turno } from 'src/app/modules/turnos/models/turno';

@Component({
  selector: 'app-informe-operaciones-por-especialidad',
  templateUrl: './informe-operaciones-por-especialidad.component.html',
  styleUrls: ['./informe-operaciones-por-especialidad.component.scss']
})
export class InformeOperacionesPorEspecialidadComponent implements OnInit {

  TipoGrafico = TipoGrafico;
  datosUsuarioActual;
  datosInforme: DatosGrafico[] = [];

  @Input() tituloInforme: string = 'Turnos por especialidad';
  ocultarDatosCero: boolean = true;


  constructor(private turnoDataService: TurnosDataService,
    private especialidadesDataService: EspecialidadesDataService) { }

  ngOnInit(): void {
    this.traerDatos();
  }

  traerDatos() {
    
    this.especialidadesDataService.traerTodasLasEspecialidades().subscribe(todasLasEspecialidades => {

      this.turnoDataService.traerTodasLosTurnos().subscribe(todosLosTurnos => {

        this.datosInforme = [];

        todasLasEspecialidades.forEach(unaEspecialidad => {

          let unDato: DatosGrafico;

          unDato = 
          {
            name: unaEspecialidad.nombreEspecialidad,
            y: this.calcularTurnosPorEspecialidad(todosLosTurnos, unaEspecialidad.nombreEspecialidad)
          }

          this.datosInforme.push(unDato);

        });

        if (this.ocultarDatosCero) {
          this.datosInforme = this.datosInforme.filter(unDato => unDato.y > 0);
        } 

      });

    });
  }


  calcularTurnosPorEspecialidad(todosLosTurnos: Turno[], nombreEspecialidad: string): number 
  {
    return todosLosTurnos.filter(unTurno => unTurno.especialidadProfesional == nombreEspecialidad && unTurno.estadoTurno != EstadoTurno.Cancelado && unTurno.estadoTurno && EstadoTurno.Suspendido).length;
  }


}