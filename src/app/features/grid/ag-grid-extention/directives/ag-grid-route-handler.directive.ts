import { filter, map, takeUntil } from 'rxjs/operators';
import { AgGridContext } from '../../interfaces/ag-grid-context';
import { Directive, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RowSelectedEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { Subject } from 'rxjs';
import { CREATE_ROW } from '../constants';
import { AgGridUtils } from '../utils/ag-grid.utils';
import RouteUtils from '../../../../core/utils/route.utils';

/** Updates route on selection */
@Directive({ selector: 'ag-grid-angular [routeHandler]' })
export class AgGridRouteHandlerDirective implements OnInit, OnDestroy {
  private unsubscribeAll$ = new Subject<void>();
  constructor(
    private agGrid: AgGridAngular,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    const { context, gridOptions } = this.agGrid;
    const gridContext = (context || gridOptions.context) as AgGridContext;
    const { idField } = gridContext.entitySchema || {};

    this.router.events
      .pipe(
        takeUntil(this.unsubscribeAll$),
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => route.firstChild)
      )
      .subscribe((route: ActivatedRoute) => {
        const { api, columnApi } = this.agGrid;
        const id = route ? RouteUtils.getEntityId(route) : null;
        if (!id) {
          api.deselectAll();
          return;
        }
        const selectedNode = api.getSelectedNodes()?.[0];
        let node = AgGridUtils.getRowNodeByEntityId(api, id, idField);
        if (selectedNode?.id !== node?.id) {
          node.setSelected(true, true);
          const firstColumn = columnApi.getAllDisplayedColumns()[0];
          api.clearRangeSelection();
          api.setFocusedCell(node.rowIndex, firstColumn);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }

  /** Selects row on `cellFocused` */
  @HostListener('rowSelected', ['$event'])
  rowSelected(event: RowSelectedEvent) {
    const { node } = event;
    node.isSelected() ? this.onRowSelected(event) : this.onRowDeselected(event);
  }

  private onRowSelected({ context, node }: RowSelectedEvent) {
    const { entitySchema } = context as AgGridContext;
    const idRow = node.data[entitySchema?.idField || 'id'];
    const idUrl = RouteUtils.getEntityId(this.activatedRoute);
    if (idUrl) {
      const path = this.activatedRoute.routeConfig.path;
      this.router.navigateByUrl(
        this.router.url.replace(`${path}/${idUrl}`, `${path}/${idRow}`)
      );
    } else {
      this.router.navigate([idRow], { relativeTo: this.activatedRoute });
    }
  }

  private onRowDeselected({ api, rowIndex }: RowSelectedEvent) {
    const focusedNode = AgGridUtils.getRowNodeWithFocus(api);
    if (focusedNode.rowIndex === rowIndex || focusedNode.id === CREATE_ROW) {
      this.router.navigate(['.'], { relativeTo: this.activatedRoute });
    }
  }
}
