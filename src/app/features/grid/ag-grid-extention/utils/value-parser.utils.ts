import { ValueParserParams } from 'ag-grid-community';

export class ValueParserUtils {
  static number = ({ newValue }: ValueParserParams) => Number(newValue);
}
