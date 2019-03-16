import {
  ParagraphDefinition,
  BlockQuoteDefinition,
} from '@findable/adf-schema';

export const blockQuote = (
  ...content: Array<ParagraphDefinition>
): BlockQuoteDefinition => ({
  type: 'blockquote',
  content,
});
