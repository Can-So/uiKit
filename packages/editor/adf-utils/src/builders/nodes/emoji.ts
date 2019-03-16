import { EmojiDefinition, EmojiAttributes } from '@findable/adf-schema';

export const emoji = (attrs: EmojiAttributes): EmojiDefinition => ({
  type: 'emoji',
  attrs,
});
