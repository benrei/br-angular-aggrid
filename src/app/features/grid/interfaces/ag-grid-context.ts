import { FormGroup } from '@angular/forms';
// import { EntitySchema } from '@core/models/data-schema.model';

export interface AgGridContext {
  //datasource?: DatasourceCwService;
  // datasource?: DatasourceScService;
  // entitySchema?: EntitySchema;
  /** Holds data in cellEditors. And determine if a cell is: editable or navigatable */
  formGroup?: FormGroup;
  hasExternalAddButton?: boolean;
  isPasting?: boolean;
}
