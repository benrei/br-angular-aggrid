import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { AgGridWrapperComponent } from './components/ag-grid-wrapper/ag-grid-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
    // AgGridExtentionModule,
    // AgGridFilterPanelModule,
    // AgGridToolbarModule,
  ],
  declarations: [AgGridWrapperComponent, AddButtonComponent],
  exports: [
    AgGridWrapperComponent
    // AgGridExtentionModule,
    // AgGridFilterPanelModule,
    // AgGridToolbarModule,
  ],
  bootstrap: []
})
export class AgGridWrapperModule {}
