import { Component, OnInit, Input } from '@angular/core';
import {
  ColumnApi,
  GridApi,
  GridReadyEvent,
  RowSelectedEvent,
} from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { take } from 'rxjs/operators';
import { AgGridContext } from '../../../interfaces/ag-grid-context';

@Component({
  selector: 'app-ag-grid-wrapper-toolbar',
  templateUrl: './ag-grid-toolbar.component.html',
  styleUrls: ['./ag-grid-toolbar.component.scss'],
})
export class AgGridToolbarComponent implements OnInit {
  gridApi: GridApi;
  columnApi: ColumnApi;
  context: AgGridContext;
  @Input() agGrid: AgGridAngular;
  @Input() showDefaultActions = true;
  rowSelectedParams: RowSelectedEvent;

  constructor() {}

  ngOnInit() {}
  ngAfterContentInit() {
    this.context = this.agGrid?.context || this.agGrid?.gridOptions?.context;
    this.agGrid?.gridReady
      .pipe(take(1))
      .subscribe(({ api, columnApi }: GridReadyEvent) => {
        this.gridApi = api;
        this.columnApi = columnApi;
      });
  }
}
