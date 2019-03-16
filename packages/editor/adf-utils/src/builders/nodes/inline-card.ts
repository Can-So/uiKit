import { InlineCardDefinition, CardAttributes } from '@findable/adf-schema';

export const inlineCard = (attrs: CardAttributes): InlineCardDefinition => ({
  type: 'inlineCard',
  attrs,
});
