import { TipoBusqueda } from './../../models/tipo-busqueda.enum';
import { Especialidad } from './../../../usuarios/models/especialidad';
import { Profesional } from './../../../usuarios/models/profesional';
import { UsuarioDataService } from './../../../usuarios/services/usuario-data.service';
import { Turno } from './../../models/turno';
import { TurnosDataService } from './../../services/turnos-data.service';
import { Usuario } from './../../../usuarios/models/usuario';
import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { first } from 'rxjs/operators';
import { Rol } from 'src/app/modules/usuarios/models/rol.enum';
import { EstadoTurno } from '../../models/estado-turno.enum';
import { DatosSolicitudTurno } from '../../models/datos-solicitud-turno';


@Component({
  selector: 'app-selector-dias',
  templateUrl: './selector-dias.component.html',
  styleUrls: ['./selector-dias.component.scss']
})
export class SelectorDiasComponent implements OnInit {

  constructor(private turnosDataService: TurnosDataService,
    private usuariosDataService: UsuarioDataService) { }

  @Input() tipoBusqueda: TipoBusqueda;

  @Input() profesionalSeleccionado: Profesional
  @Input() especialidadSeleccionada: Especialidad;

  @Output() CambioDia: EventEmitter<DatosSolicitudTurno[]> = new EventEmitter<DatosSolicitudTurno[]>();

  turnosProfesionalSeleccionado: Turno[];
  turnosEspecialidadSeleccionada: Turno[];
  proximasFechasTrabajables: Date[] = [];

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    // Cuando cambia algun valor de los que recibimos por input se produce este evento
    if (changes.profesionalSeleccionado?.currentValue != undefined && this.tipoBusqueda == TipoBusqueda.Profesional) {
      this.generarDiasPorProfesional();
    }

