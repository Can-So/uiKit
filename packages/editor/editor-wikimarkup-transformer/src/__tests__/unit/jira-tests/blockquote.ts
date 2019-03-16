import { doc, p, blockquote } from '@findable/editor-test-helpers';
import { checkParseEncodeRoundTrips } from '../_test-helpers';
import { defaultSchema } from '@findable/adf-schema';

// Nodes

describe('WikiMarkup Transformer', () => {
  describe('blockquote', () => {
    const WIKI_NOTATION = `bq. some texts here`;

    checkParseEncodeRoundTrips(
      WIKI_NOTATION,
      defaultSchema,
      WIKI_NOTATION,
      doc(blockquote(p('some texts here'))),
    );
  });
});
