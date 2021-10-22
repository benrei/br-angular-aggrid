import { ValidatorFn } from '@angular/forms';
// import { ControlType } from '@app/models/generic/dynamic-form';
import { ColDef } from 'ag-grid-community';
import { ElementBase } from './element.base';

export class DropdownElement extends ElementBase {
  constructor(columnDef: ColDef) {
    super(columnDef);
    // this.controlType = ControlType.Dropdown;
  }
}
