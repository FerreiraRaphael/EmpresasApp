import {
  Component,
  OnInit,
  Input,
  ContentChild,
  AfterContentInit
} from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {
  @Input() label: string;
  @Input() errorMessage: string;
  @ContentChild(NgModel) model: NgModel;
  input: any;

  constructor() {}

  ngOnInit() {}
  ngAfterContentInit() {
    this.input = this.model;
    if (this.input === undefined) {
      throw new Error(
        'Este component precisa ser usado com uma diretiva ngModel'
      );
    }
  }
  hasSuccess(): boolean {
    const { input } = this;
    return input.valid && (input.touched || input.dirty);
  }

  hasError(): boolean {
    const { input } = this;
    return input.invalid && (input.touched || input.dirty);
  }
}
