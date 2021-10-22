import { IEditorBase } from '../editor.base';

// interface AutocompleteBase extends ICellEditorBase {
interface AutocompleteBase extends IEditorBase {
  /** Fields to display in cellEditor */
  displayFields?: string[];
  /** The dropdown panels width */
  panelWidth?: number;
  /** Used in valueGetter and valueFormatter to map data between grid row and cellEditor */
  path?: string;
  /** Default: `static` */
  type?: 'static' | 'datasource' | 'external';
  /** Often same as `colDef.field` */
  valueField?: string;
}
export interface AutocompleteStatic extends AutocompleteBase {
  items: any[];
}
export interface AutocompleteDatasource extends AutocompleteBase {
  /** Default: `100` */
  cacheBlockSize?: number;
  filterModel?: any;
  gridSearch?: string;
  sortModel?: any[];
  /** Default: `partial` */
  storeType?: 'partial' | 'full';
  /** Database table */
  table: string;
}
// TODO: implement
export interface AutocompleteExternal extends AutocompleteBase {
  url: '';
}

export type AutocompleteEditorParams =
  | AutocompleteStatic
  | AutocompleteDatasource;
