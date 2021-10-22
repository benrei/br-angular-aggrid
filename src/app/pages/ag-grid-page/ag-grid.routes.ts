import { Routes } from '@angular/router';

export const AgGridRoutes: Routes = [
  {
    path: 'ag-grid',
    loadChildren: () =>
      import('./ag-grid-page.module').then(m => m.AgGridPageModule)
  }
];
