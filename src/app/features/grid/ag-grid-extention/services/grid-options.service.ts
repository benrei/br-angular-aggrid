import { Injectable } from '@angular/core';
import { GridOptions, NavigateToNextCellParams } from 'ag-grid-community';
import { CellPosition, ColumnApi, GridApi } from 'ag-grid-community';
import { EntitySchema } from '../../../../core/interfaces/entity-schema';
import { Keyboard } from '../enums/keyboard.enum';
import { ColumnTypesService } from './column-types.service';
import { DefaultColDefService } from './default-col-def.service';

@Injectable()
export class GridOptionsService {
  api: GridApi;
  columnApi: ColumnApi;
  constructor(
    private columnTypes: ColumnTypesService,
    private defaultColDefService: DefaultColDefService
  ) {}

  core(entitySchema: EntitySchema): GridOptions {
    return {
      columnTypes: this.columnTypes.columnTypes(),
      context: { entitySchema },
      defaultColDef: this.defaultColDefService.getColDefDefaults(),
      enableCharts: true,
      enableRangeHandle: true,
      enableRangeSelection: true,
      frameworkComponents: {},
      navigateToNextCell: this.navigateToNextCell,
      onGridReady: ({ api, columnApi }) => {
        this.api = api;
        this.columnApi = columnApi;
      },
      rowSelection: 'single',
      sideBar: { toolPanels: ['columns', 'filters'] },
      suppressCopyRowsToClipboard: true,
    };
  }

  // Helper functions
  navigateToNextCell = (params: NavigateToNextCellParams): CellPosition => {
    const { event, nextCellPosition, previousCellPosition } = params;
    if (!nextCellPosition) {
      const cols = this.columnApi.getAllDisplayedColumns();
      const { column, rowIndex } = previousCellPosition;
      const nextCellPos = { column, rowIndex } as CellPosition;
      switch (event.key) {
        case Keyboard.ArrowLeft:
          const nextCol = cols[cols.length > 1 ? cols.length - 1 : 0];
          nextCellPos.column = rowIndex > 0 ? nextCol : column;
          nextCellPos.rowIndex = rowIndex > 0 ? rowIndex - 1 : rowIndex;
          break;
        case Keyboard.ArrowRight:
          const lastIndex = this.api.getLastDisplayedRow();
          nextCellPos.column = lastIndex > rowIndex ? cols[0] : column;
          nextCellPos.rowIndex = lastIndex > rowIndex ? rowIndex + 1 : rowIndex;
          break;
      }
      return nextCellPos;
    }
    return nextCellPosition;
  };
}
