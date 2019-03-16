import { TableCellDefinition, CellAttributes } from '@findable/adf-schema';

export const tableCell = (attrs?: CellAttributes) => (
  ...content: TableCellDefinition['content']
): TableCellDefinition => ({
  type: 'tableCell',
  attrs,
  content,
});
