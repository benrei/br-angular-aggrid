import { Routes } from '@angular/router';

export const OtherRoutes: Routes = [
  {
    path: 'other',
    loadChildren: () =>
      import('./other-page.module').then(m => m.OtherPageModule)
  }
];
