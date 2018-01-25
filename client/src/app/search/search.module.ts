import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchScreenComponent } from './screens/search-screen/search-screen.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchListComponent } from './components/search-list/search-list.component';
import { SearchContainerComponent } from './containers/search-container.component';
import { SearchListItemComponent } from './components/search-list/search-list-item/search-list-item.component';
import { SearchService } from 'app/search/services/search.service';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { FormsModule } from '@angular/forms';
import { AppModule } from 'app/app.module';
import { InputComponent } from 'app/shared/components/input/input.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router/src/router_module';

@NgModule({
  imports: [CommonModule, SearchRoutingModule, FormsModule, SharedModule],
  declarations: [
    SearchScreenComponent,
    SearchContainerComponent,
    SearchListComponent,
    SearchListItemComponent,
    SearchFormComponent
  ],
  providers: [SearchService]
})
export class SearchModule {}
