import {
  BodiedExtensionDefinition,
  ExtensionContent,
} from '@findable/adf-schema';

export const bodiedExtension = (attrs: BodiedExtensionDefinition['attrs']) => (
  ...content: ExtensionContent
): BodiedExtensionDefinition => ({
  type: 'bodiedExtension',
  attrs,
  content,
});
