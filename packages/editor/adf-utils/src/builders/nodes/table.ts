import { TableDefinition, TableRowDefinition } from '@findable/adf-schema';

export const table = (
  ...content: Array<TableRowDefinition>
): TableDefinition => ({
  type: 'table',
  content,
});
