import { HorarioTrabajo } from './../models/horario-trabajo';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diaLaboral'
})
export class DiaLaboralPipe implements PipeTransform {

  transform(diasLaborables: HorarioTrabajo []): HorarioTrabajo[] {
    if (diasLaborables) {
      return diasLaborables.filter(unDiaLaborable => unDiaLaborable.check);
    }
  }
}