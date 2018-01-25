import { Component, OnInit } from '@angular/core';
import { SearchService } from 'app/search/services/search.service';
import { Observable } from 'rxjs/Observable';
import { SearchResult } from 'app/search/models/search-result';
import { SearchFilter } from 'app/search/models/search-filter';

@Component({
  selector: 'app-search-container',
  template: `
    <app-search-form (submit)="handleSubmit($event)"></app-search-form>
    <app-search-list [searchResults]="searchResults"></app-search-list>
  `,
  styles: []
})
export class SearchContainerComponent implements OnInit {
  searchResults: Observable<SearchResult[]>;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchResults = this.searchService.search({});
  }

  handleSubmit(searchFilter: SearchFilter) {
    this.searchResults = this.searchService.search(searchFilter);
  }
}
