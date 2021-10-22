import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsModule } from './components/actions/actions.module';
import { AgGridModule } from 'ag-grid-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridToolbarComponent } from './components/ag-grid-toolbar/ag-grid-toolbar.component';
import { ToolbarDialogComponent } from './components/toolbar-dialog.component';
import { AgGridToolbarSearchComponent } from './components/ag-grid-toolbar-search/ag-grid-toolbar-search.component';

@NgModule({
  imports: [
    ActionsModule,
    CommonModule,
    // DynamicFormModule,
    AgGridModule.withComponents([]),
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  declarations: [
    AgGridToolbarComponent,
    ToolbarDialogComponent,
    AgGridToolbarSearchComponent
  ],
  exports: [AgGridToolbarComponent, ToolbarDialogComponent],
  entryComponents: [ToolbarDialogComponent]
})
export class AgGridToolbarModule {}
