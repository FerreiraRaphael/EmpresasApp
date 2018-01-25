import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router/src/router_module';
import { NotFoundScreenComponent } from 'app/shared/screens/not-found-screen/not-found-screen.component';
import { HeaderComponent } from 'app/shared/components/header/header.component';
import { InputComponent } from './shared/components/input/input.component';
import { SharedModule } from 'app/shared/shared.module';
import { CompanyFormContainerComponent } from './containers/containers/company-form-container.component';

@NgModule({
  declarations: [AppComponent, CompanyFormContainerComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
