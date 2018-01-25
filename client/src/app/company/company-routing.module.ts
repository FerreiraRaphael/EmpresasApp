import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyDetailScreenComponent } from 'app/company/screens/company-detail-screen/company-detail-screen.component';

const routes: Routes = [
  { path: '', redirectTo: 'new', pathMatch: 'full' },
  {
    path: 'new',
    component: CompanyDetailScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {}
