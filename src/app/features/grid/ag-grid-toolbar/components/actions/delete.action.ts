import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgGridAngular } from 'ag-grid-angular';
import { RowNode } from 'ag-grid-community';

@Component({
  selector: 'app-delete-action',
  template: `
    <button
      mat-icon-button
      (click)="deleteFn(agGrid.api.getSelectedNodes()[0])"
      [disabled]="isDisabled"
    >
      <mat-icon matTooltip="Delete">delete</mat-icon>
    </button>
  `
})
export class DeleteAction implements OnInit {
  @Input() deleteFn;
  @Input() agGrid: AgGridAngular;
  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.deleteFn = this.deleteFn || this.defaultDeleteFn;
  }

  @HostBinding('class.disabled') get isDisabled() {
    const rowNode = this.agGrid.api?.getSelectedNodes()?.[0];
    return !rowNode?.displayed;
  }

  defaultDeleteFn = (rowNode: RowNode) => {
    this.agGrid.api.applyTransaction({ remove: [rowNode.data] });
    this._snackBar.open(`TODO: Delete..`, null, { duration: 4000 });
  };
}
