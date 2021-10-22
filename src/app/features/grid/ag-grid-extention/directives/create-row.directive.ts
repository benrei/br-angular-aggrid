import { Directive, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgGridAngular } from 'ag-grid-angular';
import { AgGridEvent, RowNode } from 'ag-grid-community';
import { CREATE_ROW } from '../constants';

/** Adds a bottom `CREATE_ROW` for agGrid */
@Directive({
  selector: 'ag-grid-angular[createRow]',
})
export class CreateRowDirective implements OnInit {
  constructor(private agGrid: AgGridAngular, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.agGrid.postSort = (rowNodes: [RowNode]) => {
      for (let i = 0; i < rowNodes.length; i++) {
        if (rowNodes[i].id === CREATE_ROW) {
          rowNodes.splice(rowNodes.length - 1, 0, rowNodes.splice(i, 1)[0]);
        }
      }
    };
  }
  @HostListener('rowDataChanged', ['$event'])
  onRowDataChanged({ api }: AgGridEvent) {
    const type = api.getModel().getType();
    api.applyServerSideTransaction;
    console.log('rowDataChanged');
    switch (type) {
      case 'clientSide':
        const result = api.applyTransaction({
          add: [{ [CREATE_ROW]: true }],
        });
        const node = result.add[0];
        node.setId(CREATE_ROW.toString());
        break;
      case 'serverSide':
        const storeType = api.getServerSideStoreState()[0]?.type;
        if (storeType === ServerSideStoreType.Full) {
          const result = api.applyServerSideTransaction({
            add: [{ [CREATE_ROW]: true }],
          });
          const node = result.add[0];
          node.setId(CREATE_ROW.toString());
        } else {
          console.warn(`Doesn't work for rowModelType: ${type} ${storeType}`);
        }
        break;
      default:
        console.warn(`Doesn't work for rowModelType: ${type}`);
        break;
    }
  }
  @HostListener('rowEditingStopped', ['$event'])
  rowEditingEnded(event: RowEditingStoppedEvent) {
    const { api, columnApi, context, data, node } = event;
    const { formGroup } = context as AgGridContext;
    if (formGroup.dirty && node.id === CREATE_ROW) {
      // Temp: adds a random id
      data.id = Math.round(Math.random() * 1000);
      // TODO: save changes to backend...
      this.snackBar.open('TODO: save changes to backend...');
      const result = api.applyTransaction({ add: [data] });
      api.flashCells({ rowNodes: result.add });
      // Reset CREATE_ROW
      node.setData(null);
      setTimeout(() => {
        const cols = columnApi.getAllDisplayedColumns();
        api.setFocusedCell(node.rowIndex, cols[0]);
      });
      formGroup.reset();
      formGroup.enable();
    }
  }
}
