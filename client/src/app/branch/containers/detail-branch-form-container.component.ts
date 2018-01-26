import { Component, OnInit, Input } from '@angular/core';
import { Branch } from 'app/branch/models/branch';
import { BranchService } from 'app/branch/services/branch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-branch-form-container',
  template: `
    <app-detail-branch-form [branch]="branch" (submit)="handleSubmit($event)" (delete)="handleDelete($event)" ></app-detail-branch-form>
  `,
  styles: []
})
export class DetailBranchFormContainerComponent implements OnInit {
  @Input() id: string | number;
  branch: Branch = {
    cnpj: '',
    id: 1,
    status: false,
    city: '',
    CompanyId: 0,
    state: ''
  };

  constructor(private branchService: BranchService, private router: Router) {}

  ngOnInit() {
    this.branchService.find(this.id).subscribe(branch => {
      this.branch = branch;
    });
  }

  handleSubmit(branchAttr: Branch) {
    branchAttr.id = this.branch.id;
    branchAttr.cnpj = `${this.branch.cnpj.slice(0, 8)}${branchAttr.cnpj}`;
    this.branchService.edit(branchAttr).subscribe(branch => {
      this.branch = branch;
    });
  }

  handleDelete(id) {
    this.branchService.delete(id).subscribe(() => {
      this.router.navigate(['/search']);
    });
  }
}
