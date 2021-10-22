import { AgGridAngular } from 'ag-grid-angular';
import { RowNode } from 'ag-grid-community';
import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToolbarDialogComponent } from '../toolbar-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AgGridToolbarComponent } from '../ag-grid-toolbar/ag-grid-toolbar.component';

@Component({
  selector: 'app-edit-action',
  template: `
    <button
      mat-icon-button
      (click)="editFn(toolbar.gridApi.getSelectedNodes()[0])"
      [disabled]="isDisabled"
    >
      <mat-icon matTooltip="Edit">edit</mat-icon>
    </button>
  `,
})
export class EditAction implements OnInit {
  @Input() editFn;
  @Input() agGrid: AgGridAngular;
  constructor(public toolbar: AgGridToolbarComponent,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.editFn = this.editFn || this.defaultEditFn
  }
  
  @HostBinding('class.disabled') get isDisabled() {
    const rowNode = this.agGrid.api?.getSelectedNodes()?.[0];
    return !rowNode?.displayed;
  }

  defaultEditFn = (rowNode: RowNode) => {
    this._snackBar.open(`TODO: defaultEditFn`, null, { duration: 3000 });
    const text = JSON.stringify(rowNode.data, undefined, 4);
    this.dialog.open(ToolbarDialogComponent, { data: { text } });
  };

}
