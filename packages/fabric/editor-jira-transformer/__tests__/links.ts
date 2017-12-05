import { markFactory, nodeFactory } from '@atlaskit/editor-test-helpers';
import { checkParseEncodeRoundTrips } from './_test-helpers';
import { createJIRASchema } from '@atlaskit/editor-common';

const schema = createJIRASchema({ allowLinks: true });

// Nodes
const doc = nodeFactory(schema.nodes.doc);
const p = nodeFactory(schema.nodes.paragraph);

// Marks
const linkMark = attrs => markFactory(schema.marks.link!, attrs);

describe('JIRATransformer', () => {
  describe('links', () => {
    checkParseEncodeRoundTrips(
      'external link',
      schema,
      `<p>Text <a class="external-link" href="https://atlassian.com" rel="nofollow">atlassian.com</a> text</p>`,
      doc(
        p(
          'Text ',
          linkMark({ href: 'https://atlassian.com' })('atlassian.com'),
          ' text',
        ),
      ),
    );

    checkParseEncodeRoundTrips(
      'mailto link',
      schema,
      `<p>Text <a class="external-link" href="mailto:me@atlassian.com" rel="nofollow">me@atlassian.com</a> text</p>`,
      doc(
        p(
          'Text ',
          linkMark({ href: 'mailto:me@atlassian.com' })('me@atlassian.com'),
          ' text',
        ),
      ),
    );

    checkParseEncodeRoundTrips(
      'anchor',
      schema,
      `<p>Text <a href="#hash">some anchor</a> text</p>`,
      doc(p('Text ', linkMark({ href: '#hash' })('some anchor'), ' text')),
    );
  });
});
