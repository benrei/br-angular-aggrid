import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridFilterPanelComponent } from './components/ag-grid-filter-panel.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  imports: [CommonModule, MatButtonToggleModule],
  declarations: [AgGridFilterPanelComponent],
  exports: [AgGridFilterPanelComponent]
})
export class AgGridFilterPanelModule {}
