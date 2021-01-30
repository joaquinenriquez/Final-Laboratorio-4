import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'app-mi-captcha',
  templateUrl: './mi-captcha.component.html',
  styleUrls: ['./mi-captcha.component.scss'],
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MiCaptchaComponent,
      multi: true
    }
  ]
})
export class MiCaptchaComponent implements ControlValueAccessor {

  onChange;
  onTouched;
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  answer: number;

  ngOnInit() { this.createCaptcha(); }
  
  writeValue(value) { }

  registerOnChange(fn) { this.onChange = fn; }
  registerOnTouched(fn) { this.onTouched = fn; }


  createCaptcha() {
    const ctx = this.canvas.nativeElement.getContext("2d");
    const [numOne, numTwo] = [random(), random()];
    this.answer = numOne + numTwo;

    ctx.font = "30px Arial";
    ctx.fillText(`${numOne} + ${numTwo} = `, 10, 35);
  }

  change(value: string) {
    this.onChange(value);
    this.onTouched();
  }

  validate({ value }: FormControl) {
    const isNotValid = this.answer !== Number(value);
    return isNotValid && {
      invalid: true
    }
  }

}

function random() {
  return Math.floor(Math.random() * 10) + 1;
}



