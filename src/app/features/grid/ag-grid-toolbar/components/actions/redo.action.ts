import { Component, Input, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Events, GridReadyEvent } from 'ag-grid-community';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-redo-action',
  template: `
    <button
      mat-icon-button
      (click)="agGrid?.api?.redoCellEditing()"
      [disabled]="count === 0"
    >
      <mat-icon matTooltip="Redo">redo</mat-icon>
    </button>
  `,
})
export class RedoAction implements OnInit {
  @Input() agGrid: AgGridAngular;
  count = 0;

  ngOnInit(): void {
    this.agGrid?.gridReady
      .pipe(take(1))
      .subscribe(({ api }: GridReadyEvent) => {
        api.addEventListener(Events.EVENT_CELL_VALUE_CHANGED, this.updateCount);
      });
  }
  updateCount = () => {
    this.count = this.agGrid?.api?.getCurrentRedoSize();
  };
}
