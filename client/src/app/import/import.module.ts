import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportScreenComponent } from './screens/import-screen/import-screen.component';
import { ImportRoutingModule } from 'app/import/import-routing.module';
import { ImportFormComponent } from './components/import-form/import-form.component';
import { ImportFormContainerComponent } from './containers/import-form-container.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { ImportDataService } from 'app/import/services/import-data.service';

@NgModule({
  imports: [CommonModule, FormsModule, ImportRoutingModule, SharedModule],
  declarations: [
    ImportScreenComponent,
    ImportFormComponent,
    ImportFormContainerComponent,
    ImportFormComponent
  ],
  providers: [ImportDataService]
})
export class ImportModule {}
