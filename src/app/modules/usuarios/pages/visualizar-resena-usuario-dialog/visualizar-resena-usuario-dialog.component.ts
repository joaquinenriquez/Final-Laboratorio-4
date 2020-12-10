import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Turno } from 'src/app/modules/turnos/models/turno';

@Component({
  selector: 'app-visualizar-resena-usuario-dialog',
  templateUrl: './visualizar-resena-usuario-dialog.component.html',
  styleUrls: ['./visualizar-resena-usuario-dialog.component.scss']
})
export class VisualizarResenaUsuarioDialogComponent implements OnInit {



  constructor(@Inject(MAT_DIALOG_DATA) public turno: Turno,
              public dialogRef: MatDialogRef<VisualizarResenaUsuarioDialogComponent>,) { }

  ngOnInit(): void {
    console.log(this.turno);
  }

}
