import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportScreenComponent } from 'app/import/screens/import-screen/import-screen.component';

const routes: Routes = [
  {
    path: '',
    component: ImportScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportRoutingModule {}
