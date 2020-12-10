import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'siNo'
})
export class SiNoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    
    if (value.toString() == 'true') {
      return 'Si'
    } else if (value.toString()  == 'false') {
      return 'No';
    }

    return value;
  }

}
