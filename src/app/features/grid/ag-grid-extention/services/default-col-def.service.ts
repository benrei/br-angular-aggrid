import { AgGridContext } from './../../interfaces/ag-grid-context';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ColDef, SuppressNavigableCallbackParams } from 'ag-grid-community';

@Injectable({ providedIn: 'root' })
export class DefaultColDefService {
  constructor() {}
  // TODO: create a CRUD service and use `deleteFn` from there
  getColDefDefaults(): ColDef {
    return {
      enableCellChangeFlash: true,
      enableRowGroup: true,
      // floatingFilter: true,
      resizable: true,
      sortable: true,
      suppressNavigable: suppressNavigable,
      width: 140,
    };
  }
}

// Helper functions
const suppressNavigable = (params: SuppressNavigableCallbackParams) => {
  const { api, colDef, column, context, node } = params;
  const { formGroup } = context as AgGridContext;
  // Suppress for not editable cells while editing
  if (api.getEditingCells().length !== 0 && formGroup) {
    const formControl = formGroup.controls[colDef.field] as FormControl;
    return !column.isCellEditable(node) || formControl.disabled;
  }
  return false;
};
