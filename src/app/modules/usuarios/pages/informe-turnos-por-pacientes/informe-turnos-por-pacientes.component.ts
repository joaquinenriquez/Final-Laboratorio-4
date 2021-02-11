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
  selector: 'app-informe-turnos-por-pacientes',
  templateUrl: './informe-turnos-por-pacientes.component.html',
  styleUrls: ['./informe-turnos-por-pacientes.component.scss']
})
export class InformeTurnosPorPacientesComponent implements OnInit {

  TipoGrafico = TipoGrafico;

  datosUsuarioActual;
  datosInforme: DatosGrafico[] = [{name: 'sin datos', y:0}];

  tituloInforme: string = 'Turnos por paciente';
  ocultarDatosCero: boolean = true;


  constructor(
    private usuarioDataService: UsuarioDataService,
    private turnoDataService: TurnosDataService) { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.traerDatos();
  }

  traerDatos() {

      this.turnoDataService.traerTodasLosTurnos().subscribe(todosLosTurnos => {
        this.usuarioDataService.TraerTodosLosUsuariosPorRol(Rol.Paciente).subscribe(todosLosUsuarios => {
          this.datosInforme = [];
          todosLosUsuarios.forEach(unUsuario => {
            this.datosInforme.push({name: unUsuario.displayName, y: this.calcularTurnosPorPaciente(todosLosTurnos, unUsuario.idUsuario)});
          });

          if (this.ocultarDatosCero) {
            this.datosInforme = this.datosInforme.filter(unDato => unDato.y > 0);
          }

      });
    });
  }

  calcularTurnosPorPaciente(todosLosTurnos: Turno[], idUsuario: string): number 
  {
    return todosLosTurnos.filter(unTurno => unTurno.idUsuario == idUsuario && unTurno.estadoTurno != EstadoTurno.Cancelado && unTurno.estadoTurno && EstadoTurno.Suspendido).length;
  }


}