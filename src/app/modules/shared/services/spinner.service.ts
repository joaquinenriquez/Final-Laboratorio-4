import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(public ngxSpinnerService: NgxSpinnerService) { }

  public mostrarSpinner(tiempo: number): void 
  {
    this.ngxSpinnerService.show();
    setTimeout(() => {
      this.ngxSpinnerService.hide();
    }, tiempo);
  }
  

  public ocultarSpinner(): void {
    this.ngxSpinnerService.hide();
  }

}
