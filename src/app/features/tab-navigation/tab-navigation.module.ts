import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { TabNavigationComponent } from './tab-navigation/tab-navigation.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TabNavigationComponent],
  imports: [CommonModule, MatTabsModule, RouterModule],
  exports: [TabNavigationComponent],
})
export class TabNavigationModule {}
