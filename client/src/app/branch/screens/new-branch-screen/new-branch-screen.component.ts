import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-new-branch-screen',
  templateUrl: './new-branch-screen.component.html',
  styles: []
})
export class NewBranchScreenComponent implements OnInit, OnDestroy {
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
