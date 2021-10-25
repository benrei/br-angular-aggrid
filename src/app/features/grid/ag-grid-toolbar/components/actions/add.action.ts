import { AgGridToolbarComponent } from './../ag-grid-toolbar/ag-grid-toolbar.component';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  @Input() hide = false;
  @Input() addFn;
  constructor(
    private es: ElementsService,
    private toolbar: AgGridToolbarComponent,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.addFn = this.addFn || this.defaultAddFn;
  }

  defaultAddFn = () => {
    const { api, columnApi, context } = this.toolbar.agGrid;
    this._snackBar.open(`TODO: defaultAddFn`, null, { duration: 3000 });
    const columns = columnApi.getAllColumns();
    const editColumns = columns.filter((c) => c.getColDef().cellEditor);
    const elements = this.es.createFormElementsFromColumns(editColumns);
    console.log(elements);
    api.flashCells({ rowNodes: api.getSelectedNodes() });
    this.dialog.open(ToolbarDialogComponent, {
      width: '516px',
      data: { formGroup: context.formGroup, elements },
    });
  };
}
