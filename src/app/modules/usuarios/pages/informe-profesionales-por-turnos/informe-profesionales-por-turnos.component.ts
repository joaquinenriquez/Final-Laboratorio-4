import { ListadoProfesionalesPorTurnosComponent } from './../../components/listado-profesionales-por-turnos/listado-profesionales-por-turnos.component';
import { EspecialidadesDataService } from './../../../especialidades/services/especialidades-data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WidgetTartaComponent } from 'src/app/modules/graficos/components/widget-tarta/widget-tarta.component';
import { DatosGrafico } from 'src/app/modules/graficos/models/datos-grafico';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { TurnosDataService } from 'src/app/modules/turnos/services/turnos-data.service';
import { ListadoOperacionesPorEspecialidadComponent } from '../../components/listado-operaciones-por-especialidad/listado-operaciones-por-especialidad.component';
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

  datosUsuarioActual;
  datosInforme: DatosGrafico[] = [{name: 'sin datos', y:0}];

  tituloInforme: string = 'Turnos por día';
  ocultarDatosCero: boolean = true;

  @ViewChild('listado') listado: ListadoProfesionalesPorTurnosComponent;
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

  ngAfterViewInit() {
    this.traerDatos();
  }

  // traerDatos() {
    
  //   this.turnoDataService.traerTodasLosTurnos().subscribe(todosLosTurnos => {
    

  //     this.usuarioDataService.TraerTodosLosUsuariosPorRol(Rol.Profesional).subscribe(todosLosProfesionales => {
        
  //       todosLosProfesionales.forEach(unProfesional => {
  //         this.datosInforme.push({name: 'asasd', y: 100});
  //       });

  //     });


  //   });

    
  // }

  traerDatos() {

      this.turnoDataService.traerTodasLosTurnos().subscribe(todosLosTurnos => {

        this.usuarioDataService.TraerTodosLosUsuariosPorRol(Rol.Profesional).subscribe(todosLosProfesionales => {
          this.datosInforme = [];
          todosLosProfesionales.forEach(unProfesional => {
            this.datosInforme.push({name: unProfesional.displayName, y: this.calcularTurnosPorProfesional(todosLosTurnos, unProfesional.idUsuario)});
          });
      });
    });

      //this.listado.cargarDatos(this.datosInforme);
  }

  calcularTurnosPorProfesional(todosLosTurnos: Turno[], idProfesional: string): number 
  {
    return todosLosTurnos.filter(unTurno => unTurno.idProfesional == idProfesional && unTurno.estadoTurno != EstadoTurno.Cancelado && unTurno.estadoTurno && EstadoTurno.Suspendido).length;
  }


}