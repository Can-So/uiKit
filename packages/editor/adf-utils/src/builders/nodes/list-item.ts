import { ListItemDefinition, ListItemArray } from '@findable/adf-schema';

export const listItem = (content: ListItemArray): ListItemDefinition => ({
  type: 'listItem',
  content,
});
