import { AgGridAngular } from 'ag-grid-angular';
import { ColumnApi } from 'ag-grid-community';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reset-columns-action',
  template: `
    <button mat-icon-button (click)="agGrid.columnApi.resetColumnState()">
      <mat-icon matTooltip="Reset columns">restore</mat-icon>
    </button>
  `,
})
export class ResetColumnsAction {
  @Input() agGrid: AgGridAngular;
}
