import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Layouts are defined in features/layouts
 * * Main-layout: Toolbar and sidenav
 * Child routes for each layout are defined inn the corresponding module
 */
export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/layouts/main-layout/main-layout.module').then(
        m => m.MainLayoutModule
      )
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/error/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
