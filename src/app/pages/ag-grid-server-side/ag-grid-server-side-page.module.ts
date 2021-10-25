import { AgGridToolbarModule } from './../../features/grid/ag-grid-toolbar/ag-grid-toolbar.module';
import { AgGridFilterPanelModule } from './../../features/grid/ag-grid-filter-panel/ag-grid-filter-panel.module';
import { AgGridWrapperModule } from './../../features/grid/ag-grid-wrapper/ag-grid-wrapper.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridServerSidePage } from './ag-grid-server-side.page';
import { RouterModule } from '@angular/router';
import { AgGridExtentionModule } from '../../features/grid/ag-grid-extention/ag-grid-extention.module';

@NgModule({
  imports: [
    AgGridExtentionModule,
    AgGridFilterPanelModule,
    AgGridToolbarModule,
    AgGridWrapperModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: AgGridServerSidePage }]),
  ],
  declarations: [AgGridServerSidePage],
})
export class AgGridServerSidePageModule {}
