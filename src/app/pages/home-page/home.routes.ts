import { Routes } from '@angular/router';

export const HomeRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home-page.module').then(m => m.HomePageModule)
  }
];
