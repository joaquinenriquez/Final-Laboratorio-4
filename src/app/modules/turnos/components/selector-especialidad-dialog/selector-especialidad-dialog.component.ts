import { MatSelect } from '@angular/material/select';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-selector-especialidad-dialog',
  templateUrl: './selector-especialidad-dialog.component.html',
  styleUrls: ['./selector-especialidad-dialog.component.scss']
})
export class SelectorEspecialidadDialogComponent implements OnInit {

  @ViewChild(MatSelect) selectEspecialiades: MatSelect;


  especialidadElegida = '';

  constructor(@Inject(MAT_DIALOG_DATA) public especialidades: string,
              public dialogRef: MatDialogRef<SelectorEspecialidadDialogComponent>,) { }

  ngOnInit(): void {
    setTimeout ( () => { 
      this.selectEspecialiades.focus();
    }, 0);

  }

  cancelar(): void {
    this.dialogRef.close(undefined);
  }

  cambiarEstado(): void {
    this.dialogRef.close(this.especialidadElegida);
  }

}

