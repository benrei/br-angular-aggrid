import { AgGridServerSideRoutes } from './../../../pages/ag-grid-server-side/ag-grid-server-side.routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, Routes } from '@angular/router';
import { MenuModule } from '../../menu/menu.module';
import { ToolbarModule } from '../../toolbar/toolbar.module';
import { HomeRoutes } from '../../../pages/home-page/home.routes';
import { OtherRoutes } from '../../../pages/other-page/other.routes';
import { AgGridRoutes } from '../../../pages/ag-grid-page/ag-grid.routes';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      ...HomeRoutes,
      ...OtherRoutes,
      ...AgGridRoutes,
      ...AgGridServerSideRoutes,
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MenuModule,
    RouterModule.forChild(routes),
    ToolbarModule,
  ],
  declarations: [MainLayoutComponent],
})
export class MainLayoutModule {}
