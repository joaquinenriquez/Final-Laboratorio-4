import { TipoGrafico } from './../../../graficos/widget-general/widget-general.component';
import { EncuestasDataService } from './../../../turnos/services/encuestas-data.service';
import { ListadoProfesionalesPorTurnosComponent } from './../../components/listado-profesionales-por-turnos/listado-profesionales-por-turnos.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WidgetTartaComponent } from 'src/app/modules/graficos/components/widget-tarta/widget-tarta.component';
import { DatosGrafico } from 'src/app/modules/graficos/models/datos-grafico';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { UsuarioDataService } from '../../services/usuario-data.service';
import firebase from 'firebase/app';
import { Encuesta, PreguntaEncuesta } from 'src/app/modules/turnos/models/encuesta';

@Component({
  selector: 'app-informe-detalle-respuestas-encuestas',
  templateUrl: './informe-detalle-respuestas-encuestas.component.html',
  styleUrls: ['./informe-detalle-respuestas-encuestas.component.scss']
})
export class InformeDetalleRespuestasEncuestasComponent implements OnInit {
  datosUsuarioActual;

  tituloPregunta0: string = '¿Cómo nos conocistes?';
  tituloPregunta1: string = '¿Volverías atenderte con nosotros?';
  tituloPregunta2: string = '¿Recomendarías el servicio a un amigo?';
  tituloPregunta3: string = '¿Queres dejarnos un comentario?';
  tituloPregunta4: string = 'Calificación general';
  
  datosInformePregunta0: DatosGrafico[] = [{name: 'sin datos', y:0}];
  datosInformePregunta1: DatosGrafico[] = [{name: 'sin datos', y:0}];
  datosInformePregunta2: DatosGrafico[] = [{name: 'sin datos', y:0}];
  datosInformePregunta3: DatosGrafico[] = [{name: 'sin datos', y:0}];
  datosInformePregunta4: DatosGrafico[] = [{name: 'sin datos', y:0}];

  cantidadRespuestas = 0;

  tituloInforme: string = 'Profesionales por turnos';
  ocultarDatosCero: boolean = true;

  TipoGrafico = TipoGrafico;

  @ViewChild('listado') listado: ListadoProfesionalesPorTurnosComponent;
  @ViewChild('widget') widget: WidgetTartaComponent;

  constructor(
    private usuarioDataService: UsuarioDataService,
    private authService: AuthService,
    private encuestasDataService: EncuestasDataService) { }

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



  traerDatos() {
    
    this.encuestasDataService.traerTodasLasEncuestas().subscribe(todasLasEncuestas => {
      this.cantidadRespuestas = todasLasEncuestas.length;
      this.datosInformePregunta0 = this.calcularDatosPorPregunta(todasLasEncuestas, 0);
      this.datosInformePregunta1 = this.calcularDatosPorPregunta(todasLasEncuestas, 1);
      this.datosInformePregunta2 = this.calcularDatosPorPregunta(todasLasEncuestas, 2);
      this.datosInformePregunta3 = this.calcularDatosPorPregunta(todasLasEncuestas, 3);
      this.datosInformePregunta4 = this.calcularDatosPorPregunta(todasLasEncuestas, 4);
    });


  }


  calcularDatosPorPregunta(todasLasEncuestas: Encuesta[], idPregunta: number): DatosGrafico[] {

    let preguntas: PreguntaEncuesta[] = [];
    let datos: DatosGrafico[] = [];

    todasLasEncuestas.forEach(unaEncuesta => {
      preguntas.push(unaEncuesta.preguntas[idPregunta]);
    });

    let respuestasPregunta: string[] = preguntas.map(unaPregunta => unaPregunta.respuesta);
    let respuestasUnicas: string[] = [... new Set(respuestasPregunta)];

    respuestasUnicas.forEach(unaRespuesta => {
      datos.push({name:unaRespuesta, y: respuestasPregunta.filter(OtraRespuesta => unaRespuesta == OtraRespuesta).length});
    });

    return datos;

  }


}


