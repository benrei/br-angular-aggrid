import { DbTable } from '../enums/tables.enum';
import { EntitySchema } from '../interfaces/entity-schema';

export type DataSchema = Record<string, EntitySchema>;

export const dataSchema: DataSchema = {
  [DbTable.Cars]: {
    endpoints: null,
    idField: 'id',
    table: DbTable.Cars,
    translation: {
      one: 'Entity.Car',
      many: 'Entity.Cars'
    }
  }
};
