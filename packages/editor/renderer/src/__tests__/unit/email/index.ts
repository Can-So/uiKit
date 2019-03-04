import { EmailSerializer } from '../../../index';
import { defaultSchema as schema } from '@atlaskit/adf-schema';

const serializer = EmailSerializer.fromSchema(schema);

const render = (doc: any) => {
  const docFromSchema = schema.nodeFromJSON(doc);
  const serialized = serializer.serializeFragment(docFromSchema.content);
  return serialized;
};

describe('Renderer - EmailSerializer', () => {
  it('should inline text properties correctly', () => {
    const doc = {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: 'foo' },
            { type: 'hardBreak' },
            { type: 'hardBreak' },
            { type: 'hardBreak' },
            { type: 'text', text: 'bar' },
          ],
        },
      ],
    };

    expect(render(doc)).toEqual(
      "<div style=\"font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', " +
        "'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', " +
        'sans-serif;font-size: 14;font-weight: 400;line-height: 24px;">' +
        '<p style="white-space: pre-wrap;word-wrap: break-word;">foo<br/><br/><br/>bar</p></div>',
    );
  });
});
