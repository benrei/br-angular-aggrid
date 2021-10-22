import { AgGridContext } from './../../interfaces/ag-grid-context';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  ColDef,
  Column,
  SuppressKeyboardEventParams,
  SuppressNavigableCallbackParams,
} from 'ag-grid-community';
import { Keyboard } from '../enums/keyboard.enum';

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
      suppressKeyboardEvent: suppressKeyboardEvent,
      suppressNavigable: suppressNavigable,
      width: 140,
    };
  }
}

// Helper functions

// Navigation specs: https://contracting.atlassian.net/wiki/spaces/C/pages/1586397185/AG+Grid+navigation
const suppressKeyboardEvent = (params: SuppressKeyboardEventParams) => {
  const { api, columnApi, colDef, context, event, node } = params;
  const { key, shiftKey } = event;
  const { deleteFn, formGroup } = context as AgGridContext;
  const isEditing = params.editing || api.getEditingCells().length > 0;
  let suppress = false;
  switch (key) {
    case Keyboard.ArrowUp:
      if (isEditing) {
        navigate(Navigate.Up, params);
      }
      break;
    case Keyboard.ArrowDown:
      if (isEditing) {
        navigate(Navigate.Down, params);
      }
      break;
    case Keyboard.Delete:
      if (!isEditing) {
        switch (api.getModel().getType()) {
          case 'clientSide':
            api.applyTransaction({ remove: [node.data] });
            break;
        }
        deleteFn(node.data);
        suppress = true;
      }
      break;
    case Keyboard.Enter:
      if (isEditing) {
        suppress = true;
        if (shiftKey) {
          navigate(Navigate.Left, params);
        } else {
          navigate(Navigate.Right, params);
        }
      } else {
        event.preventDefault();
        if (node.isRowPinned()) suppress = true;
      }
      break;
    case Keyboard.Escape:
      suppress = true;
      event.stopPropagation(); // Stops sidesheet from being closed
      if (isEditing) {
        formGroup.reset();
        api.stopEditing(true); // Stops edit mode even if cell/column isn't editable.
        api.setFocusedCell(node.rowIndex, colDef.field); // Add focus after
      } else {
        // Master row expanded and master row selected
        if (node.expanded) {
          node.setExpanded(false);
        }
      }
      break;
    case Keyboard.Tab:
      if (isEditing) {
        suppress = true;
        if (shiftKey) {
          navigate(Navigate.Left, params);
        } else {
          navigate(Navigate.Right, params);
        }
      } else {
        event.preventDefault();
        const cols = columnApi.getAllDisplayedColumns();
        const editableCol = shiftKey
          ? [...cols].reverse().find((c) => c.isCellEditable(node))
          : cols.find((c) => c.isCellEditable(node));
        if (editableCol) {
          suppress = true;
          api.setFocusedCell(node.rowIndex, editableCol.getColId());
          api.startEditingCell({
            colKey: editableCol.getColId(),
            rowIndex: node.rowIndex,
            rowPinned: node.rowPinned,
          });
        }
      }
      break;
  }
  return suppress;
};

enum Navigate {
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
  Up = 'Up',
}
const navigate = (direction: Navigate, params: SuppressKeyboardEventParams) => {
  const { api, column, columnApi, event, node, context } = params;
  const { formGroup } = context as AgGridContext;
  const { rowIndex } = node;
  event.preventDefault();

  const cols = columnApi.getAllDisplayedColumns();
  const navigateTo = (index: number, nextColumn: Column) => {
    api.stopEditing();
    api.clearRangeSelection();
    api.setFocusedCell(index - 1, nextColumn);
    api.setFocusedCell(index, nextColumn);
  };

  let nextIndex: number;
  switch (direction) {
    case Navigate.Up:
      if (formGroup.invalid) {
        navigateToErrorCell(params);
      } else {
        nextIndex = rowIndex > 0 ? rowIndex - 1 : rowIndex;
        navigateTo(nextIndex, column);
      }
      break;
    case Navigate.Down:
      if (formGroup.invalid) {
        navigateToErrorCell(params);
      } else {
        const lastIndex = api.getLastDisplayedRow();
        nextIndex = lastIndex > rowIndex ? rowIndex + 1 : rowIndex;
        navigateTo(nextIndex, column);
      }
      break;
    case Navigate.Right:
      const lastCol = [...cols].reverse().find((c) => c.isCellEditable(node));
      if (lastCol.getColId() === column.getColId()) {
        if (formGroup.invalid) {
          navigateToErrorCell(params);
        } else {
          const columns = columnApi.getAllDisplayedColumns();
          const firstEditable = columns.find((c) => c.isCellEditable(node));
          const lastIndex = api.getLastDisplayedRow();
          nextIndex = lastIndex > rowIndex ? rowIndex + 1 : rowIndex;
          navigateTo(nextIndex, firstEditable);
        }
      } else {
        api.tabToNextCell();
      }
      break;
    case Navigate.Left:
      const firstCol = cols.find((c) => c.isCellEditable(node));
      if (firstCol.getColId() === column.getColId()) {
        if (formGroup.invalid) {
          navigateToErrorCell(params);
        } else {
          const columns = [...columnApi.getAllDisplayedColumns()].reverse();
          const lastEditable = columns.find((c) => c.isCellEditable(node));
          nextIndex = rowIndex > 0 ? rowIndex - 1 : rowIndex;
          navigateTo(nextIndex, lastEditable);
        }
      } else {
        api.tabToPreviousCell();
      }
      break;
  }
};

const navigateToErrorCell = (params: SuppressKeyboardEventParams) => {
  const { api, column, columnApi, context, node } = params;
  const { formGroup } = context as AgGridContext;
  const [errorField] = Object.entries(formGroup.controls).find(
    ([, val]) => val.invalid
  );
  const errorColumn = columnApi
    .getAllDisplayedColumns()
    .find((c) => c.getColDef().field === errorField);
  if (column.getColId() !== errorColumn.getColId()) {
    if (api.getCellRanges()) api.clearRangeSelection();
    api.setFocusedCell(node.rowIndex, errorColumn, node.rowPinned);
  }
};

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
