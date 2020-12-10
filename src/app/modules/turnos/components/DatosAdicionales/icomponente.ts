export interface IComponente {
    titulo: string;
    tipoComponente: TipoComponente
    id: number;
    evento?: any;
    valor?: any;
}

export enum TipoComponente {Texto = 0, CasillaVerificacion = 1, Numerico = 2}
