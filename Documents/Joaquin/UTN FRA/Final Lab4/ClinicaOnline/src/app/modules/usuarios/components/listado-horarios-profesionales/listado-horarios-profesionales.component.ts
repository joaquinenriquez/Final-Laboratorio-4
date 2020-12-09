import { Usuario } from './../../models/usuario';
import { UsuarioDataService } from './../../services/usuario-data.service';
import { HorarioTrabajo } from './../../../turnos/models/horario-trabajo';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AltaModificacionEspecialidadDialogComponent } from 'src/app/modules/especialidades/components/alta-modificacion-especialidad-dialog/alta-modificacion-especialidad-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listado-horarios-profesionales',
  templateUrl: './listado-horarios-profesionales.component.html',
  styleUrls: ['./listado-horarios-profesionales.component.scss']
})
export class ListadoHorariosProfesionalesComponent implements OnInit {

  dataSource: MatTableDataSource<HorarioTrabajo>;
  displayedColumns = ['nombreDia', 'horarioInicio', 'horarioFin'];

  constructor(
    public dialogRef: MatDialogRef<AltaModificacionEspecialidadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public datos,
    private usuarioDataService: UsuarioDataService) {}


  ngOnInit(): void {
    this.traerHorariosPorUsuario(this.datos.idUsuario);
  }

  traerHorariosPorUsuario(idUsuario: string) {
    this.usuarioDataService.TraerUsuarioPorId(idUsuario).subscribe(datosHorario => {
      let usuario = datosHorario as Usuario
      this.dataSource = new MatTableDataSource(usuario.HorarioTrabajo.filter(unHorario => unHorario.check));
    })
  }


}
