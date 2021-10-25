import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-angular';
import { NumberEditor } from '../../../../../shared/editors/number.editor';

import { CellEditorBase } from './cell-editors.base';

@Component({
  selector: 'app-cell-editor-number',
  template: `
    <app-number-editor
      [control]="formControl"
      [params]="params"
    ></app-number-editor>
  `,
  styles: [],
})
export class NumberCellEditor
  extends CellEditorBase
  implements AgEditorComponent, AfterViewInit
{
  @ViewChild(NumberEditor) editor: NumberEditor;
  constructor() {
    super();
  }

  ngAfterViewInit() {
    if (this.params.cellStartedEdit) {
      setTimeout(() => {
        this.editor.input.element.nativeElement.focus();
        if (!this.params.charPress) {
          this.editor.input.element.nativeElement.select();
        }
      });
    }
  }

  focusIn?() {
    this.editor.input.element.nativeElement.focus();
    this.editor.input.element.nativeElement.select();
  }
  getValue = () => this.formControl.value && Number(this.formControl.value);
}
