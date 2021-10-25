import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AutocompleteDatasource,
  AutocompleteEditorParams,
} from './autocomplete.models';

@Injectable()
export class AutocompleteDatasourceService {
  globalFilter?: string;
  public totalCount = 0;

  constructor(private http: HttpClient) {}

  getRows(request: AutocompleteRequest): Observable<GetRowsRespons> {
    const URL =
      'https://contracting-test-clientapi-aggrid.azurewebsites.net/client/a-anonymisert/Rows/GetRows';
    const options = {
      headers: { Authorization: localStorage.token },
    };
    request.filterModel = request.filterModel || {};
    request.filterModel.sys_Deactivated = {
      filterType: 'text',
      filter: 'true',
      type: 'notEqual',
    };

    return this.http.post(URL, request, options) as Observable<GetRowsRespons>;
  }
}

interface GetRowsRespons {
  data: any[];
  lastRow: number;
  totalCount: number;
}

export class AutocompleteRequest implements AutocompleteDatasource {
  cacheBlockSize?: number;
  filterModel?: any;
  gridSearch?: string;
  sortModel?: any[];
  storeType?;
  table: string;
  // Fields under is only needed within the request
  cols: any[];
  endRow?: number;
  groupKeys = [];
  gridSearchFields: string;
  rowGroupCols = [];
  startRow?: number;
  constructor(params: AutocompleteEditorParams) {
    const autocomplete = params as AutocompleteDatasource;
    if (!autocomplete.displayFields) {
      console.warn("'displayFields' is required");
    } else if (!autocomplete.valueField) {
      console.warn("'valueField' is required");
    } else if (!autocomplete.table) {
      console.warn("'table' is required");
    }
    this.cacheBlockSize = autocomplete.cacheBlockSize || 100;
    this.cols = [
      ...autocomplete.displayFields.map((field) => ({ field })),
      { field: autocomplete.valueField },
    ];
    this.filterModel = autocomplete.filterModel || {};
    this.gridSearch = autocomplete.gridSearch;
    this.gridSearchFields = this.cols.map((c) => c.field).join(';');
    this.sortModel = autocomplete.sortModel || [];
    this.storeType = autocomplete.storeType || 'partial';
    this.table = autocomplete.table;
    if (this.storeType === 'partial') {
      this.endRow = 0;
      this.startRow = 0;
    }
  }
}
