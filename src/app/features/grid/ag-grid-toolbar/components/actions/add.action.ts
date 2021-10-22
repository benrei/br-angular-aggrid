import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgGridAngular } from 'ag-grid-angular';
import { EditableCallbackParams } from 'ag-grid-community';

import { AgGridContext } from './../../../interfaces/ag-grid-context';
import ElementsService from '../../services/elements.service';
import { ToolbarDialogComponent } from '../toolbar-dialog.component';

@Component({
  selector: 'app-add-action',
  template: `
    <button *ngIf="!hide" mat-icon-button (click)="addFn()">
      <mat-icon matTooltip="Add">add</mat-icon>
    </button>
  `,
})
export class AddAction implements OnInit {
  @Input() agGrid: AgGridAngular;
  @Input() hide = false;
  @Input() addFn;
  context: AgGridContext;
  constructor(
    private es: ElementsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.addFn = this.addFn || this.defaultAddFn;
    this.context = this.agGrid?.context || this.agGrid?.gridOptions?.context;
  }

  defaultAddFn = () => {
    this._snackBar.open(`TODO: defaultAddFn`, null, { duration: 3000 });
    const columns = this.getEditableColumns(this.agGrid);
    const elements = this.es.createFormElementsFromColumns(columns);
    console.log(elements);
    this.agGrid.api.flashCells({
      rowNodes: this.agGrid.api.getSelectedNodes(),
    });
    this.dialog.open(ToolbarDialogComponent, {
      width: '516px',
      data: { formGroup: this.context.formGroup, elements },
    });
  };

  getEditableColumns(agGrid: AgGridAngular) {
    return agGrid.columnApi.getAllColumns().filter((c) => {
      const colDef = c.getColDef();
      const params = {
        api: agGrid.api,
        colDef,
        column: c,
        columnApi: agGrid.columnApi,
        context: agGrid.context || agGrid.gridOptions.context,
        data: null,
        node: null,
      } as EditableCallbackParams;
      return typeof colDef.editable === 'function'
        ? colDef.editable(params)
        : colDef.editable;
    });
  }
}
