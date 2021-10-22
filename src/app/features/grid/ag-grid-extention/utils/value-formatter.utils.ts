import { ValueFormatterParams } from "ag-grid-community";

export class ValueFormatterUtils {
  static number = ({ value }: ValueFormatterParams): string =>
    value?.toLocaleString('no').replace('−', '-') || '';

  static numberDecimal = ({ value }: ValueFormatterParams): string =>
  value
    ?.toLocaleString('no', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    .replace('−', '-') || // Replace long minus(−) to normal minus (-)
  '';

  /** Formatter `2011-05-05T07:30:00` => `05.05.2011` */
  static dateToDateStr = ({ value }: ValueFormatterParams): string =>
    value instanceof Date
      ? value.toLocaleDateString('no', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      : '';
  /** Formatter `2011-05-05T07:30:00` => `05.05.2011` */
  static dateStrToDateStr = ({ value }: ValueFormatterParams): string =>
    value && typeof value === 'string'
      ? new Date(value).toLocaleDateString('no', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      : '';

  /** value `2011-05-05T07:30:00` => `05.05.2011, 07:30` */
  static dateTime = ({ value }: ValueFormatterParams): string =>
    value && typeof value === 'string'
      ? new Date(value).toLocaleDateString('no', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : '';
}