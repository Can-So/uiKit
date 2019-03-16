import { TextDefinition } from '@findable/adf-schema';

export const text = (text: string): TextDefinition => ({
  type: 'text',
  text,
});
