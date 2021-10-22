import { ColDef } from 'ag-grid-community';
import { TextEditorParams } from './../../../../shared/editors/text.editor';
import { ElementBase } from './element.base';

export class TextboxElement extends ElementBase {
  mask?: any;
  type: string;
  constructor(columnDef: ColDef) {
    super(columnDef);
    const cellEditorParams = columnDef.cellEditorParams as TextEditorParams;
    // this.mask = cellEditorParams?.mask;
    this.type = 'text';
    // this.controlType = ControlType.Textbox;
  }
}
