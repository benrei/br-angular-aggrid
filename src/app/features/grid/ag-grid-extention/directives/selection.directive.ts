import { Directive, HostListener } from '@angular/core';
import { AgGridEvent } from 'ag-grid-community';

/** Selects first row */
@Directive({ selector: 'ag-grid-angular' })
export class SelectionDirective {
  @HostListener('firstDataRendered', ['$event'])
  selectRowNode({ api }: AgGridEvent) {
    const nodes = api.getRenderedNodes();
    nodes?.find((n) => n).setSelected(true, true, true);
  }
}
