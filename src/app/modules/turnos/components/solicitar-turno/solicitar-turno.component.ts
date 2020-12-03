import { EstadoTurno } from './../../models/estado-turno.enum';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TurnosDataService } from './../../services/turnos-data.service';
import { Usuario } from './../../../usuarios/models/usuario';
import { UsuarioDataService } from './../../../usuarios/services/usuario-data.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import * as moment from 'moment';
import { Turno } from '../../models/turno';
import * as firebase from 'firebase';

enum TipoBusqueda { Profesional = 'Profesional', Especialidad = 'Especialidad' }


@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {

  textoBuscado = '';
  tipoBusqueda: TipoBusqueda = TipoBusqueda.Profesional;



  profesionalSeleccionado: Usuario;
  fechaSeleccionadaTurno = new Date();
  horarioSeleccionado;
  especialidadSeleccionada: string;



  dataSourceProfesionales = new TableVirtualScrollDataSource();
  columnasTablaProfesionales: string[] = ['displayName', 'especialidad', 'seleccionar'];

  dataSourceTablaTurnos = new TableVirtualScrollDataSource();
  columnasTablaTurnos: string[] = ['horario', 'seleccionar'];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  turnosDelProfesionalSeleccionado: Turno[] = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatStepper) stepper: MatStepper;

  @Input() usuario: Usuario;

  fechaMinima = new Date();
  fechaMaxima = new Date();

  filtroFechas = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }


  constructor(private usuarioDataService: UsuarioDataService,
    private turnoDataService: TurnosDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.usuarioDataService.TraerTodosLosUsuario().subscribe(datos => {
      this.dataSourceProfesionales = new TableVirtualScrollDataSource(datos);
    });
    this.fechaMaxima.setDate(this.fechaMinima.getDate() + 15);
  }

  ngAfterViewInit() {
    this.dataSourceProfesionales.paginator = this.paginator;
    this.dataSourceProfesionales.sort = this.sort;
  }

  seleccionarProfesional(unProfesionale) {

    this.profesionalSeleccionado = unProfesionale;
    this.especialidadSeleccionada = this.profesionalSeleccionado.especialidades[0];

    // Modificamos la función filtro para mostrar habilitado solo los dias que trabaja
    this.filtroFechas = (d: Date): boolean => {

      let auxReturn = false;
      const day = d.getDay();

      this.profesionalSeleccionado.HorarioTrabajo.forEach((value, index) => {
        if (day == (index + 1) && value.check == true) {
          auxReturn = true;
        }
      });

      return auxReturn;
    }

    this.setPrimerDia();
    this.cambioFechaTurno(this.fechaSeleccionadaTurno);
    this.stepper.next();
  }


  getPrimerDiaTrabajable(): number {

    let primerDia = -1;

    for (const [index, horario] of this.profesionalSeleccionado.HorarioTrabajo.entries()) {
      if (horario.check) {
        primerDia = index + 1;
        break;
      }
    }

    return primerDia;
  }


   traerTodosLosTurnosPorFecha(fechaSeleccionada: Date) {
    
    // Generamos todos los turnos en el horario disponible
    const nroDia = fechaSeleccionada.getDay();
    const horarioInicio = moment(this.profesionalSeleccionado.HorarioTrabajo[nroDia - 1].horarioInicio, 'HH:mm');
    const horarioFinalizacion = moment(this.profesionalSeleccionado.HorarioTrabajo[nroDia - 1].horarioFin, 'HH:mm');

    let horarios = [];
    let horariosOcupados: number [] = [];
    let aux = horarioInicio;
    horarios.push({ horario: horarioInicio.format('HH:mm') });

    while (aux <= horarioFinalizacion) {
      let nuevoHorario = { horario: aux.add(30, 'minutes').format('HH:mm') };
      horarios.push(nuevoHorario);
    }

    
    this.turnoDataService.traerTodasLosTurnos().subscribe(datos => {
      
      // Traemos los turnos el dia del profesional seleccionado
      let turnos = datos as Turno[];
      this.turnosDelProfesionalSeleccionado = turnos.filter(turno => turno.idProfesional == this.profesionalSeleccionado.idUsuario && turno.fechaTurno.toDate().toString() == fechaSeleccionada.toString());
      
      // Nos quedamos con una lista de los reservados
      this.turnosDelProfesionalSeleccionado.forEach (turno => {
        horarios.forEach (unHorario => {
          if (turno.horarioTurno == unHorario.horario) {
            let index = horarios.indexOf(unHorario);
            if (index > -1) {
              horariosOcupados.push(index);
            }
          }
        });
      });
      
      // Quitamos los reservados
      console.log('asdsada', horariosOcupados);
      console.log(horarios);
      horariosOcupados.forEach(unHorario => {
        horarios.splice(unHorario, 1);
      });

      this.dataSourceTablaTurnos = new TableVirtualScrollDataSource(horarios);

    });
    
   
  }

  seleccionarTurno(horarioSeleccionado) {
    this.horarioSeleccionado = horarioSeleccionado;
    this.stepper.next();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProfesionales.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceProfesionales.paginator) {
      this.dataSourceProfesionales.paginator.firstPage();
    }
  }

  setPrimerDia() {
    let auxFecha = new Date();
    let primerFechaDisponible: Date = null;

    while (primerFechaDisponible == null) {

      if (this.filtroFechas(auxFecha)) {
        primerFechaDisponible = auxFecha;
      } else {
        auxFecha = moment(auxFecha).add(1, 'days').toDate();
      }
    }

    this.fechaSeleccionadaTurno = primerFechaDisponible;
  }

  cambiarTipoBusqueda() {
    this.tipoBusqueda == TipoBusqueda.Especialidad ? this.tipoBusqueda = TipoBusqueda.Profesional : this.tipoBusqueda = TipoBusqueda.Especialidad;
  }

  getDiasTrabajoString(): string {
    let auxDias: string[] = [];

    this.profesionalSeleccionado?.HorarioTrabajo.forEach(dia => {
      if (dia.check) {
        auxDias.push(dia.nombreDia);
      }
    });

    return auxDias.join();
  }

  cambioFechaTurno(fechaSeleccionada: Date) {
    this.fechaSeleccionadaTurno = fechaSeleccionada;
    this.fechaSeleccionadaTurno.setHours(0, 0, 0, 0);
    this.traerTodosLosTurnosPorFecha(this.fechaSeleccionadaTurno);
    console.log(this.turnosDelProfesionalSeleccionado);
  }

  confirmarTurno() {

    let nuevoTurno: Turno = {

      idProfesional: this.profesionalSeleccionado.idUsuario,
      nombreProfesional: this.profesionalSeleccionado.displayName,
      especialidadProfesional: this.especialidadSeleccionada,

      fechaTurno: firebase.default.firestore.Timestamp.fromDate(this.fechaSeleccionadaTurno),
      horarioTurno: this.horarioSeleccionado.horario,
      duracionEstimada: 30,
      estadoTurno: EstadoTurno.Pendiente_Confirmar,

      idUsuario: this.usuario.idUsuario,
      nombreUsuario: this.usuario.displayName
    }

    this.turnoDataService.nuevaTurno(nuevoTurno).then(resultado => {
      Swal.fire({
        title: 'Ya reservamos tu turno!',
        text: 'Ahora tenés aguardar que el profesional lo confirme',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => this.router.navigate(['/login']));
    });
  }
}


