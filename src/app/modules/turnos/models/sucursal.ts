import { Time } from '@angular/common';

export interface Sucursal {
    diasApertura: string[];
    horarioApertura: Time;
    horarioCierre: Time;
    cantidadConsultorios: number;
    duracionMinimaTurno: Time;
}
