import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modules/usuarios/models/usuario';

@Component({
  selector: 'app-datos-profesional-bar',
  templateUrl: './datos-profesional-bar.component.html',
  styleUrls: ['./datos-profesional-bar.component.scss']
})
export class DatosProfesionalBarComponent implements OnInit {

  @Input() usuario: Usuario;

  constructor() { }

  ngOnInit(): void {
    console.log('usuario', this.usuario);
  }

}
