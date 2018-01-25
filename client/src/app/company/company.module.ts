import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDetailScreenComponent } from './screens/company-detail-screen/company-detail-screen.component';
import { CompanyRoutingModule } from 'app/company/company-routing.module';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { CompanyFormContainerComponent } from './containers/company-form-container.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CompanyService } from 'app/company/services/company.service';
import { NewCompanyScreenComponent } from './screens/new-company-screen/new-company-screen.component';

@NgModule({
  imports: [CommonModule, CompanyRoutingModule, FormsModule, SharedModule],
  declarations: [
    CompanyDetailScreenComponent,
    CompanyFormComponent,
    CompanyFormContainerComponent,
    NewCompanyScreenComponent
  ],
  providers: [CompanyService]
})
export class CompanyModule {}
