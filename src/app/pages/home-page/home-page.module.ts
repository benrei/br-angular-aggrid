import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { RouterModule } from '@angular/router';
import { EditorsModule } from '../../shared/editors/editors.module';
import { AutocompleteDatasourceService } from './../../shared/editors/autocomplete/autocomplete-datasource.service';

@NgModule({
  imports: [
    CommonModule,
    EditorsModule,
    RouterModule.forChild([{ path: '', component: HomePage }])
  ],
  declarations: [HomePage],
  providers: [AutocompleteDatasourceService]
})
export class HomePageModule {}
