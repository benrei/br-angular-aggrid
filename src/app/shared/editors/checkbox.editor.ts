import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EditorBase, IEditorBase } from './editor.base';

@Component({
  selector: 'app-checkbox-editor',
  template: `
    <input
      #input
      #tooltipRef="matTooltip"
      type="checkbox"
      [formControl]="control"
      [matTooltip]="tooltip"
      [placeholder]="placeholder"
      [style.background]="control.errors ? '#f3c8c7' : 'none'"
    />
  `,
  styles: ['input {height: 75%; width:80%;}'],
})
export class CheckboxEditor extends EditorBase {
  @Input() control: FormControl;
  @Input() params: CheckboxEditorParams;

  @ViewChild('input', { read: ViewContainerRef }) input: ViewContainerRef;
  constructor() {
    super();
  }
}

export interface CheckboxEditorParams extends IEditorBase {}
