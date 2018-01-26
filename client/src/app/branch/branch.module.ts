import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchDetailScreenComponent } from './screens/branch-detail-screen/branch-detail-screen.component';
import { BranchRoutingModule } from 'app/branch/branch-routing.module';
import { NewBranchScreenComponent } from './screens/new-branch-screen/new-branch-screen.component';
import { NewBranchFormComponent } from './components/new-branch-form/new-branch-form.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NewBranchFormContainerComponent } from './containers/new-branch-form-container.component';
import { BranchService } from 'app/branch/services/branch.service';
import { CompanyService } from 'app/company/services/company.service';
import { DetailBranchFormComponent } from './components/detail-branch-form/detail-branch-form.component';
import { DetailBranchFormContainerComponent } from './containers/detail-branch-form-container.component';

@NgModule({
  imports: [CommonModule, BranchRoutingModule, FormsModule, SharedModule],
  declarations: [
    BranchDetailScreenComponent,
    NewBranchScreenComponent,
    NewBranchFormComponent,
    NewBranchFormContainerComponent,
    DetailBranchFormComponent,
    DetailBranchFormContainerComponent
  ],
  providers: [BranchService, CompanyService]
})
export class BranchModule {}
