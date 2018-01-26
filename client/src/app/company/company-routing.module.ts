import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyDetailScreenComponent } from 'app/company/screens/company-detail-screen/company-detail-screen.component';
import { NewCompanyScreenComponent } from 'app/company/screens/new-company-screen/new-company-screen.component';

const routes: Routes = [
  { path: '', redirectTo: 'new', pathMatch: 'full' },
  {
    path: 'new',
    component: NewCompanyScreenComponent
  },
  {
    path: 'details/:CompanyId',
    component: CompanyDetailScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {}
