import { Directive, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgGridAngular } from 'ag-grid-angular';
import {
  RowEditingStartedEvent,
  RowEditingStoppedEvent,
} from 'ag-grid-community';
import FormUtils from '../../../../core/utils/form.utils';
import { AgGridContext } from '../../interfaces/ag-grid-context';
import { CREATE_ROW } from '../constants';
import { AgGridUtils } from '../utils/ag-grid.utils';

/** Enables create/update rows in ag-grid */
@Directive({
  selector: 'ag-grid-angular[rowEditing]',
})
export class RowEditingDirective implements OnInit, AfterViewInit {
  context: AgGridContext;

  constructor(private agGrid: AgGridAngular, private snackBar: MatSnackBar) {}

  ngOnInit() {
    const { editType, gridOptions } = this.agGrid;
    if (!editType || !gridOptions.editType) {
      this.agGrid.editType = 'fullRow';
    }
    if (!this.agGrid.context || !gridOptions.context) {
      this.agGrid.context = {};
    }
    this.context = this.agGrid.context || gridOptions.context;
  }

  ngAfterViewInit(): void {
    const colDefs = this.agGrid.columnApi
      .getAllColumns()
      .map((col) => col.getColDef())
      .filter((c) => c.cellEditor || c.cellEditorFramework);
    // Create a formGroup to hold values for columns with a cellEditor
    this.context.formGroup = AgGridUtils.createFormGroup(colDefs);
  }

  @HostListener('rowEditingStarted', ['$event'])
  async rowEditingStarted(event: RowEditingStartedEvent) {
    const { formGroup } = event.context as AgGridContext;
  }

  @HostListener('rowEditingStopped', ['$event'])
  rowEditingEnded(event: RowEditingStoppedEvent) {
    const { api, columnApi, context, data, node } = event;
    const { formGroup } = context as AgGridContext;
    if (formGroup.dirty && node.id !== CREATE_ROW) {
      // TODO: save changes to backend...
      this.snackBar.open('TODO: save changes to backend...');
      // Flash dirty cells
      const dirtyCols = FormUtils.getDirtyValues(formGroup);
      const dirtyColKeys = Object.keys(dirtyCols);
      api.flashCells({ rowNodes: [node], columns: dirtyColKeys });
      formGroup.reset();
      formGroup.enable();
    }
  }
}
