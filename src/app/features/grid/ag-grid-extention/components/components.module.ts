import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgCellEditorsModule } from './cell-editors/ag-cell-editors.module';
import { CellRenderersModule } from './cell-renderers/cell-renderers.module';

@NgModule({
  imports: [CommonModule, AgCellEditorsModule, CellRenderersModule],
  declarations: []
})
export class ComponentsModule {}
