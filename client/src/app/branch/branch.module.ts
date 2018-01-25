import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchDetailScreenComponent } from './screens/branch-detail-screen/branch-detail-screen.component';
import { BranchRoutingModule } from 'app/branch/branch-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BranchRoutingModule
  ],
  declarations: [BranchDetailScreenComponent]
})
export class BranchModule { }
