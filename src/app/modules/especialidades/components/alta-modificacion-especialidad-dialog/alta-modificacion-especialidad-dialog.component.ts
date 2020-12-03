import { Especialidad } from './../../../usuarios/models/especialidad';
import { DatosDialogo } from './../listado-especialidades/listado-especialidades.component';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';


@Component({
  selector: 'app-alta-modificacion-especialidad-dialog',
  templateUrl: './alta-modificacion-especialidad-dialog.component.html',
  styleUrls: ['./alta-modificacion-especialidad-dialog.component.scss']
})
export class AltaModificacionEspecialidadDialogComponent implements OnInit {

  filteredOptions: Observable<Especialidad[]>;
  @ViewChild("inputEspecialidad") inputEspecialidad: ElementRef;
  @ViewChild('inputEspecialidad', { read: MatAutocompleteTrigger }) autoComplete: MatAutocompleteTrigger;

  formEspecialidad: FormGroup = new FormGroup( {
    nombreEspecialidad: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$')])
  });



  constructor(
    public dialogRef: MatDialogRef<AltaModificacionEspecialidadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosDialogo) {

      console.log(datos);

      if (!this.datos.textoBotonAceptar)
        this.datos.textoBotonAceptar = 'Aceptar';

      if (!this.datos.textoBotonCancelar)
        this.datos.textoBotonCancelar = 'Cancelar';

    }


  ngOnInit(): void {
    this.filteredOptions = this.formEspecialidad.controls["nombreEspecialidad"].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    setTimeout ( () => { 
      this.inputEspecialidad.nativeElement.focus(); 
      this.autoComplete.closePanel();
    }, 0);

  }


  cancelar(): void {
    this.dialogRef.close(undefined);
  }

  private _filter(value: string): Especialidad[] {
    const filterValue = value?.toLowerCase();
    return this.datos.listaAutoCompletar.filter(option => option?.nombreEspecialidad?.toLowerCase().indexOf(filterValue) === 0);
  }

  crearEspecialidad(especialidad): void {
    if (this.datos.listaAutoCompletar.map(unaEspecialidad => unaEspecialidad.nombreEspecialidad?.toLowerCase()).includes(especialidad.nombreEspecialidad.toLowerCase()) == true){
      Swal.fire({
        title: 'Especialidad Repetida',
        html: `Ya existe una especialidad con el nombre <strong>${especialidad.nombreEspecialidad}</strong>.<br>Intente con otro nombre`,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then ( () => setTimeout ( () => { this.inputEspecialidad.nativeElement.focus(); }, 0));

      return; 
    }

    this.dialogRef.close(especialidad);
  }


}




