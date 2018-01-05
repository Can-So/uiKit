import { ADFEncoder } from '../../src';
import { defaultSchema } from '@atlaskit/editor-common';
import { doc, p, strong } from '@atlaskit/editor-test-helpers';

describe('Renderer - ADFEncoder', () => {
  let transformerProvider;
  let transformer;

  beforeEach(() => {
    transformer = { encode: jest.fn(), parse: jest.fn() };
    transformerProvider = jest.fn(schema => transformer);
  });

  it('should pass the default schema to the transformer provider', () => {
    const encoder = new ADFEncoder(transformerProvider);
    expect(transformerProvider).toHaveBeenCalledWith(defaultSchema);
    expect(transformerProvider).toHaveBeenCalledTimes(1);
  });

  it('should use the provided transformer to parse a given value', () => {
    transformer.parse.mockReturnValue(doc(p('hello ', strong('world'))));
    const encoder = new ADFEncoder(transformerProvider);
    expect(encoder.encode('stubbed')).toEqual({
      version: 1,
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: 'hello ' },
            { type: 'text', text: 'world', marks: [{ type: 'strong' }] },
          ],
        },
      ],
    });
  });
});
