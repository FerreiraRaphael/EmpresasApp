import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Company } from 'app/company/models/company';
import { CreateBranch } from 'app/branch/models/branch';

@Component({
  selector: 'app-new-branch-form',
  templateUrl: './new-branch-form.component.html',
  styles: []
})
export class NewBranchFormComponent implements OnInit {
  @Output() submit = new EventEmitter<CreateBranch>();
  @Input() company: Company;

  constructor() {}

  ngOnInit() {}

  emitSubmit(branch: CreateBranch) {
    this.submit.emit(branch);
  }
}
