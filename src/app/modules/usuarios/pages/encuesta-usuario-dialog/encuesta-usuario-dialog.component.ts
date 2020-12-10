import { PreguntaEncuesta } from './../../../turnos/models/encuesta';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StarRatingColor } from 'src/app/modules/shared/components/calificacion-estrellas/calificacion-estrellas.component';
import { Turno } from 'src/app/modules/turnos/models/turno';

@Component({
  selector: 'app-encuesta-usuario-dialog',
  templateUrl: './encuesta-usuario-dialog.component.html',
  styleUrls: ['./encuesta-usuario-dialog.component.scss']
})
export class EncuestaUsuarioDialogComponent implements OnInit {

  opcionConocimientoElegida: string;
  opcionesConocimiento: string[] = ['Por un amigo', 'Por un vecino', 'La internet', 'Otros'];
  
  puntajeGeneral: number = 0;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  preguntas: PreguntaEncuesta[] = 
  [
    {
      idPregunta: 0,
      pregunta: '¿Cómo nos conocistes?',
      respuesta: ''
    },

    {
      idPregunta: 1,
      pregunta: '¿Volverías atenderte con nosotros?',
      respuesta: ''
    },

    {
      idPregunta: 2,
      pregunta: '¿Recomendarías el servicio a un amigo?',
      respuesta: ''
    },

    {
      idPregunta: 3,
      pregunta: '¿Queres dejarnos un comentario?',
      respuesta: ''
    },

    {
      idPregunta: 4,
      pregunta: 'Calificación general',
      respuesta: 0
    }

  ]

  constructor(@Inject(MAT_DIALOG_DATA) public usuario: Turno,
  public dialogRef: MatDialogRef<EncuestaUsuarioDialogComponent>,) { }

  ngOnInit() {
    alert(this.usuario.idTurno)
  }
    


  enviarEncuesta(): void {
    this.preguntas[4].respuesta = this.puntajeGeneral;
    this.dialogRef.close(this.preguntas);
  }

  cancelarEnvioEncuesta(): void {
    this.dialogRef.close(undefined);
  }

  cambioPuntaje(rating){
    console.log(rating);
    this.puntajeGeneral = rating;
  }

}

