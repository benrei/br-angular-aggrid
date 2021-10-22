import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { AgGridLookupEditor } from './ag-grid-lookup.editor';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridDialogComponent } from './components/ag-grid-dialog/ag-grid-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  declarations: [AgGridLookupEditor, AgGridDialogComponent],
  entryComponents: [AgGridDialogComponent], // only for stackblitz
  exports: [AgGridLookupEditor],
})
export class AgGridLookupModule {}
