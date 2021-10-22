import { AgGridAngular } from 'ag-grid-angular';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fit-columns-action',
  template: `
    <button mat-icon-button (click)="agGrid?.api?.sizeColumnsToFit()">
      <mat-icon matTooltip="Fit columns">view_column</mat-icon>
    </button>
  `,
})
export class FitColumnsAction {
  @Input() agGrid: AgGridAngular
}
