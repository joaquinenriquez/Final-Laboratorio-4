import { Usuario } from 'src/app/modules/usuarios/models/usuario';
import { EspecialidadesDataService } from 'src/app/modules/especialidades/services/especialidades-data.service';
import { TipoGrafico } from './../../../graficos/widget-general/widget-general.component';
import { Component, OnInit } from '@angular/core';
import { DatosGrafico } from 'src/app/modules/graficos/models/datos-grafico';
import { UsuarioDataService } from '../../services/usuario-data.service';
import { Rol } from '../../models/rol.enum';
import { EstadoUsuario } from '../../models/estado-usuario.enum';


@Component({
  selector: 'app-informe-usuarios',
  templateUrl: './informe-usuarios.component.html',
  styleUrls: ['./informe-usuarios.component.scss']
})
export class InformeUsuariosComponent implements OnInit {

  TipoGrafico = TipoGrafico;

  datosInformeUsuariosPorRol: DatosGrafico[] = [{name: 'sin datos', y:0}];
  datosInformeUsuariosPorEstado: DatosGrafico[] = [{name: 'sin datos', y:0}];

  todosLosUsuarios

  datosUsuarioActual;
  datosInforme: DatosGrafico[] = [{ name: 'sin datos', y: 0 }];

  tituloInformePorRol: string = 'Usuarios por rol';
  tituloInformePorEstado: string = 'Usuarios por estado';
  tituloInformeTodosLosUsuarios: string = 'Todos los usuarios';
  ocultarDatosCero: boolean = true;

  constructor(
    private usuarioDataService: UsuarioDataService) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.traerDatos();
  }

  traerDatos() {

    this.usuarioDataService.TraerTodosLosUsuario().subscribe(todosLosUsuarios => {

      this.todosLosUsuarios  = todosLosUsuarios;

      this.datosInformeUsuariosPorRol = [];
      this.datosInformeUsuariosPorEstado = [];

      this.datosInformeUsuariosPorRol.push({name: Rol.Paciente, y: this.calcularUsuariosPorRol(todosLosUsuarios, Rol.Paciente)})
      this.datosInformeUsuariosPorRol.push({name: Rol.Profesional, y: this.calcularUsuariosPorRol(todosLosUsuarios, Rol.Profesional)})
      this.datosInformeUsuariosPorRol.push({name: Rol.Administrador, y: this.calcularUsuariosPorRol(todosLosUsuarios, Rol.Administrador)})

      this.datosInformeUsuariosPorEstado.push({name: EstadoUsuario.Habilitado, y: this.calcularUsuariosPorEstado(todosLosUsuarios, EstadoUsuario.Habilitado)})
      this.datosInformeUsuariosPorEstado.push({name: EstadoUsuario.PendienteAprobacion, y: this.calcularUsuariosPorEstado(todosLosUsuarios, EstadoUsuario.PendienteAprobacion)})
      this.datosInformeUsuariosPorEstado.push({name: EstadoUsuario.Deshabilitado, y: this.calcularUsuariosPorEstado(todosLosUsuarios, EstadoUsuario.Deshabilitado)})

  });
}

calcularUsuariosPorRol(todosLosUsuarios: Usuario[], rol: Rol): number 
{
  return todosLosUsuarios.filter(unUsuario => unUsuario.rol == rol && unUsuario.estado != EstadoUsuario.Deshabilitado).length;
}

calcularUsuariosPorEstado(todosLosUsuarios: Usuario[], estado: EstadoUsuario): number 
{
  return todosLosUsuarios.filter(unUsuario => unUsuario.estado == estado).length;
}



}