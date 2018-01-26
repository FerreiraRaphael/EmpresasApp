import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-detail-screen',
  templateUrl: './company-detail-screen.component.html',
  styles: []
})
export class CompanyDetailScreenComponent implements OnInit, OnDestroy  {
  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['CompanyId'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
