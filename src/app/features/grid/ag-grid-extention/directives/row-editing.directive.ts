import { Directive, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellValueChangedEvent,
  Column,
  RowEditingStoppedEvent,
  RowValueChangedEvent,
} from 'ag-grid-community';
import { AgGridContext } from '../../interfaces/ag-grid-context';
import { CREATE_ROW } from '../constants';
import { AgGridUtils } from '../utils/ag-grid.utils';

/** Enables row editing in grid */
@Directive({ selector: 'ag-grid-angular[rowEditing]' })
export class RowEditingDirective implements OnInit, AfterViewInit {
  context: AgGridContext;
  /** List of actual dirty columns/cells after edit */
  dirtyColumns: Column[] = [];

  constructor(private agGrid: AgGridAngular, private snackBar: MatSnackBar) {}

  ngOnInit() {
    const { editType, gridOptions } = this.agGrid;
    if (!editType || !gridOptions.editType) {
      this.agGrid.editType = 'fullRow';
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

  @HostListener('cellValueChanged', ['$event'])
  rowEditingStarted(event: CellValueChangedEvent) {
    this.dirtyColumns.push(event.column);
  }

  @HostListener('rowValueChanged', ['$event'])
  rowValueChanged(event: RowValueChangedEvent) {
    console.log('rowValueChanged');
    const { api, context, node } = event;
    if (node.id === CREATE_ROW) return;
    if (this.dirtyColumns.length > 0) {
      const { formGroup } = context as AgGridContext;
      // TODO: save changes to backend...
      this.snackBar.open('TODO: save changes to backend...');
      // Flash dirty cells
      api.flashCells({ rowNodes: [node], columns: this.dirtyColumns });
    }
  }

  @HostListener('rowEditingStopped', ['$event'])
  rowEditingStopped({ context }: RowEditingStoppedEvent) {
    const { formGroup } = context as AgGridContext;
    formGroup.reset();
    formGroup.enable();
    this.dirtyColumns = [];
  }
}
