import { Component, OnInit, Input } from '@angular/core';
import { CreateBranch } from 'app/branch/models/branch';
import { BranchService } from 'app/branch/services/branch.service';
import { Company } from 'app/company/models/company';
import { CompanyService } from 'app/company/services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-branch-form-container',
  template: `
    <app-new-branch-form [company]="company" (submit)="handleSubmit($event)"></app-new-branch-form>
  `,
  styles: []
})
export class NewBranchFormContainerComponent implements OnInit {
  @Input() CompanyId: number;
  company: Company = {
    cnpjBase: '',
    id: 0,
    razaoSocial: '',
    status: false
  };

  constructor(
    private companyService: CompanyService,
    private branchService: BranchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.companyService.find(this.CompanyId).subscribe(company => {
      this.company = company;
    });
  }

  handleSubmit(branch: CreateBranch) {
    branch.CompanyId = this.company.id;
    branch.cnpj = `${this.company.cnpjBase}${branch.cnpj}`;
    this.branchService.create(branch).subscribe(() => {
      this.router.navigate(['/search']);
    });
  }
}
