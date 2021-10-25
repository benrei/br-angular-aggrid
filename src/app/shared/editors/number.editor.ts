import { EditorBase, IEditorBase } from './editor.base';
import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-number-editor',
  template: `
    <input
      #input
      #tooltipRef="matTooltip"
      [formControl]="control"
      [imask]="params.mask"
      [matTooltip]="tooltip"
      [placeholder]="placeholder"
      [style.background]="control.errors ? '#f3c8c7' : 'none'"
      [unmask]="true"
    />
  `,
  styles: [
    'input {height: 100%; width:100%; padding: 0 11px; text-align: right; box-sizing: border-box;}',
  ],
})
export class NumberEditor extends EditorBase {
  @Input() control: FormControl;
  @Input() params: NumberEditorParams;

  @ViewChild('input', { read: ViewContainerRef }) input: ViewContainerRef;
  constructor() {
    super();
  }
}

export interface NumberEditorParams extends IEditorBase {
  /** See more: https://imask.js.org/guide.html */
  mask?: object | any;
}
