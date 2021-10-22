import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoGridComponent } from './components/demo-grid.component';
import { AgGridExtentionModule } from '../grid/ag-grid-extention/ag-grid-extention.module';
import { AgGridToolbarModule } from '../grid/ag-grid-toolbar/ag-grid-toolbar.module';
import { AgGridFilterPanelModule } from '../grid/ag-grid-filter-panel/ag-grid-filter-panel.module';
import { AgGridWrapperModule } from '../grid/ag-grid-wrapper/ag-grid-wrapper.module';

@NgModule({
  imports: [
    AgGridExtentionModule,
    AgGridToolbarModule,
    AgGridFilterPanelModule,
    AgGridWrapperModule,
    CommonModule
  ],
  declarations: [DemoGridComponent],
  exports: [DemoGridComponent]
})
export class DemoAgGridModule {}
