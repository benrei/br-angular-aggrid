import { Component, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Events, GridReadyEvent } from 'ag-grid-community';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-undo-action',
  template: `
    <button
      mat-icon-button
      (click)="agGrid?.api?.undoCellEditing()"
      [disabled]="count === 0"
    >
      <mat-icon matTooltip="Undo">undo</mat-icon>
    </button>
  `
})
export class UndoAction {
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
    this.count = this.agGrid?.api?.getCurrentUndoSize();
  };
}
