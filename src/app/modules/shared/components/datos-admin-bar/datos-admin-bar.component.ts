import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modules/usuarios/models/usuario';

@Component({
  selector: 'app-datos-admin-bar',
  templateUrl: './datos-admin-bar.component.html',
  styleUrls: ['./datos-admin-bar.component.scss']
})
export class DatosAdminBarComponent implements OnInit {

  @Input() usuario: Usuario;

  constructor() { }

  ngOnInit(): void {
    console.log('usuario', this.usuario);
  }

}
