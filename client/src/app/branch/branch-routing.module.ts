import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchDetailScreenComponent } from 'app/branch/screens/branch-detail-screen/branch-detail-screen.component';

const routes: Routes = [
  {
    path: '',
    component: BranchDetailScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule {}
