import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { CreateBranch, Branch } from 'app/branch/models/branch';

@Injectable()
export class BranchService {

  constructor(private http: Http) {}

  find(id: number | string) {
    return this.http
      .get(`${environment.api.url}/branch/${id}`)
      .map(response => response.json())
      .map(response => response.body);
  }

  create(branch: CreateBranch) {
    return this.http
      .post(`${environment.api.url}/branch`, branch)
      .map(response => response.json())
      .map(response => response.body);
  }

  edit(branch: Branch) {
    return this.http
      .put(`${environment.api.url}/branch/${branch.id}`, branch)
      .map(response => response.json())
      .map(response => response.body);
  }

  delete(id: number | string) {
    return this.http
      .delete(`${environment.api.url}/branch/${id}`)
      .map(response => response.json())
      .map(response => response.body);
  }

}
