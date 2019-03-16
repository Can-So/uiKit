import { DecisionItemDefinition, Inline } from '@findable/adf-schema';

export const decisionItem = (attrs: DecisionItemDefinition['attrs']) => (
  ...content: Array<Inline>
): DecisionItemDefinition => ({
  type: 'decisionItem',
  attrs,
  content,
});
