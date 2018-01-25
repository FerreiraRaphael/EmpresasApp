import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchScreenComponent } from 'app/search/screens/search-screen/search-screen.component';

const routes: Routes = [
  {
    path: '',
    component: SearchScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {}
