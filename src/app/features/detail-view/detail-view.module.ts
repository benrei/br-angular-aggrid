import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailViewComponent } from './detail-view.component';

@NgModule({
  declarations: [DetailViewComponent],
  imports: [CommonModule, RouterModule],
  exports: [DetailViewComponent],
})
export class DetailViewModule {}
