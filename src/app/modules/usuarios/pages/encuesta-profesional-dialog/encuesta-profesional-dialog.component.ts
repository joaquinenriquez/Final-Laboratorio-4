import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StarRatingColor } from 'src/app/modules/shared/components/calificacion-estrellas/calificacion-estrellas.component';
import { Turno } from 'src/app/modules/turnos/models/turno';
import { EncuestaUsuarioDialogComponent } from '../encuesta-usuario-dialog/encuesta-usuario-dialog.component';

@Component({
  selector: 'app-encuesta-profesional-dialog',
  templateUrl: './encuesta-profesional-dialog.component.html',
  styleUrls: ['./encuesta-profesional-dialog.component.scss']
})
export class EncuestaProfesionalDialogComponent implements OnInit {

  resena: string = '';

  puntajeUsuario: number = 0;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  constructor(@Inject(MAT_DIALOG_DATA) public usuario: Turno,
  public dialogRef: MatDialogRef<EncuestaUsuarioDialogComponent>,) { }

  ngOnInit() {}
    


  enviarResena(): void {
    
    let resultadoDialogo = {
      resena: this.resena,
      calificacionUsuario:  this.puntajeUsuario
    }


    this.dialogRef.close(resultadoDialogo);
  }

  cancelarEnvioResena(): void {
    this.dialogRef.close(undefined);
  }

  cambioPuntaje(rating){
    console.log(rating);
    this.puntajeUsuario = rating;
  }

}

