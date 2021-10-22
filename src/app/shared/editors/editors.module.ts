import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextEditor } from './text.editor';
import { IMaskModule } from 'angular-imask';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AutocompleteEditor } from './autocomplete/autocomplete.editor';
import { NumberEditor } from './number.editor';
import { DateEditor } from './date.editor';
import { CheckboxEditor } from './checkbox.editor';
import { MaterialExtentionModule } from '../material-extention/material-extention.module';
import { AgGridLookupModule } from './ag-grid-lookup/ag-grid-lookup.module';

@NgModule({
  imports: [
    AgGridLookupModule,
    CommonModule,
    FormsModule,
    IMaskModule,
    MatAutocompleteModule,
    MaterialExtentionModule,
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
  declarations: [AutocompleteEditor, CheckboxEditor, DateEditor, NumberEditor, TextEditor],
  exports: [AgGridLookupModule, AutocompleteEditor, CheckboxEditor, DateEditor, NumberEditor, TextEditor],
})
export class EditorsModule {}
