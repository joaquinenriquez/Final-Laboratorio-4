import { DiaSemana } from './dia-semana.enum';
export interface HorarioTrabajo {
    nombreDia?: DiaSemana;
    check?: Boolean;
    horarioInicio?;
    horarioFin?;
}
