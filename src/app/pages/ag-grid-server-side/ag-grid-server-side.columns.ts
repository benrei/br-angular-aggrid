import { AgGridLookupEditorParams } from './../../shared/editors/ag-grid-lookup/ag-grid-lookup.models';
import { ColumnType } from './../../features/grid/ag-grid-extention/enums/column-type.enum';
import { AgGridLookupCellEditor } from './../../features/grid/ag-grid-extention/components/cell-editors/ag-grid-lookup.cell-editor';

import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Injectable({ providedIn: 'root' })
export class AgGridServerSideColumns {
  constructor() {}

  createColumns(): ColDef[] {
    const columns: ColDef[] = [
      {
        field: 'customerId',
        type: ColumnType.Id,
      },
      {
        field: 'name',
        type: ColumnType.Text,
      },
    ];
    return columns;
  }
}
