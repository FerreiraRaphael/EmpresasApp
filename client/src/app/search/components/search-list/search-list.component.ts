import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SearchResult } from 'app/search/models/search-result';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styles: []
})
export class SearchListComponent implements OnInit {
  @Input() searchResults: Observable<SearchResult[]>;
  @Input() loading: boolean;

  constructor() {}

  ngOnInit() {}
}
