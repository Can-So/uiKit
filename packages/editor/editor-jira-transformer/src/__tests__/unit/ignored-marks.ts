import { doc, p, typeAheadQuery } from '@findable/editor-test-helpers';
import { encode } from './_test-helpers';
import { createJIRASchema } from '@findable/adf-schema';

const schema = createJIRASchema({ allowLinks: true });

describe('JIRATransformer', () => {
  describe('ignored marks', () => {
    it('should ignore typeAheadQuery mark when encoding', () => {
      expect(
        encode(
          doc(
            p(
              'Text ',
              typeAheadQuery({ trigger: '@' })('atlassian.com'),
              ' text',
            ),
          ),
          schema,
        ),
      ).toEqual('<p>Text atlassian.com text</p>');
    });
  });
});
