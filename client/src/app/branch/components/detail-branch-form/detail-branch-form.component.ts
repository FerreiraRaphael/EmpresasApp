import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Branch } from 'app/branch/models/branch';

@Component({
  selector: 'app-detail-branch-form',
  templateUrl: './detail-branch-form.component.html',
  styles: []
})
export class DetailBranchFormComponent implements OnInit {
  @Output() submit = new EventEmitter<Branch>();
  @Output() delete = new EventEmitter<number>();
  @Input() branch: Branch;

  edit = false;

  constructor() {}

  ngOnInit() {}

  emitSubmit(branch: Branch) {
    this.editOff();
    this.submit.emit(branch);
  }

  editOn() {
    this.edit = true;
  }

  editOff() {
    this.edit = false;
  }

  emitDelete() {
    this.delete.emit(this.branch.id);
  }
}
