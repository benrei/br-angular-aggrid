import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ColDef, EditableCallbackParams } from 'ag-grid-community';
import { NumberEditorParams } from '../../../../shared/editors/number.editor';
import { AgGridContext } from '../../interfaces/ag-grid-context';
import { CheckboxCellEditor } from '../components/cell-editors/checkbox.cell-editor';
import { DateCellEditor } from '../components/cell-editors/date.cell-editor';
import { NumberCellEditor } from '../components/cell-editors/number.cell-editor';
import { TextCellEditor } from '../components/cell-editors/text.cell-editor';
import { CheckboxRenderer } from '../components/cell-renderers/checkbox.renderer';
import { CREATE_ROW } from '../constants';
import { ColumnType } from '../enums/column-type.enum';
import { ValueFormatterUtils } from '../utils/value-formatter.utils';

@Injectable({ providedIn: 'root' })
export class ColumnTypesService {
  constructor() {}

  columnTypes = (): { [name: string]: ColDef } => ({
    [ColumnType.Checkbox]: {
      cellEditorFramework: CheckboxCellEditor,
      cellRendererFramework: CheckboxRenderer,
      cellStyle: { 'text-align': 'center' },
      editable: editable,
      filter: 'agSetColumnFilter',
      width: 50
    },
    [ColumnType.Date]: {
      cellEditorFramework: DateCellEditor,
      cellEditorParams: { type: 'date' },
      editable: editable,
      filter: 'agDateColumnFilter',
      floatingFilter: true,
      valueFormatter: ValueFormatterUtils.dateStrToDateStr,
      width: 120
      // valueGetter: ({ colDef, data }) => {
      //   const date = data && data[colDef.field];
      //   if (date) {
      //     return typeof date === 'string' ? moment(date) : null;
      //   }
      // },
      // valueSetter: ({ data, colDef, newValue }) => {
      //   data[colDef.field] = moment(newValue).format('YYYY/MM/DD');
      //   console.log('data', data);
      //   return true;
      // }
    },
    [ColumnType.DateTime]: {
      cellEditorFramework: DateCellEditor,
      cellEditorParams: { type: 'datetime-local' },
      editable: editable,
      filter: 'agDateColumnFilter',
      floatingFilter: true,
      valueFormatter: ValueFormatterUtils.dateTime,
      width: 180
    },
    [ColumnType.Hidden]: {
      lockVisible: true,
      hide: true
    },
    [ColumnType.Id]: {
      editable: false,
      width: 55
    },
    [ColumnType.Number]: {
      ...numberEditor,
      cellEditorParams: {
        mask: { mask: Number, scale: 0, thousandsSeparator: ' ' }
      } as NumberEditorParams,
      valueFormatter: ValueFormatterUtils.number
    },
    [ColumnType.NumberDecimal]: {
      ...numberEditor,
      cellEditorParams: {
        mask: {
          mapToRadi: ['.', ','],
          mask: Number,
          radix: ',',
          scale: 2,
          thousandsSeparator: ' '
        }
      } as NumberEditorParams,
      valueFormatter: ValueFormatterUtils.numberDecimal
    },
    [ColumnType.NumberInt]: {
      ...numberEditor,
      cellEditorParams: {
        mask: { mask: Number, scale: 0 }
      } as NumberEditorParams
    },
    // [ColumnType.Status]: {
    //   headerName: 'General.Status',
    //   field: 'sys_RowState',
    //   resizable: false,
    //   maxWidth: 30,
    //   filter: null
    //   // cellRendererFramework: StatusCellComponent,
    // },
    [ColumnType.Text]: {
      cellEditorFramework: TextCellEditor,
      editable: editable,
      filter: 'agTextColumnFilter',
      floatingFilter: true
    }
  });
}

const editable = (params: EditableCallbackParams) => {
  const { colDef, context, node } = params;
  const { formGroup } = context as AgGridContext;
  if (node && node.isRowPinned() && node.id !== CREATE_ROW) return false;
  const formControl = formGroup.controls[colDef.field] as FormControl;
  return formControl && !formControl.disabled;
};

const numberEditor = {
  cellEditorFramework: NumberCellEditor,
  editable: editable,
  cellStyle: { 'text-align': 'right' },
  filter: 'agNumberColumnFilter',
  floatingFilter: true
};
