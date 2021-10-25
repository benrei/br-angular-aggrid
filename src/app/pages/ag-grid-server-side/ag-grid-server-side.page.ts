import { DatasourceCwService } from './../../features/grid/ag-grid-extention/services/datasource-cw.service';
import { GridOptionsService } from './../../features/grid/ag-grid-extention/services/grid-options.service';
import { DbTable } from './../../core/enums/tables.enum';
import { dataSchema } from './../../core/models/data-schema.model';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { AgGridServerSideColumns } from './ag-grid-server-side.columns';
import filters from './filters';
@Component({
  selector: 'app-ag-grid-page',
  templateUrl: './ag-grid-server-side.page.html',
})
export class AgGridServerSidePage implements OnInit {
  entitySchema = dataSchema[DbTable.Cars];
  columnDefs: ColDef[];
  gridOptions: GridOptions;
  filters = filters;
  constructor(
    private columns: AgGridServerSideColumns,
    private datasource: DatasourceCwService,
    private gridOptionsService: GridOptionsService
  ) {}

  ngAfterViewInit(): void {
    // const { formGroup } = this.gridOptions.context as AgGridContext;
    // formGroup.controls['brand'].disable();
    // formGroup.controls['model'].disable();
  }
  rowSelected(event) {
    // console.log(event.node.id);
  }

  ngOnInit(): void {
    this.columnDefs = this.columns.createColumns();
    this.gridOptions = {
      ...this.gridOptionsService.core(this.entitySchema),
      rowModelType: 'serverSide',
      serverSideStoreType: 'partial',
      serverSideDatasource: this.datasource.createDatasource('customers'),
    };
  }
  onGridReady({ api }: GridReadyEvent) {
    // setTimeout(() => {
    //   this.rowData = [this.rowData[0], ...this.rowData];
    //   api.setRowData(this.rowData);
    // }, 2000);
    // setTimeout(() => {
    //   this.rowData = [this.rowData[0], ...this.rowData];
    //   api.setRowData(this.rowData);
    // }, 4000);
  }
}
