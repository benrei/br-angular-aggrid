import { Component, OnInit } from '@angular/core';
import { Events, GridReadyEvent } from 'ag-grid-community';
import { take } from 'rxjs/operators';
import { AgGridToolbarComponent } from '../ag-grid-toolbar/ag-grid-toolbar.component';

@Component({
  selector: 'app-redo-action',
  template: `
    <button
      mat-icon-button
      (click)="toolBar.agGrid?.api?.redoCellEditing()"
      [disabled]="count === 0"
    >
      <mat-icon matTooltip="Redo">redo</mat-icon>
    </button>
  `,
})
export class RedoAction implements OnInit {
  constructor(public toolBar: AgGridToolbarComponent) {}
  count = 0;

  ngOnInit(): void {
    this.toolBar.agGrid?.gridReady
      .pipe(take(1))
      .subscribe(({ api }: GridReadyEvent) => {
        api.addEventListener(Events.EVENT_CELL_VALUE_CHANGED, this.updateCount);
      });
  }
  updateCount = () => {
    this.count = this.toolBar.agGrid?.api?.getCurrentRedoSize();
  };
}
