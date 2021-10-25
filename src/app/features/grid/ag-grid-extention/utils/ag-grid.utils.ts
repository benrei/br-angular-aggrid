import { FormControl, FormGroup } from '@angular/forms';
import { AgGridEvent, ColDef, GridApi, RowNode } from 'ag-grid-community';

export class AgGridUtils {
  /** Creates a FormGroup with FormControl's having `colDef.field` as key, if colDef has a cellEditor*/
  static createFormGroup(colDefs: ColDef[]): FormGroup {
    const controls = this.createControls(colDefs);
    return new FormGroup(controls);
  }

  static createControls(colDefs: ColDef[]) {
    let controls: { [field: string]: FormControl } = {};
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

  static focusFirstCell({ api, columnApi }: AgGridEvent, index = 0) {
    api.setFocusedCell(index, columnApi.getAllDisplayedColumns()[0]);
  }

  static prevIndex = (index: number): number => (index > 0 ? index - 1 : index);

  static nextIndex = (index: number, api: GridApi): number => {
    return api.getLastDisplayedRow() > index ? index + 1 : index;
  };

  static selectFirstRow({ api }: AgGridEvent) {
    const node = api.getDisplayedRowAtIndex(0);
    // Must have an id to be able to select
    if (node?.id) {
      api.clearRangeSelection();
      node?.setSelected(true, true);
    }
  }

  static getRowNodeWithFocus(api: GridApi) {
    return api.getDisplayedRowAtIndex(api.getFocusedCell()?.rowIndex);
  }

  static getRowNodeByEntityId(api: GridApi, id: string, idField?: string) {
    let rowNode: RowNode;
    if (idField) {
      api.forEachNode((node) => {
        const entityId = node.data?.[idField || 'id'];
        if (entityId === id || entityId === Number(id)) {
          rowNode = node;
        }
      });
    }
    return rowNode;
  }
}
