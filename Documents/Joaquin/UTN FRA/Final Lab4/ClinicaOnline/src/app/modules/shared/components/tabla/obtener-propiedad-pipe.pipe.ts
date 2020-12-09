import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerPropiedadPipe'
})
export class ObtenerPropiedadPipePipe implements PipeTransform {

  transform(objeto: any, propiedadValor: string, ...args: unknown[]): unknown {
    return objeto[propiedadValor]
  }

}
