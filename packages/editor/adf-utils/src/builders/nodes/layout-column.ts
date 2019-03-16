import { BlockContent, LayoutColumnDefinition } from '@findable/adf-schema';

export const layoutColumn = (attrs: { width: number }) => (
  content: BlockContent[],
): LayoutColumnDefinition => ({
  type: 'layoutColumn',
  attrs,
  content,
});
