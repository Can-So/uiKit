import { DateDefinition } from '@findable/adf-schema';

export const date = (
  attrs: DateDefinition['attrs'] = { timestamp: '' },
): DateDefinition => ({
  type: 'date',
  attrs,
});
