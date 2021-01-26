import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mi-captcha',
  templateUrl: './mi-captcha.component.html',
  styleUrls: ['./mi-captcha.component.scss']
})
export class MiCaptchaComponent implements OnInit {

  primerNumero: number;
  segundoNumero: number;

  constructor() { }

  ngOnInit(): void {

    this. primerNumero = Math.floor(Math.random() * 10);
    this. segundoNumero = Math.floor(Math.random() * 10);

  }

}
