import { NumberEditorParams } from './../../../shared/editors/number.editor';
import { AgGridLookupEditorParams } from './../../../shared/editors/ag-grid-lookup/ag-grid-lookup.models';
import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgGridLookupCellEditor } from '../../grid/ag-grid-extention/components/cell-editors/ag-grid-lookup.cell-editor';
import { ColumnType } from '../../grid/ag-grid-extention/enums/column-type.enum';
import { Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class DemoGridColumns {
  constructor() {}

  createColumns(): ColDef[] {
    const columns: ColDef[] = [
      {
        field: 'id',
        type: ColumnType.Id,
      },
      {
        field: 'brand',
        // type: [ColumnTypes.Autocomplete]
        type: ColumnType.Text,
      },
      {
        field: 'model',
        type: ColumnType.Text,
        cellEditorFramework: AgGridLookupCellEditor,
        cellEditorParams: {
          colDefs: [{ field: 'id' }, { field: 'model' }],
          rowData: [
            { id: 1, model: 'Corolla' },
            { id: 2, model: 'Celica' },
          ],
          valueField: 'model',
        } as AgGridLookupEditorParams,
      },
      {
        field: 'regDate',
        type: ColumnType.Date,
      },
      {
        field: 'price',
        type: ColumnType.NumberDecimal,
        cellEditorParams: {
          validators: [Validators.required],
        } as NumberEditorParams,
      },
      {
        field: 'damaged',
        type: ColumnType.Checkbox,
      },
    ];
    return columns;
  }
}
