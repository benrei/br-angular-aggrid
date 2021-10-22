import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherPage } from './other.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: OtherPage }])
  ],
  declarations: []
})
export class OtherPageModule {}
