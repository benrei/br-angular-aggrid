import { AgGridUtils } from './../utils/ag-grid.utils';
import { Directive, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellPosition,
  NavigateToNextCellParams,
  SuppressKeyboardEventParams,
  TabToNextCellParams,
} from 'ag-grid-community';
import { AgGridContext } from '../../interfaces/ag-grid-context';
import { Keyboard } from '../enums/keyboard.enum';

/** Ag-grid navigation CW
 *
 * Specs: https://contracting.atlassian.net/wiki/spaces/C/pages/1586397185/AG+Grid+navigation
 */
@Directive({ selector: 'ag-grid-angular' })
export class AgGridNavigationDirective implements OnInit {
  context: AgGridContext;

  constructor(private agGrid: AgGridAngular) {}

  ngOnInit() {
    const { defaultColDef, gridOptions } = this.agGrid;
    this.context = this.agGrid.context || gridOptions.context;
    const defColDef = defaultColDef || gridOptions.defaultColDef;
    defColDef.suppressKeyboardEvent = suppressKeyboardEvent;
    this.agGrid.tabToNextCell = this.tabToNextCell;
    this.agGrid.navigateToNextCell = this.navigateToNextCell;
  }

  /** Overriding the default behaviour for Tab key when a cell is focused
   * - Checks `formGroup.invalid` before navigation to next row
   * - Sets focus on next editable cell after successful rowEdit
   */
  tabToNextCell = (params: TabToNextCellParams): CellPosition => {
    const { formGroup } = this.context;
    const { api, backwards, columnApi } = params;

    const { nextCellPosition, previousCellPosition } = params;

    if (nextCellPosition?.rowIndex !== previousCellPosition.rowIndex) {
      const columns = columnApi.getAllDisplayedColumns();
      if (formGroup.invalid) {
        const [errorField] = Object.entries(formGroup.controls).find(
          ([, val]) => val.invalid
        );
        const errorColumn = columns.find(
          (c) => c.getColDef().field === errorField
        );
        return { ...previousCellPosition, column: errorColumn };
      } else {
        api.stopEditing();
        // Set new focus right after returned CellPosition
        setTimeout(() => {
          const prevIndex = previousCellPosition.rowIndex;
          const node = api.getDisplayedRowAtIndex(prevIndex);
          const nextColumn = backwards
            ? [...columns].reverse().find((c) => c.isCellEditable(node))
            : columns.find((c) => c.isCellEditable(node));
          const { rowIndex } = nextCellPosition;
          api.clearRangeSelection();
          api.setFocusedCell(rowIndex, nextColumn);
        });
        return previousCellPosition;
      }
    }
    return nextCellPosition;
  };

  /** Overriding the default behaviour for (arrow) key(s) when a cell is focused */
  navigateToNextCell = (params: NavigateToNextCellParams): CellPosition => {
    const { event, nextCellPosition, previousCellPosition } = params;
    if (!nextCellPosition) {
      const cols = this.agGrid.columnApi.getAllDisplayedColumns();
      const { column, rowIndex } = previousCellPosition;
      const nextCellPos = { column, rowIndex } as CellPosition;
      switch (event.key) {
        case Keyboard.ArrowLeft:
          const nextCol = cols[cols.length > 1 ? cols.length - 1 : 0];
          nextCellPos.column = rowIndex > 0 ? nextCol : column;
          nextCellPos.rowIndex = rowIndex > 0 ? rowIndex - 1 : rowIndex;
          break;
        case Keyboard.ArrowRight:
          const lastIndex = this.agGrid.api.getLastDisplayedRow();
          nextCellPos.column = lastIndex > rowIndex ? cols[0] : column;
          nextCellPos.rowIndex = lastIndex > rowIndex ? rowIndex + 1 : rowIndex;
          break;
      }
      return nextCellPos;
    }
    return nextCellPosition;
  };
}

const suppressKeyboardEvent = (params: SuppressKeyboardEventParams) => {
  // Keydown fires first and for all keys, skip other events as 'keypress'
  if (params.event.type !== 'keydown') {
    return false;
  }

  const { api, column, columnApi, colDef, context, event, node } = params;
  const { shiftKey } = event;
  const { deleteFn, suppressKey } = context as AgGridContext;
  const isEditing = params.editing || api.getEditingCells().length > 0;

  // Check context.suppressKey for keys to suppress
  const extraSuppressKey = Object.entries(suppressKey || {}).find(
    ([key]) => key === event.key
  );
  if (extraSuppressKey) {
    const [_, suppressFn] = extraSuppressKey;
    return suppressFn(params);
  }

  let suppress = false;
  switch (event.key) {
    case Keyboard.ArrowUp:
      if (isEditing) {
        api.stopEditing();
        api.setFocusedCell(AgGridUtils.nextIndex(node.rowIndex, api), column);
      }
      break;
    case Keyboard.ArrowDown:
      if (isEditing) {
        api.stopEditing();
        api.setFocusedCell(AgGridUtils.prevIndex(node.rowIndex), column);
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
        event.preventDefault();
        shiftKey ? api.tabToPreviousCell() : api.tabToNextCell();
      } else {
        if (node.isRowPinned()) suppress = true;
      }
      break;
    case Keyboard.Escape:
      suppress = true;
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
      break;
    case Keyboard.Tab:
      if (isEditing) {
        suppress = true;
        event.preventDefault();
        shiftKey ? api.tabToPreviousCell() : api.tabToNextCell();
      } else {
        event.preventDefault();
        const columns = columnApi.getAllDisplayedColumns();
        const nextEditableColumn = shiftKey
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
      break;
  }
  return suppress;
};
