import { DatosSolicitudTurno } from './../../models/datos-solicitud-turno';

import { TipoBusqueda } from './../../models/tipo-busqueda.enum';
import { Usuario } from 'src/app/modules/usuarios/models/usuario';
import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Turno } from '../../models/turno';
import * as moment from 'moment';


@Component({
  selector: 'app-selector-horarios',
  templateUrl: './selector-horarios.component.html',
  styleUrls: ['./selector-horarios.component.scss']
})
export class SelectorHorariosComponent implements OnInit {

  @Input() tipoBusqueda: TipoBusqueda;
  @Input() datosDiaSeleccionado: DatosSolicitudTurno[];

  datosTurnoConfirmado: DatosSolicitudTurno;

  turnosDisponibles: DatosSolicitudTurno[] = [];


  @Output() horarioSeleccionado: EventEmitter<DatosSolicitudTurno> = new EventEmitter<DatosSolicitudTurno>();

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {

    // Reiniciamos el array de turnos disponibles cuando cambian el dia
    this.turnosDisponibles = [];
    
    // Cuando cambia algun valor de los que recibimos por input se produce este evento
    if (changes.datosDiaSeleccionado?.currentValue != undefined && this.tipoBusqueda == TipoBusqueda.Especialidades) {
      this.mostrarHorariosDisponiblesEspecialidades(this.datosDiaSeleccionado);
    }    

    if (changes.datosDiaSeleccionado?.currentValue != undefined && this.tipoBusqueda == TipoBusqueda.Profesional) {
      this.mostrarHorariosDisponiblesProfesional(this.datosDiaSeleccionado[0]);
    }
  }

  mostrarHorariosDisponiblesEspecialidades(datosSolicitudTurnoPorProfesional: DatosSolicitudTurno[]) {
    datosSolicitudTurnoPorProfesional.forEach(datosTurno => this.mostrarHorariosDisponiblesProfesional(datosTurno));
  }

  // Generamos todos los turnos en el horario disponible
  mostrarHorariosDisponiblesProfesional(datosSolicitudTurno: DatosSolicitudTurno) {

    // Vaciamos el array
    datosSolicitudTurno.horariosDisponibles = []

    // Nos quedamos con los turnos del dia seleccionado
    let turnosDelDiaSeleccionado = datosSolicitudTurno.turnosSolicitados; //.filter(unTurnoSolicitado => unTurnoSolicitado.fechaTurno.toDate().toString() == datosSolicitudTurno.diaSeleccionado.toString());

    // Ordenamos los turnos del dia por horarios
    turnosDelDiaSeleccionado.sort(CompararHorariosTurnos);

    // Si ese dia no hay turnos generamos todos los turnos como libres y nos vamos
    if (turnosDelDiaSeleccionado.length == 0) {
      datosSolicitudTurno.horariosDisponibles = this.generarTodosLosHorariosDisponibles(datosSolicitudTurno);
      return datosSolicitudTurno;
    }

    const horarioFinalizacion = this.getHorarioFinDiaSeleccionado(datosSolicitudTurno);

    let horaFinTurnoAnterior = this.getHorarioInicioDiaSeleccionado(datosSolicitudTurno);
    let auxHorarioDisponible = horaFinTurnoAnterior.clone();

    // Agregamos los turnos disponibles antes e intermedios
    turnosDelDiaSeleccionado.forEach((turnoOcupado, indice) => {

      console.log(indice, turnoOcupado);

      const horaInicioTurnoActual = moment(turnoOcupado.horarioTurno, 'HH:mm');

      while (auxHorarioDisponible < horaInicioTurnoActual) {
        console.log(indice, auxHorarioDisponible.format('HH:mm'));
        datosSolicitudTurno.horariosDisponibles.push(auxHorarioDisponible.format('HH:mm'));
        auxHorarioDisponible.add(30, 'minutes');
      }

      auxHorarioDisponible = moment(turnoOcupado.horarioTurno, 'HH:mm').add(turnoOcupado.duracionEstimada, 'minutes');

    });

    // Agregamos los turnos disponibles en la cola
    let ultimoTurnoDelDia = turnosDelDiaSeleccionado[turnosDelDiaSeleccionado.length - 1];
    auxHorarioDisponible = moment(ultimoTurnoDelDia.horarioTurno, 'HH:mm').add(ultimoTurnoDelDia.duracionEstimada, 'minutes');

    while (auxHorarioDisponible < horarioFinalizacion) {
      console.log(auxHorarioDisponible.format('HH:mm'));
      datosSolicitudTurno.horariosDisponibles.push(auxHorarioDisponible.format('HH:mm'));
      auxHorarioDisponible.add(30, 'minutes');
    }

  }


