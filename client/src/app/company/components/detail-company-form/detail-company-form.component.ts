import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Company } from 'app/company/models/company';

@Component({
  selector: 'app-detail-company-form',
  templateUrl: './detail-company-form.component.html',
  styles: []
})
export class DetailCompanyFormComponent implements OnInit {
  @Output() submit = new EventEmitter<Company>();
  @Output() delete = new EventEmitter<number>();
  @Input()
  company: Company;
  edit = false;

  constructor() {}

  ngOnInit() {}

  emitSubmit(company: Company) {
    this.editOff();
    this.submit.emit(company);
  }

  editOn() {
    this.edit = true;
  }

  editOff() {
    this.edit = false;
  }

  emitDelete() {
    this.delete.emit(this.company.id);
  }
}
