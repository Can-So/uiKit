import { ExtensionDefinition } from '@findable/adf-schema';

export const extension = (
  attrs: ExtensionDefinition['attrs'],
): ExtensionDefinition => ({
  type: 'extension',
  attrs,
});
