import { Component, Input } from '@angular/core';

/**
 * Usage
 * ng-content: <mat-icon matTooltip="Your tooltip text..">your_icon</mat-icon>
 */
@Component({
  selector: 'app-time-reg-action',
  template: `
    <button *ngIf="actionFn" mat-icon-button (click)="actionFn()">
      <ng-content></ng-content>
    </button>
  `,
})
export class CustomAction {
  @Input() actionFn;
}
