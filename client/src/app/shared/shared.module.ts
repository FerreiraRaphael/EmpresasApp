import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundScreenComponent } from 'app/shared/screens/not-found-screen/not-found-screen.component';
import { InputComponent } from 'app/shared/components/input/input.component';
import { HeaderComponent } from 'app/shared/components/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [NotFoundScreenComponent, InputComponent, HeaderComponent],
  exports: [NotFoundScreenComponent, InputComponent, HeaderComponent]
})
export class SharedModule {}
