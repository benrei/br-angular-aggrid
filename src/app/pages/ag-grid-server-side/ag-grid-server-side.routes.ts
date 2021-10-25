import { Routes } from '@angular/router';

export const AgGridServerSideRoutes: Routes = [
  {
    path: 'ag-grid-server-side',
    loadChildren: () =>
      import('./ag-grid-server-side-page.module').then(
        (m) => m.AgGridServerSidePageModule
      ),
  },
];
