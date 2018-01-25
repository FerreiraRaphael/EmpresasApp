import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { SearchResult } from 'app/search/models/search-result';
import { SearchFilter } from 'app/search/models/search-filter';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

function stringfyParams(params) {
  return Object.keys(params).reduce((result, next) => {
    return params[next] ? `${result}&${next}=${params[next]}` : result;
  }, '?');
}

@Injectable()
export class SearchService {
  constructor(private http: Http) {}

  search(filters: SearchFilter): Observable<SearchResult[]> {
    return this.http
      .get(`${environment.api.url}/search${stringfyParams(filters)}`)
      .map(response => response.json())
      .map(response => response.body);
  }
}
