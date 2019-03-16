import { PlaceholderDefinition } from '@findable/adf-schema';

export const placeholder = (
  attrs: PlaceholderDefinition['attrs'],
): PlaceholderDefinition => ({
  type: 'placeholder',
  attrs,
});
