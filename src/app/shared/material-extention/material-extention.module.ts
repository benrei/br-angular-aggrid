import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InfiniteScrollDirective } from './autocomplete/infinite-scroll.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [InfiniteScrollDirective],
  exports: [InfiniteScrollDirective],
  providers: []
})
export class MaterialExtentionModule {}
