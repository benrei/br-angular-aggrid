import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RowNode } from 'ag-grid-community';
import { AgGridToolbarComponent } from '../ag-grid-toolbar/ag-grid-toolbar.component';

@Component({
  selector: 'app-delete-action',
  template: `
    <button
      mat-icon-button
      (click)="deleteFn(toolbar.gridApi.getSelectedNodes()[0])"
      [disabled]="isDisabled"
    >
      <mat-icon matTooltip="Delete">delete</mat-icon>
    </button>
  `,
})
export class DeleteAction implements OnInit {
  @Input() deleteFn;
  constructor(
    private _snackBar: MatSnackBar,
    public toolbar: AgGridToolbarComponent
  ) {}

  ngOnInit(): void {
    this.deleteFn = this.deleteFn || this.defaultDeleteFn;
  }

  @HostBinding('class.disabled') get isDisabled() {
    const rowNode = this.toolbar.gridApi?.getSelectedNodes()?.[0];
    return !rowNode?.displayed;
  }

  defaultDeleteFn = (rowNode: RowNode) => {
    this.toolbar.gridApi.applyTransaction({ remove: [rowNode.data] });
    this._snackBar.open(`TODO: Delete..`, null, { duration: 4000 });
  };
}
