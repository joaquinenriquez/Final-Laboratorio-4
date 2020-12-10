import { Encuesta } from './../../../turnos/models/encuesta';
import { EncuestasDataService } from './../../../turnos/services/encuestas-data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PreguntaEncuesta } from 'src/app/modules/turnos/models/encuesta';
import { Turno } from 'src/app/modules/turnos/models/turno';

@Component({
  selector: 'app-visualizar-encuesta-usuario-dialog',
  templateUrl: './visualizar-encuesta-usuario-dialog.component.html',
  styleUrls: ['./visualizar-encuesta-usuario-dialog.component.scss']
})
export class VisualizarEncuestaUsuarioDialogComponent implements OnInit {

  dataSource: MatTableDataSource<PreguntaEncuesta>;
  displayedColumns = ['pregunta', 'respuesta'];

  constructor(
    public dialogRef: MatDialogRef<VisualizarEncuestaUsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public turno: Turno,
    private encuestaDataService: EncuestasDataService) {}


  ngOnInit(): void {
    this.encuestaDataService.traerEncuestaPorId(this.turno.idTurno).subscribe(datosEncuesta => {
      this.dataSource = new MatTableDataSource(datosEncuesta.preguntas)
    })
  }


  }

