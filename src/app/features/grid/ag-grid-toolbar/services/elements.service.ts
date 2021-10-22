import { DateCellEditor } from '../../ag-grid-extention/components/cell-editors/date.cell-editor';
import { TextCellEditor } from '../../ag-grid-extention/components/cell-editors/text.cell-editor';
import { NumberCellEditor } from '../../ag-grid-extention/components/cell-editors/number.cell-editor';
import { CheckboxElement } from '../element-mappers/checkbox.element';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Column } from 'ag-grid-community';
import { ElementBase } from '../element-mappers/element.base';
import { SpaceElement } from '../element-mappers/space.element';
import { TextboxElement } from '../element-mappers/textbox.element';
import { CheckboxCellEditor } from '../../ag-grid-extention/components/cell-editors/checkbox.cell-editor';

@Injectable({ providedIn: 'root' })
export default class ElementsService {
  constructor() {}

  toFormGroup(elements: ElementBase[]): FormGroup {
    let controls = {};
    elements.forEach((element) => {
      let validators = element?.validators || [];
      controls[element.key] = new FormControl('', validators);
    });
    return new FormGroup(controls);
  }

  createFormElementsFromColumns(columns: Column[]) {
    let formElements = [];
    columns?.forEach((column) => {
      const colDef = column.getColDef();
      const editor = colDef.cellEditorFramework;

      switch (editor) {
        case TextCellEditor:
        case NumberCellEditor:
          formElements.push(new TextboxElement(colDef));
          break;
        case DateCellEditor:
          formElements.push();
          break;
        // case DropdownEditor:
        //   formElements.push(new DropdownElement(colDef));
        //   break;
        case CheckboxCellEditor:
          formElements.push(new CheckboxElement(colDef));
          break;
        default:
          console.warn(`[CW] missing Element for: ${editor}`);
          formElements.push(new TextboxElement(colDef));
          break;
      }
      if (colDef.cellEditorParams?.formSpacing?.colSpanAfter) {
        formElements.push(new SpaceElement(colDef.cellEditorParams.formSpacing));
      }
    });
    return formElements;
  }
}
