import { AgGridAngular } from 'ag-grid-angular';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GridReadyEvent, GridApi, SelectionChangedEvent } from 'ag-grid-community';
import { AgGridLookupEditorParams } from '../../ag-grid-lookup.models';

@Component({
  selector: 'app-ag-grid-dialog',
  templateUrl: './ag-grid-dialog.component.html',
  styleUrls: ['./ag-grid-dialog.component.scss'],
})
export class AgGridDialogComponent implements OnInit {
  gridApi: GridApi;
  defaultGridOptions: {
    // todo
  };
  isButtonDisabled = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public params: AgGridLookupEditorParams,
    public dialogRef: MatDialogRef<AgGridDialogComponent>
  ) {}

  ngOnInit() {}

  onGridReady({ api }: GridReadyEvent) {
    this.gridApi = api;
  }

  onSelectionChanged({ api }: SelectionChangedEvent) {
    const selected = api.getSelectedNodes();
    this.isButtonDisabled = selected.length < 1 ? true : false;
  }

  onBtnClick(agGrid: AgGridAngular) {
    const selected = agGrid.rowSelection === 'single' ? agGrid.api.getSelectedRows()[0] : agGrid.api.getSelectedRows();
    this.dialogRef.close(selected);
  }
}
