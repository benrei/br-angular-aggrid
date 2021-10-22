import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-angular';
import { TextEditor } from '../../../../../shared/editors/text.editor';

import { CellEditorBase } from './cell-editors.base';

@Component({
  selector: 'app-ag-cell-editor-text',
  template: ` <app-text-editor [control]="formControl" [params]="params"></app-text-editor> `,
  styles: [],
})
export class TextCellEditor extends CellEditorBase implements AgEditorComponent, AfterViewInit {
  @ViewChild(TextEditor) editor: TextEditor;
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
}
