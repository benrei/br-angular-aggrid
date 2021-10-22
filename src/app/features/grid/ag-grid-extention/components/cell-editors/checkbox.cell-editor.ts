import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-angular';
import { CheckboxEditor } from '../../../../../shared/editors/checkbox.editor';

import { CellEditorBase } from './cell-editors.base';

@Component({
  selector: 'app-cell-editor-checkbox',
  template: ` <app-checkbox-editor [control]="formControl" [params]="params"></app-checkbox-editor> `,
  styles: [],
})
export class CheckboxCellEditor extends CellEditorBase implements AgEditorComponent, AfterViewInit {
  @ViewChild(CheckboxEditor) editor: CheckboxEditor;
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
    // this.editor.input.element.nativeElement.select();
  }
}
