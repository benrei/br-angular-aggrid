import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowEditingDirective } from './row-editing.directive';
import { GridOptionsService } from '../services/grid-options.service';
import { CreateRowDirective } from './create-row.directive';
import { SelectionDirective } from './selection.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [RowEditingDirective, CreateRowDirective, SelectionDirective],
  exports: [RowEditingDirective, CreateRowDirective, SelectionDirective],
  providers: [GridOptionsService],
})
export class AgGridDirectivesModule {}
