import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { CompanyCreate, Company } from 'app/company/models/company';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {
  constructor(private http: Http) {}

  find(id: number | string) {
    return this.http
      .get(`${environment.api.url}/company/${id}`)
      .map(response => response.json())
      .map(response => response.body);
  }

  create(company: CompanyCreate) {
    return this.http
      .post(`${environment.api.url}/company`, company)
      .map(response => response.json())
      .map(response => response.body);
  }

  edit(company: Company) {
    return this.http
      .put(`${environment.api.url}/company/${company.id}`, company)
      .map(response => response.json())
      .map(response => response.body);
  }

  delete(id: number | string) {
    return this.http
      .delete(`${environment.api.url}/company/${id}`)
      .map(response => response.json())
      .map(response => response.body);
  }
}
