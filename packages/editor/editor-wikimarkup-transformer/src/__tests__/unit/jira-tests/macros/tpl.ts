import { doc } from '@findable/editor-test-helpers';
import { checkParseEncodeRoundTrips } from '../../_test-helpers';
import { defaultSchema } from '@findable/adf-schema';

// Nodes

describe.skip('WikiMarkup Transformer', () => {
  describe('', () => {
    const WIKI_NOTATION = ``;

    checkParseEncodeRoundTrips(
      WIKI_NOTATION,
      defaultSchema,
      WIKI_NOTATION,
      doc(),
    );
  });
});
