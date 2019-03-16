import { BlockCardDefinition, CardAttributes } from '@findable/adf-schema';

export const blockCard = (attrs: CardAttributes): BlockCardDefinition => ({
  type: 'blockCard',
  attrs,
});
