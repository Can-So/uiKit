import { BulletListDefinition, ListItemDefinition } from '@findable/adf-schema';

export const bulletList = (
  ...content: Array<ListItemDefinition>
): BulletListDefinition => ({
  type: 'bulletList',
  content,
});
