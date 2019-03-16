import { InlineExtensionDefinition } from '@findable/adf-schema';

export const inlineExtension = (
  attrs: InlineExtensionDefinition['attrs'],
) => (): InlineExtensionDefinition => ({
  type: 'inlineExtension',
  attrs,
});
