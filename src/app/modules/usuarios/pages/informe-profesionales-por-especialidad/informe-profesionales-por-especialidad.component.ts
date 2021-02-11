import { Usuario } from 'src/app/modules/usuarios/models/usuario';
import { EspecialidadesDataService } from 'src/app/modules/especialidades/services/especialidades-data.service';
import { TipoGrafico } from './../../../graficos/widget-general/widget-general.component';
import { Component, OnInit } from '@angular/core';
import { DatosGrafico } from 'src/app/modules/graficos/models/datos-grafico';
import { UsuarioDataService } from '../../services/usuario-data.service';
import { Rol } from '../../models/rol.enum';
import { EstadoUsuario } from '../../models/estado-usuario.enum';

@Component({
  selector: 'app-informe-profesionales-por-especialidad',
  templateUrl: './informe-profesionales-por-especialidad.component.html',
  styleUrls: ['./informe-profesionales-por-especialidad.component.scss']
})
export class InformeProfesionalesPorEspecialidadComponent implements OnInit {

  TipoGrafico = TipoGrafico;

  datosUsuarioActual;
  datosInforme: DatosGrafico[] = [{ name: 'sin datos', y: 0 }];

  tituloInforme: string = 'Profesionales por turnos';
  ocultarDatosCero: boolean = true;

  constructor(
    private usuarioDataService: UsuarioDataService,
    private especialidadesDataService: EspecialidadesDataService) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.traerDatos();
  }

  traerDatos() {

    this.especialidadesDataService.traerTodasLasEspecialidades().subscribe(todasLasEspecialidades => {

      this.usuarioDataService.TraerTodosLosUsuariosPorRol(Rol.Profesional).subscribe(todosLosProfesionales => {

        this.datosInforme = [];

        todasLasEspecialidades.forEach(unaEspecialidad => {

          this.datosInforme.push({ name: unaEspecialidad.nombreEspecialidad, y: this.calcularProfesionalesPorEspecialidad(todosLosProfesionales, unaEspecialidad.nombreEspecialidad) })

        });

        if (this.ocultarDatosCero) {
          this.datosInforme = this.datosInforme.filter(unDato => unDato.y > 0);
        }

      });


    });

  }

  calcularProfesionalesPorEspecialidad(todosLosProfesionales: Usuario[], nombreEspecialidad: string): number {

    let cantidad = 0;

    todosLosProfesionales.forEach(unProfesional => {

      if (unProfesional.estado == EstadoUsuario.Habilitado) {
        if (unProfesional.especialidades.filter(unaEspecialidad => unaEspecialidad == nombreEspecialidad).length > 0) {
          cantidad++;
        }
      }
    });

    return cantidad;

  }


}