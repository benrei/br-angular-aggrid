// import { ElementOptions } from '@app/models/generic/dynamic-form';
import { FormControl } from '@angular/forms';
import { AgEditorComponent } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { IEditorBase } from '../../../../../shared/editors/editor.base';

export class CellEditorBase implements AgEditorComponent {
  params: ICellEditorParams & IEditorBase;
  /** Holds the cellEditors value, validators etc.. */
  formControl = new FormControl({});
  constructor() {}

  agInit(params: ICellEditorParams): void {
    const { charPress, colDef, context, value } = params;
    this.params = params;
    this.formControl = context.formGroup.controls[colDef.field];
    const inputValue = charPress ? charPress : value;
    this.formControl.setValue(inputValue);
    this.formControl.markAsTouched();
  }

  getValue = () => this.formControl.value;
  isCancelAfterEnd = () => !!this.formControl.errors;
}
