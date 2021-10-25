import { AgGridContext } from './../../interfaces/ag-grid-context';
import { Directive, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AgGridEvent,
  CellFocusedEvent,
  ModelUpdatedEvent,
  RowNode,
} from 'ag-grid-community';
import { CREATE_ROW } from '../constants';
import RouteUtils from '../../../../core/utils/route.utils';
import { AgGridUtils } from '../utils/ag-grid.utils';

/** Handles selection and focus for these agGrid events:
 * `firstDataRendered`, `filterChanged`, `sortChanged`, `cellFocused`
 *
 * Documentation: https://contracting.atlassian.net/wiki/spaces/C/pages/2086830081/Grid+specification#Selection-and-focus
 */
@Directive({ selector: 'ag-grid-angular [eventSelection]' })
export class AgGridEventSelectionDirective {
  /** Holds `event` types in a stack. Used to determine which event triggered `modelUpdated`.
   * We wouldn't need this stack and `modelUpdated` if all **Row Models** where client side.
   * But **Row Models** using datasource lazy-load RowNodes after the `event` is triggered.
   * And selection/focus would have been lost before the model was updated.
   */
  agGridEventsStack: string[] = [];
  lastCellFocusedIndex: number;

  constructor(private agGrid: AgGridAngular, private route: ActivatedRoute) {}

  @HostListener('firstDataRendered', ['$event'])
  onFirstDataRendered(params: AgGridEvent) {
    if (params.api.getModel().getType() === 'clientSide') {
      this.handleFirstDataRendered(params);
    } else {
      this.agGridEventsStack.push(params.type);
    }
  }

  @HostListener('filterChanged', ['$event'])
  @HostListener('sortChanged', ['$event'])
  onUpdateStack({ api, type }: AgGridEvent) {
    this.agGridEventsStack.push(type);
    if (api.getModel().getType() !== 'clientSide') {
      // Some events for Row Models using datasource triggers `modelUpdated` twice,
      // these needs to be added to the stack twice.
      switch (type) {
        case 'filterChanged':
          this.agGridEventsStack.push(type);
          break;
        case 'sortChanged':
          this.agGridEventsStack.push(type);
          break;
      }
    }
  }
  @HostListener('modelUpdated', ['$event'])
  onModelUpdated(params: ModelUpdatedEvent) {
    const type = this.agGridEventsStack.shift();
    switch (type) {
      case 'firstDataRendered':
        this.handleFirstDataRendered(params);
        break;
      case 'filterChanged':
        AgGridUtils.selectFirstRow(params);
        break;
      case 'sortChanged':
        AgGridUtils.selectFirstRow(params);
        AgGridUtils.focusFirstCell(params);
        break;
    }
  }

  /** Selects row on `cellFocused` */
  @HostListener('cellFocused', ['$event'])
  onCellFocused({ api, rowIndex }: CellFocusedEvent) {
    const { gridOptions, rowSelection } = this.agGrid;
    const selectionType = rowSelection || gridOptions.rowSelection;
    if (this.lastCellFocusedIndex !== rowIndex && selectionType === 'single') {
      this.selectRowNode(api.getDisplayedRowAtIndex(rowIndex));
    }
    this.lastCellFocusedIndex = rowIndex;
  }

  private selectRowNode(node: RowNode) {
    if (node.id && !node.isRowPinned()) {
      node.id === CREATE_ROW
        ? this.agGrid.api.deselectAll()
        : node?.setSelected(true, true);
    }
  }

  private handleFirstDataRendered(params: AgGridEvent) {
    const idFromUrl = RouteUtils.getEntityId(this.route);
    console.log(idFromUrl);
    if (idFromUrl) {
      const { api, context, gridOptions } = this.agGrid;
      const gridContext = (context || gridOptions.context) as AgGridContext;
      const { idField } = gridContext.entitySchema || {};
      const node = AgGridUtils.getRowNodeByEntityId(api, idFromUrl, idField);
      node?.setSelected(true, true);
      AgGridUtils.focusFirstCell(params, node.rowIndex);
    } else {
      AgGridUtils.selectFirstRow(params);
      AgGridUtils.focusFirstCell(params);
    }
  }
}
