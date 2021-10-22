import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EditorBase, IEditorBase } from './editor.base';

@Component({
  selector: 'app-date-editor',
  template: `
    <input
      #input
      [formControl]="control"
      [matTooltip]="tooltip"
      [placeholder]="placeholder"
      [type]="params.type || 'date'"
    />
  `,
  styles: ['div,input{height: 100%; width:100%;} input{padding: 0 4px; box-sizing: border-box;}'],
})
export class DateEditor extends EditorBase {
  @Input() control: FormControl;
  @Input() params: DateEditorParams;

  @ViewChild('input', { read: ViewContainerRef }) input: ViewContainerRef;
  constructor() {
    super();
  }
}

export interface DateEditorParams extends IEditorBase {
  /** date | datetime-local */
  type?: string;
}
