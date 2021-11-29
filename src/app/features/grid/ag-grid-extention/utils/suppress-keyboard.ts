import { SuppressKeyboardEventParams } from 'ag-grid-community';
import { AgGridUtils } from './ag-grid.utils';

export const SuppressKeyboard = {
  arrowDown: (params: SuppressKeyboardEventParams): boolean => {
    const { api, column, node } = params;
    const isEditing = params.editing || api.getEditingCells().length > 0;
    if (isEditing) {
      api.stopEditing();
      api.setFocusedCell(AgGridUtils.prevIndex(node.rowIndex), column);
    }
    return false;
  },
  arrowUp: (params: SuppressKeyboardEventParams): boolean => {
    const { api, column, node } = params;
    const isEditing = params.editing || api.getEditingCells().length > 0;
    if (isEditing) {
      api.stopEditing();
      api.setFocusedCell(AgGridUtils.nextIndex(node.rowIndex, api), column);
    }
    return false;
  },
  delete: (params: SuppressKeyboardEventParams): boolean => {
    const { api, context, node } = params;
    const isEditing = params.editing || api.getEditingCells().length > 0;
    let suppress = false;
    if (!isEditing && context) {
      context?.deleteFn(node.data);
      suppress = true;
    }
    return suppress;
  },
  enter: (params: SuppressKeyboardEventParams): boolean => {
    const { api, event, node } = params;
    const isEditing = params.editing || api.getEditingCells().length > 0;
    let suppress = false;
    if (isEditing) {
      event.preventDefault();
      event.shiftKey ? api.tabToPreviousCell() : api.tabToNextCell();
      suppress = true;
    } else {
      if (node.isRowPinned()) suppress = true;
    }
    return suppress;
  },

  escape: (params: SuppressKeyboardEventParams): boolean => {
    const { api, colDef, event, node } = params;
    const isEditing = params.editing || api.getEditingCells().length > 0;
    event.stopPropagation(); // Stops sidesheet from being closed
    if (isEditing) {
      api.stopEditing(true); // Stops edit mode even if cell/column isn't editable.
      api.setFocusedCell(node.rowIndex, colDef.field); // Add focus after
    } else {
      // Master row expanded and master row selected
      if (node.expanded) {
        node.setExpanded(false);
      }
    }
    return true;
  },
  tab: (params: SuppressKeyboardEventParams): boolean => {
    const { api, columnApi, event, node } = params;
    const isEditing = params.editing || api.getEditingCells().length > 0;
    let suppress = false;
    if (isEditing) {
      suppress = true;
      event.preventDefault();
      event.shiftKey ? api.tabToPreviousCell() : api.tabToNextCell();
    } else {
      event.preventDefault();
      const columns = columnApi.getAllDisplayedColumns();
      const nextEditableColumn = event.shiftKey
        ? columns.find((c) => c.isCellEditable(node))
        : columns.find((c) => c.isCellEditable(node));
      if (nextEditableColumn) {
        suppress = true;
        api.setFocusedCell(node.rowIndex, nextEditableColumn.getColId());
        api.startEditingCell({
          colKey: nextEditableColumn.getColId(),
          rowIndex: node.rowIndex,
          rowPinned: node.rowPinned,
        });
      }
    }
    return suppress;
  },

  // key: (params: SuppressKeyboardEventParams): boolean => {
  //     const { api, colDef, column, context, event, node } = params;
  //     const isEditing = params.editing || api.getEditingCells().length > 0;
  //     return false;
  // };
};
