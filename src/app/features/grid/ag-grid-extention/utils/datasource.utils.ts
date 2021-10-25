export default class DatasourceUtils {
  static createServerSideDatasource(server) {
    return {
      getRows: function (params) {
        console.log('[Datasource] - rows requested by grid: ', params.request);
        const response = server.getData(params.request);
        setTimeout(function () {
          if (response.success) {
            params.success({ rowData: response.rows });
          } else {
            params.fail();
          }
        }, 500);
      },
    };
  }
  static createFakeServer(allData) {
    return {
      getData: function (request) {
        const requestedRows = allData.slice();
        return {
          success: true,
          rows: requestedRows,
        };
      },
    };
  }
}
