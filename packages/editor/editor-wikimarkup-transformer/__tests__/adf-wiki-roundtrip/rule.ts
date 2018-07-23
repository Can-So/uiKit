import { defaultSchema } from '@atlaskit/editor-common';
import WikiMarkupTransformer from '../../src';

import { doc, hr, p } from '@atlaskit/editor-test-helpers';

describe('ADF => WikiMarkup - Panel', () => {
  const transformer = new WikiMarkupTransformer();

  test('should convert rule node', () => {
    const node = doc(
      p('This is a ruler'),
      hr(),
      p('I am in between a ruler'),
      hr(),
      p('I am under a ruler'),
    )(defaultSchema);
    const wiki = transformer.encode(node);
    const adf = transformer.parse(wiki).toJSON();
    expect(adf).toEqual(node.toJSON());
  });
});
