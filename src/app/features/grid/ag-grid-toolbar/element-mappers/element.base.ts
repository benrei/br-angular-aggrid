import { ValidatorFn } from '@angular/forms';
// import { ControlType } from '@app/models/generic/dynamic-form';
import { ColDef } from 'ag-grid-community';
import { IEditorBase } from '../../../../shared/editors/editor.base';
export class ElementBase {
  // changeFn?: (form: FormGroup) => any;
  colspan?: number;
  // controlType?: ControlType;
  hidden?: boolean;
  ignoreInRequest?: boolean;
  key?: string;
  label?: string;
  placeholder?: string;
  // rows?: number;
  rowspan?: number;
  value?: any;
  validators?: ValidatorFn[];
  validationMessages?: { [key: string]: () => string };
  // TODO: add more properties...
  constructor(colDef: ColDef) {
    const cellEditorParams: IEditorBase = colDef.cellEditorParams;
    const formElement = cellEditorParams?.formElement || {};
    // this.changeFn = columnDef.cellEditorParams?.formElementOptions?.changeFn;
    this.colspan = formElement?.formSpacing?.colSpan || 12;
    this.hidden = formElement?.hideInForm;
    this.ignoreInRequest = colDef?.cellEditorParams?.ignoreInRequest;
    if (!colDef.field && !colDef.colId) {
      console.warn(
        '[CW] cannot set `element.key`, missing colDef.field || colDef.colId'
      );
    }
    this.key = colDef.field || colDef.colId;
    this.label = colDef.headerName;
    this.placeholder = cellEditorParams?.placeholder || '';
    // this.rows = formElement?.rows;
    this.rowspan = formElement?.rowSpan || 1;
    this.validators = cellEditorParams?.validators;
    this.validationMessages = cellEditorParams?.validationMessages;
  }
}
