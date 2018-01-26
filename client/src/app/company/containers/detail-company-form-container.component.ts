import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'app/company/services/company.service';
import { Company } from 'app/company/models/company';

@Component({
  selector: 'app-detail-company-form-container',
  template: `
    <app-detail-company-form [company]="company" (submit)="handleSubmit($event)" (delete)="handleDelete($event)" ></app-detail-company-form>
  `,
  styles: []
})
export class DetailCompanyFormContainerComponent implements OnInit {
  @Input() id: string | number;
  company: Company = {
    cnpjBase: '',
    id: 1,
    status: false,
    razaoSocial: ''
  };

  constructor(private companyService: CompanyService, private router: Router) {}

  ngOnInit() {
    this.companyService.find(this.id).subscribe(company => {
      this.company = company;
    });
  }

  handleSubmit(companyAttr: Company) {
    companyAttr.id = this.company.id;
    this.companyService.edit(companyAttr).subscribe(company => {
      this.company = company;
    });
  }

  handleDelete(id) {
    this.companyService.delete(id).subscribe(() => {
      this.router.navigate(['/search']);
    });
  }
}
