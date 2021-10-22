import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-cell-renderer-checkbox',
  template: `
    <mat-checkbox
      *ngIf="isChecked"
      [checked]="isChecked"
      [disabled]="disabled"
    ></mat-checkbox>
  `,
})
export class CheckboxRenderer implements ICellRendererAngularComp {
  disabled = true;
  isChecked: boolean;

  agInit(params: ICellRendererParams): void {
    this.isChecked = params.value as boolean;
  }

  refresh(): boolean {
    return false;
  }
}
