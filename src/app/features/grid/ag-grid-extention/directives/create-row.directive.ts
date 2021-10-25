import { Directive, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AgGridEvent,
  CellValueChangedEvent,
  Column,
  RowNode,
  RowValueChangedEvent,
} from 'ag-grid-community';
import { AgGridContext } from '../../interfaces/ag-grid-context';
import { CREATE_ROW } from '../constants';

/** Adds a bottom `CREATE_ROW` for agGrid */
@Directive({ selector: 'ag-grid-angular[rowEditing][createRow]' })
export class CreateRowDirective implements OnInit {
  /** List of actual dirty columns/cells */
  dirtyColumns: (Column | string)[] = [];

  constructor(private agGrid: AgGridAngular, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.agGrid.postSort = (rowNodes: RowNode[]) => {
      for (let i = 0; i < rowNodes.length; i++) {
        if (rowNodes[i].id === CREATE_ROW) {
          rowNodes.splice(rowNodes.length - 1, 0, rowNodes.splice(i, 1)[0]);
        }
      }
    };
  }
  @HostListener('firstDataRendered', ['$event'])
  onRowDataChanged({ api }: AgGridEvent) {
    const { context, gridOptions } = this.agGrid;
    const gridContext = (context || gridOptions.context) as AgGridContext;
    const { entitySchema } = gridContext;
    const type = api.getModel().getType();
    // Handy if `agGrid.getRowNodeId` is used
    const createRowData = { [entitySchema?.idField || 'id']: CREATE_ROW };
    switch (type) {
      case 'clientSide':
        const transaction = api.applyTransaction({ add: [createRowData] });
        const node = transaction.add[0];
        node.setRowSelectable(false);
        node.setId(CREATE_ROW);
        node.setData(null);
        break;
      // case 'serverSide':
      //   const storeType = api.getServerSideStoreState()[0]?.type;
      //   if (storeType === 'full') {
      //     const transaction = api.applyServerSideTransaction({ add: [createRowData] });
      //     const node = transaction?.add[0];
      //     if (node) {
      //       node.setRowSelectable(false);
      //       node.setId(CREATE_ROW);
      //       node.setData(null);
      //     }
      //   } else {
      //     console.warn(`Doesn't work for rowModelType: ${type} ${storeType}`);
      //   }
      //   break;
      default:
        console.warn(`Doesn't work for rowModelType: ${type}`);
        break;
    }
  }

  @HostListener('cellValueChanged', ['$event'])
  rowEditingStarted(event: CellValueChangedEvent) {
    this.dirtyColumns.push(event.column);
  }

  /** Saves data to BE etc */
  @HostListener('rowValueChanged', ['$event'])
  rowValueChanged(event: RowValueChangedEvent) {
    const { api, columnApi, context, data, node } = event;
    if (node.id === CREATE_ROW && this.dirtyColumns.length > 0) {
      const { entitySchema, formGroup } = context as AgGridContext;
      // TODO: save changes to backend...
      this.snackBar.open('TODO: save changes to backend...');
      // Temp: add a random id. Should come from backend...
      const saveObj = {
        ...data,
        [entitySchema?.idField]: Math.round(Math.random() * 1000),
      };
      this.dirtyColumns.push(entitySchema.idField);
      const transaction = api.applyTransaction({ add: [saveObj] });
      // Flash dirty cells
      api.flashCells({ rowNodes: transaction.add, columns: this.dirtyColumns });
      // Reset CREATE_ROW
      node.setData(null);
      const columns = columnApi.getAllDisplayedColumns();
      const firstEditColumn = columns.find((c) => c.isCellEditable(node));
      api.clearRangeSelection();
      api.setFocusedCell(node.rowIndex, firstEditColumn);
      node.setRowSelectable(false);
    }
  }

  @HostListener('rowEditingStopped')
  rowEditingStopped() {
    this.dirtyColumns = [];
  }
}
