import { PanelDefinition, PanelAttributes } from '@findable/adf-schema';

export const panel = (attrs: PanelAttributes) => (
  ...content: PanelDefinition['content']
): PanelDefinition => ({
  type: 'panel',
  attrs,
  content,
});
