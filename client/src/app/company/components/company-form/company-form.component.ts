import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CompanyCreate } from 'app/company/models/company';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styles: []
})
export class CompanyFormComponent implements OnInit {
  @Output() submit = new EventEmitter<CompanyCreate>();
  constructor() {}

  ngOnInit() {}

  emitSubmit(company: CompanyCreate) {
    this.submit.emit(company);
  }
}
