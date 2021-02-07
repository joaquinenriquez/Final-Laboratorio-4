import { Component, OnInit, ElementRef, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, ValidationErrors, NG_VALIDATORS, FormControl } from "@angular/forms";

@Component({
  selector: 'app-mi-captcha',
  templateUrl: './mi-captcha.component.html',
  styleUrls: ['./mi-captcha.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MiCaptchaComponent),
      multi: true,
    },

    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MiCaptchaComponent),
      multi: true,
    }
  ]
})
export class MiCaptchaComponent implements OnInit, ControlValueAccessor {

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


    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 5, 0, img.width / 2, img.height / 2);
      ctx.font = "40px Arial";
      ctx.fillText(`${numOne} + ${numTwo} = `, 140, 90);
    }
    img.src = "../assets/img/captcha.png";


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