  mostrarTurnosDisponibles(datosSolicitudTurno: DatosSolicitudTurno): DatosSolicitudTurno {


    // Si ese dia no hay turnos generamos todos los turnos como libres y nos vamos
    if (datosSolicitudTurno.turnosSolicitados.length == 0) {
      alert('entro aca');
      datosSolicitudTurno.horariosDisponibles = this.generarTodosLosHorariosDisponibles(datosSolicitudTurno);
      return datosSolicitudTurno;
    }

    // Ordenamos los turnos del dia por horarios
    datosSolicitudTurno.turnosSolicitados.sort(CompararHorariosTurnos);


    const horarioFinalizacion = this.getHorarioFinDiaSeleccionado(datosSolicitudTurno);
    let horaFinTurnoAnterior = this.getHorarioInicioDiaSeleccionado(datosSolicitudTurno);
    let auxHorarioDisponible = horaFinTurnoAnterior.clone();

    let horariosDisponibles: string[] = [];


    /* #region Agregamos los turnos disponibles antes e intermedios  */

    datosSolicitudTurno.turnosSolicitados.forEach((turnoOcupado, indice) => {

      console.log(indice, turnoOcupado);

      const horaInicioTurnoActual = moment(turnoOcupado.horarioTurno, 'HH:mm');

      while (auxHorarioDisponible < horaInicioTurnoActual) {
        console.log(indice, auxHorarioDisponible.format('HH:mm'));
        horariosDisponibles.push(auxHorarioDisponible.format('HH:mm'));
        auxHorarioDisponible.add(30, 'minutes');
      }

      auxHorarioDisponible = moment(turnoOcupado.horarioTurno, 'HH:mm').add(turnoOcupado.duracionEstimada, 'minutes');
    });

    /* #endregion */


    /* #region Agregamos los turnos disponibles en la cola   */

    let ultimoTurnoDelDia = datosSolicitudTurno.turnosSolicitados[datosSolicitudTurno.turnosSolicitados.length - 1];
    auxHorarioDisponible = moment(ultimoTurnoDelDia.horarioTurno, 'HH:mm').add(ultimoTurnoDelDia.duracionEstimada, 'minutes');

    while (auxHorarioDisponible < horarioFinalizacion) {
      console.log(auxHorarioDisponible.format('HH:mm'));
      horariosDisponibles.push(auxHorarioDisponible.format('HH:mm'));
      auxHorarioDisponible.add(30, 'minutes');
    }

    /* #endregion */

    datosSolicitudTurno.horariosDisponibles = horariosDisponibles;

    console.log('asasdasd', datosSolicitudTurno);

    return datosSolicitudTurno;
  }

  getHorarioInicioDiaSeleccionado(datosSolicitudTurno: DatosSolicitudTurno): moment.Moment {

    let horarioInicio;

    //Nos quedamos con el dia de la semana seleccionado. Restamos uno para sincronizarlo con las posiciones del array que tenemos guardado (no tiene domingo)
    const nroDia = datosSolicitudTurno.diaSeleccionado.getDay() - 1;

    horarioInicio = moment(datosSolicitudTurno.profesionalSeleccionado.HorarioTrabajo[nroDia].horarioInicio, 'HH:mm');

    return horarioInicio;

  }

  getHorarioFinDiaSeleccionado(datosSolicitudTurno: DatosSolicitudTurno): moment.Moment {
    //Nos quedamos con el dia de la semana seleccionado. Restamos uno para sincronizarlo con las posiciones del array que tenemos guardado (no tiene domingo)
    let horarioFin;

    const nroDia = datosSolicitudTurno.diaSeleccionado.getDay() - 1;

    horarioFin = moment(datosSolicitudTurno.profesionalSeleccionado.HorarioTrabajo[nroDia].horarioFin, 'HH:mm');

    return horarioFin;

  }


  generarTodosLosHorariosDisponibles(datosSolicitudTurno: DatosSolicitudTurno): string[] {

    const horarioInicio = this.getHorarioInicioDiaSeleccionado(datosSolicitudTurno);
    const horarioFinalizacion = this.getHorarioFinDiaSeleccionado(datosSolicitudTurno);

    // Array con todos los horarios posibles
    let horariosPosibles: string[] = [];

    let auxHorarioDisponible = horarioInicio.clone();

    while (auxHorarioDisponible < horarioFinalizacion) {
      console.log(auxHorarioDisponible.format('HH:mm'));
      horariosPosibles.push(auxHorarioDisponible.format('HH:mm'));
      auxHorarioDisponible.add(30, 'minutes');
    }

    return horariosPosibles;
  }

  confirmarTurno(datosTurno: DatosSolicitudTurno, horarioSeleccionado:string) {
    this.datosTurnoConfirmado = datosTurno;
    this.datosTurnoConfirmado.horarioSeleccionado = horarioSeleccionado;
    console.log('asdsad', datosTurno);
    this.horarioSeleccionado.emit(this.datosTurnoConfirmado);
  }

}



function CompararHorariosTurnos(a: Turno, b: Turno) {
  if (a.horarioTurno < b.horarioTurno) {
    return -1;
  }
  if (a.horarioTurno > b.horarioTurno) {
    return 1;
  }
  return 0;
}
