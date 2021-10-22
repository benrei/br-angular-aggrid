import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-angular';
import { DateEditor } from '../../../../../shared/editors/date.editor';

import { CellEditorBase } from './cell-editors.base';

@Component({
  selector: 'app-cell-editor-date',
  template: ` <app-date-editor [control]="formControl" [params]="params"></app-date-editor> `,
  styles: [],
})
export class DateCellEditor extends CellEditorBase implements AgEditorComponent, AfterViewInit {
  @ViewChild(DateEditor) editor: DateEditor;
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

  getValue = () => {
    return this.params.value !== this.formControl.value ? this.formControl.value : this.params.value;
  };
}
