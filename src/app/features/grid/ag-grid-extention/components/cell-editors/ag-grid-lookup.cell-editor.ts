import { AgGridLookupEditor } from './../../../../../shared/editors/ag-grid-lookup/ag-grid-lookup.editor';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-angular';

import { CellEditorBase } from './cell-editors.base';

@Component({
  selector: 'app-cell-editor-number',
  template: `<app-ag-grid-lookup [control]="formControl" [params]="params"></app-ag-grid-lookup>`,
  styles: [],
})
export class AgGridLookupCellEditor extends CellEditorBase implements AgEditorComponent, AfterViewInit {
  @ViewChild(AgGridLookupEditor) editor: AgGridLookupEditor;
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
