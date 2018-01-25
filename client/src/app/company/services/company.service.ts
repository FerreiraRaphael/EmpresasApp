import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { CompanyCreate } from 'app/company/models/company';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {

  constructor(private http: Http) { }

  create(company: CompanyCreate) {
    return this.http
      .post(`${environment.api.url}/company`, company)
      .map(response => response.json())
      .map(response => response.body);
  }
}
