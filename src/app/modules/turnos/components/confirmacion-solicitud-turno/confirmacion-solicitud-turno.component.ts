import { SpinnerService } from './../../../shared/services/spinner.service';
import { DatosSolicitudTurno } from './../../models/datos-solicitud-turno';
import { Profesional } from './../../../usuarios/models/profesional';
import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmacion-solicitud-turno',
  templateUrl: './confirmacion-solicitud-turno.component.html',
  styleUrls: ['./confirmacion-solicitud-turno.component.scss']
})
export class ConfirmacionSolicitudTurnoComponent implements OnInit {

  @Input() datosTurnoConfirmado: DatosSolicitudTurno;

  @Output() turnoConfirmado: EventEmitter<boolean> = new EventEmitter<boolean>();

  deshabilitarBotonConfirmar: boolean = false;
  
  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {}

  confirmarTurno() {
    this.deshabilitarBotonConfirmar = true;
    
    this.spinnerService.mostrarSpinner(2000);

    setTimeout(() => {
      
      Swal.fire({
        title: 'Ya reservamos tu turno!',
        text: 'Ahora tenés aguardar que el profesional lo confirme',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#558B2F'
      }).then(() => {
        this.turnoConfirmado.emit(true);
        this.deshabilitarBotonConfirmar = false;    
      });

    }, 2300)

  }

}
