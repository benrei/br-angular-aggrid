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
import { SuppressKeyboard } from '../utils/suppress-keyboard';

/** Ag-grid navigation
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
    defColDef.suppressKeyboardEvent = this.suppressKeyboardEvent;
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
      const cols = params.columnApi.getAllDisplayedColumns();
      const { column, rowIndex } = previousCellPosition;
      const nextCellPos = { column, rowIndex } as CellPosition;
      switch (event.key) {
        case Keyboard.ArrowLeft:
          const nextCol = cols[cols.length > 1 ? cols.length - 1 : 0];
          nextCellPos.column = rowIndex > 0 ? nextCol : column;
          nextCellPos.rowIndex = rowIndex > 0 ? rowIndex - 1 : rowIndex;
          break;
        case Keyboard.ArrowRight:
          const lastIndex = params.api.getLastDisplayedRow();
          nextCellPos.column = lastIndex > rowIndex ? cols[0] : column;
          nextCellPos.rowIndex = lastIndex > rowIndex ? rowIndex + 1 : rowIndex;
          break;
      }
      return nextCellPos;
    }
    return nextCellPosition;
  };

  /** Allows the user to suppress certain keyboard events in the grid cell */
  suppressKeyboardEvent = (params: SuppressKeyboardEventParams) => {
    // Keydown fires first and for all keys, skip other events as 'keypress'
    if (params.event.type !== 'keydown') {
      return false;
    }
    const { suppressKeyboard } = params.context as AgGridContext;

    // Check context.suppressKeyboard for keys to suppress
    const suppressKey = Object.entries(suppressKeyboard || {}).find(
      ([key]) => key === params.event.key
    );
    if (suppressKey) {
      const [_, suppressKeyboardFn] = suppressKey;
      return suppressKeyboardFn(params);
    }

    let suppress = false;
    switch (params.event.key) {
      case Keyboard.ArrowUp:
        suppress = SuppressKeyboard.arrowUp(params);
        break;
      case Keyboard.ArrowDown:
        suppress = SuppressKeyboard.arrowDown(params);
        break;
      case Keyboard.Delete:
        suppress = SuppressKeyboard.delete(params);
        break;
      case Keyboard.Enter:
        suppress = SuppressKeyboard.enter(params);
        break;
      case Keyboard.Escape:
        suppress = SuppressKeyboard.escape(params);
        break;
      case Keyboard.Tab:
        suppress = SuppressKeyboard.tab(params);
        break;
    }
    return suppress;
  };
}
