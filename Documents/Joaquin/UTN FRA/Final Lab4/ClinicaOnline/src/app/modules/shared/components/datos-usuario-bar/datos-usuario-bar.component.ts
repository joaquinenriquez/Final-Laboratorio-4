import { Usuario } from './../../../usuarios/models/usuario';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-usuario-bar',
  templateUrl: './datos-usuario-bar.component.html',
  styleUrls: ['./datos-usuario-bar.component.scss']
})
export class DatosUsuarioBarComponent implements OnInit {

  @Input() usuario: Usuario;
  
  constructor() { }

  ngOnInit(): void {
    console.log('usuario', this.usuario);
  }

}