    if (changes.especialidadSeleccionada?.currentValue != undefined && this.tipoBusqueda == TipoBusqueda.Especialidades) {
      this.generarDiasPorEspecialidad();
    }

  }

  generarDiasPorProfesional() {

    let hoy = new Date();
    let fechaMaximaTurnos = new Date();
    let auxFecha = hoy;
    let indice = 1;

    // Reiniciamos el array de dias trabajables
    this.proximasFechasTrabajables = [];
    auxFecha.setHours(0, 0, 0, 0);

    fechaMaximaTurnos.setDate(hoy.getDate() + 15);

    while (auxFecha <= fechaMaximaTurnos) {

      this.profesionalSeleccionado.HorarioTrabajo.forEach((value, index) => {
        if (index + 1 == auxFecha.getDay() && value.check == true) {
          this.proximasFechasTrabajables.push(new Date(auxFecha.valueOf()));
        }
      });

      indice++;
      auxFecha.setDate(auxFecha.getDate() + 1);

    }
  }

  generarDiasPorEspecialidad() {

    let hoy = new Date();
    let fechaMaximaTurnos = new Date();
    let auxFecha = hoy;
    let indice = 1;

    let profesionalesPorEspecialidad: Usuario[] = [];
    // Reiniciamos el array de dias trabajables
    this.proximasFechasTrabajables = [];
    auxFecha.setHours(0, 0, 0, 0);

    fechaMaximaTurnos.setDate(hoy.getDate() + 15);

    this.usuariosDataService.TraerTodosLosUsuariosPorRol(Rol.Profesional).pipe(first()).subscribe(todosLosProfesionales => {


      todosLosProfesionales.forEach(unProfesional => {
        let aux = unProfesional.especialidades.filter(unaEspecialidad => unaEspecialidad == this.especialidadSeleccionada.nombreEspecialidad);
        if (aux.length > 0) {
          profesionalesPorEspecialidad.push(unProfesional);
        }
      });

      
      while (auxFecha <= fechaMaximaTurnos) {

        profesionalesPorEspecialidad.forEach(unProfesional => {
          unProfesional.HorarioTrabajo.forEach((value, index) => {
            if (index + 1 == auxFecha.getDay() && value.check == true) {
              let nuevoDia = new Date(auxFecha.valueOf());
              // Verificamos que el dia no este por otro profesional
              if (!this.proximasFechasTrabajables.find(unDiaTrabajable => unDiaTrabajable.getTime() == nuevoDia.getTime())) {
                this.proximasFechasTrabajables.push(nuevoDia);
              }
            }
          });
        });

        indice++;
        auxFecha.setDate(auxFecha.getDate() + 1);
      }
    });

  }


  traerTurnosPorProfesional(profesionalSeleccionado: Profesional): Promise<DatosSolicitudTurno> {

    let auxDatos = <DatosSolicitudTurno>{};

    const promesa = new Promise((resolve, reject) => {

      this.turnosDataService.traerTurnosPorProfesional(profesionalSeleccionado.idUsuario).subscribe(todosLosTurnos => {

        let auxTurnosDisponibles = todosLosTurnos.filter(unTurnoDisponible => unTurnoDisponible.estadoTurno != EstadoTurno.Suspendido && unTurnoDisponible.estadoTurno != EstadoTurno.Cancelado && unTurnoDisponible.estadoTurno != EstadoTurno.Finalizado)
        auxDatos.profesionalSeleccionado = profesionalSeleccionado;
        auxDatos.turnosSolicitados = [];
        auxDatos.turnosSolicitados = auxTurnosDisponibles;

        resolve(auxDatos);
      });
    });

    return promesa;
  }

  traerTurnosPorEspecialidad(nombreEspecialidad: string): Promise<DatosSolicitudTurno[]> {
    let auxDatosSolicitudTurno: DatosSolicitudTurno[] = [];

    return new Promise<DatosSolicitudTurno[]>((result, reject) => {

      this.usuariosDataService.TraerTodosLosUsuariosPorRol(Rol.Profesional).pipe(first()).subscribe(profesionales => {

        let profesionalesEspecialidadSeleccionada = profesionales.filter(unProfesional => unProfesional.especialidades.filter(unaEspecialidad => unaEspecialidad == nombreEspecialidad));

        profesionalesEspecialidadSeleccionada.forEach(unProfesional => {

          let auxDatosTurnos = <DatosSolicitudTurno>{};
          auxDatosTurnos.profesionalSeleccionado = unProfesional;
          auxDatosTurnos.turnosSolicitados = [];

          this.turnosDataService.traerTurnosPorProfesional(unProfesional.idUsuario).pipe(first()).subscribe(turnos => {

            auxDatosTurnos.turnosSolicitados = turnos.filter(unTurno => unTurno.estadoTurno != EstadoTurno.Cancelado && unTurno.estadoTurno != EstadoTurno.Finalizado && unTurno.estadoTurno != EstadoTurno.Suspendido);

            auxDatosSolicitudTurno.push(auxDatosTurnos);

            if (auxDatosSolicitudTurno.length == profesionales.length) result(auxDatosSolicitudTurno);

          });

        });

      });


    });
  }




  seleccionarDia(dia: Date) {

    let datosDiaSeleccionado: DatosSolicitudTurno[] = [];
    dia.setHours(0, 0, 0, 0);


    switch (this.tipoBusqueda) {
      case TipoBusqueda.Profesional:

        this.traerTurnosPorProfesional(this.profesionalSeleccionado).then(datosTurno => {
          let auxDatos = <DatosSolicitudTurno>{};
          auxDatos = datosTurno;
          auxDatos.diaSeleccionado = dia;
          let turnosDiaSeleccionado = datosTurno.turnosSolicitados.filter(unTurnoSolicitado => unTurnoSolicitado.fechaTurno.toDate().getTime() == dia.getTime());
          auxDatos.turnosSolicitados = turnosDiaSeleccionado;
          datosDiaSeleccionado.push(auxDatos);
          this.CambioDia.emit(datosDiaSeleccionado);
        });

        break;

      case TipoBusqueda.Especialidades:

        this.traerTurnosPorEspecialidad(this.especialidadSeleccionada.nombreEspecialidad).then(datosTurnos => {
          datosTurnos.forEach(datosDeUnProfesional => {

            let auxDatos: DatosSolicitudTurno =
            {
              diaSeleccionado: dia,
              profesionalSeleccionado: datosDeUnProfesional.profesionalSeleccionado,
              turnosSolicitados: datosDeUnProfesional.turnosSolicitados.filter(unTurnoSolicitado => unTurnoSolicitado.fechaTurno.toDate().getTime() == dia.getTime()),
              horariosDisponibles: []
            }

            datosDiaSeleccionado.push(auxDatos);

            if (datosDiaSeleccionado.length == datosTurnos.length) this.CambioDia.emit(datosDiaSeleccionado);
          });
        });

        break;


    }
  }
}