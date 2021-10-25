import { Component } from '@angular/core';
import { AgGridToolbarComponent } from '../ag-grid-toolbar/ag-grid-toolbar.component';

@Component({
  selector: 'app-reset-columns-action',
  template: `
    <button
      mat-icon-button
      (click)="toolBar.agGrid?.columnApi?.resetColumnState()"
    >
      <mat-icon matTooltip="Reset columns">restore</mat-icon>
    </button>
  `,
})
export class ResetColumnsAction {
  constructor(public toolBar: AgGridToolbarComponent) {}
}
