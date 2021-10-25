import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AddTokenComponent } from './add-token.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatListModule, RouterModule],
  declarations: [AddTokenComponent, MenuComponent],
  exports: [AddTokenComponent, MenuComponent],
  entryComponents: [AddTokenComponent],
})
export class MenuModule {}
