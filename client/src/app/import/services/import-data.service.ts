import { Injectable } from '@angular/core';
import { Http } from '@angular/http/src/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class ImportDataService {
  constructor(private http: Http) {}

  sendFile(file: File): Observable<any> {
    const data = new FormData();
    data.append('data', file);
    return this.http
      .post(`${environment.api.url}/import`, data)
      .map(response => response.json())
      .map(response => response.body);
  }
}
