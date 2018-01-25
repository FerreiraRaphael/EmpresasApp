import { Component, OnInit, Input } from '@angular/core';
import { SearchResult } from 'app/search/models/search-result';

@Component({
  selector: 'app-search-list-item',
  templateUrl: './search-list-item.component.html',
  styles: []
})
export class SearchListItemComponent implements OnInit {
  @Input() searchResult: SearchResult;

  constructor() {}

  ngOnInit() {}
}
