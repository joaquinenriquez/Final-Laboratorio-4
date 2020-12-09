import { Time } from '@angular/common';
import { Usuario } from './usuario';

export interface Profesional extends Usuario {
    especialidad: string[];
    diasAtencion: string[];
    horariosComienzoAtencion: Time;
    horarioFinAtencion: Time;
}
