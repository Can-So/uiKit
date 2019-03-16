import { HardBreakDefinition } from '@findable/adf-schema';

export const hardBreak = (
  attrs?: HardBreakDefinition['attrs'],
): HardBreakDefinition => ({
  type: 'hardBreak',
  attrs,
});
