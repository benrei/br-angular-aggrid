import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowEditingDirective } from './row-editing.directive';
import { GridOptionsService } from '../services/grid-options.service';
import { CreateRowDirective } from './create-row.directive';
import { AgGridEventSelectionDirective } from './ag-grid-event-selection.directive';
import { AgGridRouteHandlerDirective } from './ag-grid-route-handler.directive';
import { AgGridNavigationDirective } from './ag-grid-navigation.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AgGridEventSelectionDirective,
    AgGridNavigationDirective,
    AgGridRouteHandlerDirective,
    CreateRowDirective,
    RowEditingDirective,
  ],
  exports: [
    AgGridEventSelectionDirective,
    AgGridNavigationDirective,
    AgGridRouteHandlerDirective,
    CreateRowDirective,
    RowEditingDirective,
  ],
  providers: [GridOptionsService],
})
export class AgGridDirectivesModule {}
