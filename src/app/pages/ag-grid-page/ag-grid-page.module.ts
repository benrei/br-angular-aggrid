import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridPage } from './ag-grid.page';
import { RouterModule } from '@angular/router';
import { AgGridExtentionModule } from '../../features/grid/ag-grid-extention/ag-grid-extention.module';
import { DemoAgGridModule } from '../../features/demo-ag-grid/demo-ag-grid.module';

@NgModule({
  imports: [
    AgGridExtentionModule,
    CommonModule,
    DemoAgGridModule,
    RouterModule.forChild([{ path: '', component: AgGridPage }])
  ],
  declarations: [AgGridPage]
})
export class AgGridPageModule {}
