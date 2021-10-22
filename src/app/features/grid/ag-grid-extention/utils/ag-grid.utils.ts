import { FormControl, FormGroup } from '@angular/forms';
import { ColDef } from 'ag-grid-community';

export class AgGridUtils {
  static createFormGroup(colDefs: ColDef[]): FormGroup {
    const controls = this.createControls(colDefs);
    return new FormGroup(controls);
  }
  static createControls(colDefs: ColDef[]) {
    let controls = {} as any;
    colDefs
      .filter((colDef) => !!(colDef.cellEditor || colDef.cellEditorFramework))
      .forEach((colDef) => {
        let validators = colDef.cellEditorParams?.validators || [];
        /** Using `field` since it's unique and directly linked to the data */
        const key = colDef.field;
        if (key) controls[key] = new FormControl('', validators);
      });
    return controls;
  }
}
