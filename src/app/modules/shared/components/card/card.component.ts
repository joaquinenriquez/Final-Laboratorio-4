
import { Component, OnInit, forwardRef } from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validator,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
} from "@angular/forms";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CardComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CardComponent),
      multi: true,
    },
  ],
})
export class CardComponent implements OnInit {

  onChanged: any = () => {};
  onTouched: any = () => {};
  onValidationChange: any = () => {};

  private _value: string;

  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value;

    this.onChanged(this._value);
    this.onValidationChange();
  }

  constructor() {}

  ngOnInit() {}

  writeValue(obj: any): void {
    this._value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  validate(control: AbstractControl): ValidationErrors {
    const isIncorrectCard = this._value && this._value.length !== 16;

    return isIncorrectCard ? { invalidCard: isIncorrectCard } : null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn;
  }
}