import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { AgGridDirectivesModule } from './directives/ag-grid-directives.module';
import 'ag-grid-enterprise';
import { ComponentsModule } from './components/components.module';
import { DatasourceCwService } from './services/datasource-cw.service';

@NgModule({
  imports: [
    AgGridModule.withComponents([]),
    AgGridDirectivesModule,
    ComponentsModule,
    CommonModule,
  ],
  declarations: [],
  exports: [AgGridDirectivesModule, AgGridModule],
  providers: [DatasourceCwService],
})
/** AgGrid extentions
 * Components: cell-editors, cell-render, column-types, status-bars
 * Setups: gridOptions, colDefDefaults, column-types
 * Other: utils and styling
 *  */
export class AgGridExtentionModule {}
