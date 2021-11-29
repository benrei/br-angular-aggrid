import { EntitySchema } from './../../../core/interfaces/entity-schema';
import { FormGroup } from '@angular/forms';
import { SuppressKeyboardEventParams } from 'ag-grid-community';

export interface AgGridContext {
  //datasource?: DatasourceCwService;
  // datasource?: DatasourceScService;
  /** Entity schema for data in grid */
  entitySchema?: EntitySchema;
  /** Holds `formControls` for cellEditors. Also used to determine if a cell is: editable or navigatable while editing */
  formGroup?: FormGroup;
  /** */
  routerPath?: string;
  /** Suppress keyboard keydown event for `key`
   * @example
   * ```
   * context.suppressKey = {
   *   'Escape': (params: SuppressKeyboardEventParams)=>{
   *     if(params.editing){
   *       params.api.stopEditing(true)
   *       return true;
   *     }
   *   }
   * }
   * ```
   */
  suppressKeyboard?: {
    [key: string]: (params: SuppressKeyboardEventParams) => boolean;
  };
  /** A function to create a new entity */
  createFn?(data: any): any;
  /** A function to update an entity */
  updateFn?(id: string | number, row: any): any;
  /** A function to delete an entity */
  deleteFn?(id: string | number): boolean;
}
