import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CheckboxRenderer } from './checkbox.renderer';
import { IconLinkRenderer } from './icon-link.renderer';
import { PinnedRenderer } from './pinned.renderer';

@NgModule({
  imports: [CommonModule, MatIconModule, MatTooltipModule, MatCheckboxModule],
  declarations: [CheckboxRenderer, IconLinkRenderer, PinnedRenderer],
  exports: [CheckboxRenderer, IconLinkRenderer, PinnedRenderer],
  entryComponents: [CheckboxRenderer, IconLinkRenderer, PinnedRenderer]
})
export class CellRenderersModule {}
