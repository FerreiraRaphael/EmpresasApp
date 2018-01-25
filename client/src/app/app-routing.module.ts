import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundScreenComponent } from 'app/shared/screens/not-found-screen/not-found-screen.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  {
    path: 'search',
    loadChildren: 'app/search/search.module#SearchModule'
  },
  {
    path: 'import',
    loadChildren: 'app/import/import.module#ImportModule'
  },
  {
    path: 'company',
    loadChildren: 'app/company/company.module#CompanyModule'
  },
  {
    path: 'branch',
    loadChildren: 'app/branch/branch.module#BranchModule'
  },
  {
    path: '**',
    component: NotFoundScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
