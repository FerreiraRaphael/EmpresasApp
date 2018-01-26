import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-branch-detail-screen',
  templateUrl: './branch-detail-screen.component.html',
  styles: []
})
export class BranchDetailScreenComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['BranchId'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
