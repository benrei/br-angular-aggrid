import { ColDef } from 'ag-grid-community';
import { ElementBase } from './element.base';

export class CheckboxElement extends ElementBase {
  constructor(columnDef: ColDef) {
    super(columnDef);
    // this.controlType = ControlType.Textbox;
  }
}
