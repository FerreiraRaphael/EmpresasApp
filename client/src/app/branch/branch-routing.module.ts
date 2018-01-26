import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchDetailScreenComponent } from 'app/branch/screens/branch-detail-screen/branch-detail-screen.component';
import { NewBranchScreenComponent } from 'app/branch/screens/new-branch-screen/new-branch-screen.component';

const routes: Routes = [
  { path: '', redirectTo: 'new', pathMatch: 'full' },
  {
    path: 'new/:CompanyId',
    component: NewBranchScreenComponent
  },
  {
    path: 'details/:BranchId',
    component: BranchDetailScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule {}
