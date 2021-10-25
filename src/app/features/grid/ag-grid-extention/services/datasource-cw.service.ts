import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IServerSideDatasource,
  IServerSideGetRowsParams,
  IServerSideGetRowsRequest,
} from 'ag-grid-community';

@Injectable()
export class DatasourceCwService {
  globalFilter?: string;
  public totalCount = 0;

  constructor(private http: HttpClient) {}

  createDatasource(table: string): IServerSideDatasource {
    if (!localStorage.token)
      console.warn(`localStorage.token: ${localStorage.token}`);
    return {
      getRows: (params: IServerSideGetRowsParams) => {
        const { columnApi } = params;
        const request = params.request as GetRowsRequest;
        request.table = table;

        // Only set cols if group fully expanded
        const columns = columnApi.getAllColumns();
        const fields = columns
          .filter((o) => !o.isRowGroupActive())
          .map((o) => o.getColDef())
          .filter((o) => o.field && !o.aggFunc)
          .map((o) => o.field);
        const extraFields = columns
          .map((o) => o.getColDef())
          .filter((c) => c.cellEditorParams?.extraFields)
          .map((c) => c.cellEditorParams.extraFields);
        const flatExtraFields = [].concat.apply([], extraFields);
        const uniqueFields = [...fields, ...flatExtraFields].filter(onlyUnique);
        if (request.groupKeys.length === request.rowGroupCols.length) {
          request.cols = uniqueFields.map((field) => ({ field }));
        }
        if (this.globalFilter) {
          request.gridSearch = this.globalFilter;
          request.gridSearchFields = uniqueFields.join(';');
        }
        // console.log(request);
        // delete request.filterModel;
        // delete request.groupKeys;
        delete request.pivotCols;
        delete request.pivotMode;
        // delete request.rowGroupCols
        delete request.valueCols;

        const URL =
          'https://contracting-test-clientapi-aggrid.azurewebsites.net/client/a-anonymisert/Rows/GetRows';
        const options = {
          headers: { Authorization: localStorage.token },
        };
        this.http
          .post(URL, params.request, options)
          .pipe(take(1))
          .subscribe((response: any) => {
            // console.log(response);
            const { data, lastRow, totalCount } = response;
            if (data) {
              // const data = utils.unflattenMany(response.data);
              params.success({
                rowData: data,
                rowCount: lastRow,
              });
              this.totalCount = totalCount;
            } else {
              params.fail();
            }
          });
      },
    };
  }
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
interface GetRowsRequest extends IServerSideGetRowsRequest {
  cols: any[];
  gridSearch?: string;
  gridSearchFields?: string;
  table: string;
}
interface GetRowsRespons {
  data: any[];
  lastRow: number;
  totalCount: number;
}
