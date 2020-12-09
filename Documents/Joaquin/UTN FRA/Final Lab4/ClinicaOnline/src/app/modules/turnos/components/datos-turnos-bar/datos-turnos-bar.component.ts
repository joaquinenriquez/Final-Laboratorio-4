import { Component, Input, OnInit } from '@angular/core';
import { Turno } from '../../models/turno';

@Component({
  selector: 'app-datos-turnos-bar',
  templateUrl: './datos-turnos-bar.component.html',
  styleUrls: ['./datos-turnos-bar.component.scss']
})
export class DatosTurnosBarComponent implements OnInit {

  @Input() turno: Turno;
  
  constructor() { }

  ngOnInit(): void {
    console.log('usuario', this.turno);
  }

}
