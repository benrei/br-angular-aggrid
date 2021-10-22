import { ColDef, GridOptions, IServerSideDatasource } from 'ag-grid-community';
import { IEditorBase } from '../editor.base';

export interface AgGridLookupEditorParams extends IEditorBase {
  colDefs: ColDef[];
  dataSource?: IServerSideDatasource;
  gridOptions?: GridOptions;
  rowData?: any[];
  valueField: string;
}
