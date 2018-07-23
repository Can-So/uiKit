import { defaultSchema } from '@atlaskit/editor-common';
import { doc, p, strong } from '@atlaskit/editor-test-helpers';
import { ADFEncoder } from '../../src';
import { getText } from '../../src/utils';

describe('Renderer - utils', () => {
  describe('ADFEncoder', () => {
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
      transformer.parse.mockReturnValue(
        doc(p('hello ', strong('world')))(defaultSchema),
      );
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

  describe('getText', () => {
    it('should process ADNode and return text representation', () => {
      const node = { type: 'hardBreak' };
      expect(getText(node)).toEqual('[hardBreak]');
    });
    it('should process ProseMirror node and return text representation', () => {
      const node = p('hello')(defaultSchema);
      expect(getText(node)).toEqual('[paragraph]');
    });
  });
});
