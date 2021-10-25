import { DemoGridComponent } from './../../features/demo-ag-grid/components/demo-grid.component';
import { DetailViewModule } from './../../features/detail-view/detail-view.module';
import { TabNavigationModule } from './../../features/tab-navigation/tab-navigation.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridExtentionModule } from '../../features/grid/ag-grid-extention/ag-grid-extention.module';
import { DemoAgGridModule } from '../../features/demo-ag-grid/demo-ag-grid.module';
import { AgGridPage } from './components/ag-grid-page/ag-grid.page';
import { AgGridDetailViewComponent } from './components/ag-grid-detail-view/ag-grid-detail-view.component';

@NgModule({
  imports: [
    AgGridExtentionModule,
    CommonModule,
    DemoAgGridModule,
    DetailViewModule,
    TabNavigationModule,
    RouterModule.forChild([
      {
        path: '',
        component: AgGridPage,
        children: [
          {
            path: ':id',
            component: AgGridDetailViewComponent,
            children: [
              {
                path: 'firstTab',
                component: DemoGridComponent,
                children: [
                  {
                    path: ':id',
                    // component: DemoGridComponent,
                  },
                ],
              },
              {
                path: 'secondTab',
                // component: YourComponent
              },
              {
                path: 'thirdTab',
                // component: YourComponent
              },
              {
                path: 'fourthTab',
                // component: YourComponent
              },
            ],
          },
        ],
      },
    ]),
  ],
  declarations: [AgGridPage, AgGridDetailViewComponent],
})
export class AgGridPageModule {}
