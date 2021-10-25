import { Component } from '@angular/core';
import { AgGridToolbarComponent } from '../ag-grid-toolbar/ag-grid-toolbar.component';

@Component({
  selector: 'app-fit-columns-action',
  template: `
    <button mat-icon-button (click)="toolBar.agGrid?.api?.sizeColumnsToFit()">
      <mat-icon matTooltip="Fit columns">view_column</mat-icon>
    </button>
  `,
})
export class FitColumnsAction {
  constructor(public toolBar: AgGridToolbarComponent) {}
}
