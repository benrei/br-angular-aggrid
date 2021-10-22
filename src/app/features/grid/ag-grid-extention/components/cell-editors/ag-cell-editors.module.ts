import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IMaskModule } from 'angular-imask';
import { EditorsModule } from '../../../../../shared/editors/editors.module';
import { AgGridLookupCellEditor } from './ag-grid-lookup.cell-editor';
import { CheckboxCellEditor } from './checkbox.cell-editor';
import { DateCellEditor } from './date.cell-editor';
import { NumberCellEditor } from './number.cell-editor';
import { TextCellEditor } from './text.cell-editor';

@NgModule({
  imports: [
    EditorsModule,
    CommonModule,
    FormsModule,
    IMaskModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AgGridLookupCellEditor,
    CheckboxCellEditor,
    DateCellEditor,
    NumberCellEditor,
    TextCellEditor,
  ],
  exports: [
    EditorsModule,
    AgGridLookupCellEditor,
    CheckboxCellEditor,
    DateCellEditor,
    NumberCellEditor,
    TextCellEditor,
  ],
  entryComponents: [
    AgGridLookupCellEditor,
    CheckboxCellEditor,
    DateCellEditor,
    NumberCellEditor,
    TextCellEditor,
  ],
})
export class AgCellEditorsModule {}
