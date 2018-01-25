import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SearchFilter } from 'app/search/models/search-filter';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styles: []
})
export class SearchFormComponent implements OnInit {
  @Output() submit = new EventEmitter<SearchFilter>();
  @Input() loading: boolean;

  constructor() {}

  emitSubmit(values: SearchFilter) {
    this.submit.emit(values);
  }

  ngOnInit() {}
}
