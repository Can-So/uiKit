import {
  DecisionListDefinition,
  DecisionItemDefinition,
} from '@findable/adf-schema';

export const decisionList = (attrs: DecisionListDefinition['attrs']) => (
  ...content: Array<DecisionItemDefinition>
): DecisionListDefinition => ({
  type: 'decisionList',
  attrs,
  content,
});
