import { Component, OnInit } from '@angular/core';
import { CompanyCreate } from 'app/company/models/company';
import { CompanyService } from 'app/company/services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-form-container',
  template: `
    <app-company-form (submit)="handleSubmit($event)"></app-company-form>
  `,
  styles: []
})
export class CompanyFormContainerComponent implements OnInit {
  constructor(private companyService: CompanyService, private router: Router) {}

  ngOnInit() {}

  handleSubmit(company: CompanyCreate) {
    this.companyService.create(company).subscribe(data => {
      this.router.navigate(['/search']);
    });
  }
}
