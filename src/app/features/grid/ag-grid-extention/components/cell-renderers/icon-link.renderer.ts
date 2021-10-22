import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

/** Clickable icon, opens url coming from the cell `value` */
@Component({
  selector: 'app-cell-renderer-icon-link',
  template: `
    <a *ngIf="params.value" href="{{ params.value }}" target="_blank">
      <mat-icon>{{ params.icon }}</mat-icon>
    </a>
  `,
})
export class IconLinkRenderer implements ICellRendererAngularComp {
  params: CellRendererParams;

  agInit(params: CellRendererParams): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }
}

type CellRendererParams = IconLinkRendererParams & ICellRendererParams;
export interface IconLinkRendererParams {
  icon?: string;
}
