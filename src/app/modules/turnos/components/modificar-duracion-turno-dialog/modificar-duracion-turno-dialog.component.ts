import { MatSelect } from '@angular/material/select';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadoUsuario } from 'src/app/modules/usuarios/models/estado-usuario.enum';
import { Usuario } from 'src/app/modules/usuarios/models/usuario';
import { Turno } from '../../models/turno';
import { Time } from '@angular/common';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-modificar-duracion-turno-dialog',
  templateUrl: './modificar-duracion-turno-dialog.component.html',
  styleUrls: ['./modificar-duracion-turno-dialog.component.scss']
})
export class ModificarDuracionTurnoDialogComponent implements OnInit {

  @ViewChild(MatInput) inputNuevaDuracion: MatInput;
  opcionesEstado: EstadoUsuario[];
  nuevaDuracion: Number;


  constructor(@Inject(MAT_DIALOG_DATA) public turno: Turno,
              public dialogRef: MatDialogRef<ModificarDuracionTurnoDialogComponent>,) { }

  ngOnInit(): void {
    setTimeout ( () => { 
      this.inputNuevaDuracion.focus();
    }, 0);

    this.nuevaDuracion = this.turno.duracionEstimada + 15;

  }

  cancelar(): void {
    this.dialogRef.close(undefined);
  }

  cambiarEstado(): void {
    this.dialogRef.close(this.nuevaDuracion);
  }

}

