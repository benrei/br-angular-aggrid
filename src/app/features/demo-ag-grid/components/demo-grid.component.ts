import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { GridOptionsService } from '../../grid/ag-grid-extention/services/grid-options.service';
import { AgGridContext } from '../../grid/interfaces/ag-grid-context';
import { DemoGridColumns } from './demo-grid.columns';
import filters from './filters';
import rowData from './rowData';
import { dataSchema } from './../../../core/models/data-schema.model';
import { DbTable } from '../../../core/enums/tables.enum';

@Component({
  selector: 'app-demo-grid',
  templateUrl: './demo-grid.component.html',
  styleUrls: ['./demo-grid.component.css'],
})
export class DemoGridComponent implements OnInit {
  entitySchema = dataSchema[DbTable.Cars];
  columnDefs: ColDef[];
  gridOptions: GridOptions;
  filters = filters;
  rowData = rowData;
  constructor(
    private columns: DemoGridColumns,
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
    };
  }
}
