import { DbTable } from '../enums/tables.enum';

export interface EntitySchema {
  table: DbTable | string;
  idField: string;
  endpoints?: any;
  // nameField?: string;
  // rootSchema?: EntitySchema;
  translation?: PluralTranslationKeys;
}
interface PluralTranslationKeys {
  one: string;
  many: string;
}
