import { Component, OnInit } from '@angular/core';
import { StarRatingColor } from 'src/app/modules/shared/components/calificacion-estrellas/calificacion-estrellas.component';

@Component({
  selector: 'app-encuesta-usuario',
  templateUrl: './encuesta-usuario.component.html',
  styleUrls: ['./encuesta-usuario.component.scss']
})
export class EncuestaUsuarioComponent implements OnInit {

  rating:number = 3;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  constructor() { }

  ngOnInit() {
  }
    onRatingChanged(rating){
    console.log(rating);
    this.rating = rating;
  }

}