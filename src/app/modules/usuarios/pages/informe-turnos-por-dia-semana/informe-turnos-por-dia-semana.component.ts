import { TipoGrafico } from './../../../graficos/widget-general/widget-general.component';
import { Component, OnInit } from '@angular/core';
import { DatosGrafico } from 'src/app/modules/graficos/models/datos-grafico';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { TurnosDataService } from 'src/app/modules/turnos/services/turnos-data.service';
import { UsuarioDataService } from '../../services/usuario-data.service';
import firebase from 'firebase/app';
import { EstadoTurno } from 'src/app/modules/turnos/models/estado-turno.enum';
import { Turno } from 'src/app/modules/turnos/models/turno';

@Component({
  selector: 'app-informe-turnos-por-dia-semana',
  templateUrl: './informe-turnos-por-dia-semana.component.html',
  styleUrls: ['./informe-turnos-por-dia-semana.component.scss']
})
export class InformeTurnosPorDiaSemanaComponent implements OnInit {

  TipoGrafico = TipoGrafico;

  datosUsuarioActual;
  datosInforme: DatosGrafico[] = 
  [
    {name: 'Lunes', y: 10},
    {name: 'Martes', y: 5},
    {name: 'Miércoles', y: 0},
    {name: 'Jueves', y: 0},
    {name: 'Viernes', y: 0},
    {name: 'Sábado', y: 0}
  ];

  tituloInforme: string = 'Turnos por día';
  ocultarDatosCero: boolean = true;


  constructor(
    private usuarioDataService: UsuarioDataService,
    private authService: AuthService,
    private turnoDataService: TurnosDataService) { }

  ngOnInit(): void {

    this.traerDatos();

    this.authService.datosUsuario.subscribe(datosUsuario => {
      let usuario = datosUsuario as firebase.User;
      this.usuarioDataService.TraerUsuarioPorId(usuario?.uid).subscribe(datosUsuario => {
        this.datosUsuarioActual = datosUsuario;
      });
    })


  }

  traerDatos() {
    
    this.turnoDataService.traerTodasLosTurnos().subscribe(todosLosTurnos => {
      
      
      this.datosInforme = 
      [
        {
          name: 'Lunes',
          y: this.calcularTurnosPorDia(todosLosTurnos, 1)
        },

        {
          name: 'Martes',
          y: this.calcularTurnosPorDia(todosLosTurnos, 2)
        },

        {
          name: 'Miércoles',
          y: this.calcularTurnosPorDia(todosLosTurnos, 3)
        },

        {
          name: 'Jueves',
          y: this.calcularTurnosPorDia(todosLosTurnos, 4)
        },

        {
          name: 'Viernes',
          y: this.calcularTurnosPorDia(todosLosTurnos, 5)
        },

        {
          name: 'Sábado',
          y: this.calcularTurnosPorDia(todosLosTurnos, 6)
        }
      ]
    
      if (this.ocultarDatosCero) {
        this.datosInforme = this.datosInforme.filter(unDato => unDato.y > 0);
      }

    });
  }

  calcularTurnosPorDia(todosLosTurnos: Turno[], nroDiaSemana: number): number 
  {
    return todosLosTurnos.filter(unTurno => unTurno.fechaTurno.toDate().getDay() == nroDiaSemana && unTurno.estadoTurno != EstadoTurno.Cancelado && unTurno.estadoTurno && EstadoTurno.Suspendido).length;
  }

  

}