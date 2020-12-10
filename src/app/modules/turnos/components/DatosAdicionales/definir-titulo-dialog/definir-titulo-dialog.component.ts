import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-definir-titulo-dialog',
  templateUrl: './definir-titulo-dialog.component.html',
  styleUrls: ['./definir-titulo-dialog.component.scss']
})
export class DefinirTituloDialogComponent implements OnInit {

  titulo: string;

  @ViewChild('inputNombreTitulo') inputNombreTitulo: ElementRef;


  constructor(@Inject(MAT_DIALOG_DATA) public tituloDialogo: string,
              public dialogRef: MatDialogRef<DefinirTituloDialogComponent>) { }

  ngOnInit(): void {

    setTimeout ( () => { 
      this.inputNombreTitulo.nativeElement.focus();
    }, 0);

  }

  cancelar(): void {
    this.dialogRef.close(undefined);
  }

  aceptarCambios(): void {
    this.dialogRef.close(this.titulo);
  }

}
