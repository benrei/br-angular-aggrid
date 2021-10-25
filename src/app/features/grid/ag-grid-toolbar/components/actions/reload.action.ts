import { Component, EventEmitter, Output } from '@angular/core';
import { AgGridToolbarComponent } from '../ag-grid-toolbar/ag-grid-toolbar.component';

@Component({
  selector: 'app-reload-action',
  template: `
    <button mat-icon-button (click)="onClick()">
      <mat-icon matTooltip="Reload data">refresh</mat-icon>
    </button>
  `,
})
export class ReloadAction {
  @Output() reload = new EventEmitter<void>();
  constructor(private toolBar: AgGridToolbarComponent) {}
  onClick() {
    const type = this.toolBar.agGrid.api.getModel().getType();
    if (type === 'serverSide') {
      this.toolBar.agGrid.api.refreshServerSideStore({ purge: false });
    }
    this.reload.emit();
  }
}
