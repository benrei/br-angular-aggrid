import { AgGridAngular } from 'ag-grid-angular';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reload-action',
  template: `
    <button mat-icon-button (click)="onClick()">
      <mat-icon matTooltip="Reload data">refresh</mat-icon>
    </button>
  `
})
export class ReloadAction {
  @Input() agGrid: AgGridAngular;
  onClick() {
    const type = this.agGrid.api.getModel().getType();
    if (type === 'serverSide') {
      this.agGrid.api.refreshServerSideStore({ purge: false });
    }
  }
}
