import { defaultSchema } from '@atlaskit/editor-common';
import WikiMarkupTransformer from '../../src';

import {
  doc,
  media,
  mediaGroup,
  mediaSingle,
} from '@atlaskit/editor-test-helpers';

describe('ADF => WikiMarkup - Media', () => {
  const transformer = new WikiMarkupTransformer();

  test('should convert mediaGroup node', () => {
    const node = doc(
      mediaGroup(
        media({ id: 'file1.txt', type: 'file', collection: 'tmp' })(),
        media({ id: 'file2.txt', type: 'file', collection: 'tmp' })(),
      ),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert mediaSingle node', () => {
    const node = doc(
      mediaSingle()(
        media({ id: 'file1.txt', type: 'file', collection: 'tmp' })(),
      ),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });
});
