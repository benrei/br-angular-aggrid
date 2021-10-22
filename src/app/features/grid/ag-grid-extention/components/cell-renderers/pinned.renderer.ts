import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-cell-renderer-pinned',
  template: `<input [value]="params.value || ''" />`,
  styles: ['input {height: 90%; width:100%; box-sizing: border-box;}']
})
export class PinnedRenderer implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }
}
