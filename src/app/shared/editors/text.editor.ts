import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EditorBase } from './editor.base';

@Component({
  selector: 'app-text-editor',
  template: `
    <input
      #input
      #tooltipRef="matTooltip"
      [formControl]="control"
      [matTooltip]="tooltip"
      [placeholder]="placeholder"
      [style.background]="control.errors ? '#f3c8c7' : 'none'"
    />
  `,
  styles: ['input {height: 100%; width:100%; padding: 0 11px; box-sizing: border-box;}'],
})
export class TextEditor extends EditorBase {
  @Input() control: FormControl;
  @Input() params: TextEditorParams;

  @ViewChild('input', { read: ViewContainerRef }) input: ViewContainerRef;
  constructor() {
    super();
  }
}

export interface TextEditorParams extends EditorBase {}
