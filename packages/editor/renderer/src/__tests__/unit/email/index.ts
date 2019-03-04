import { EmailSerializer } from '../../../index';
import { defaultSchema as schema } from '@atlaskit/adf-schema';

const render = (doc: any) => {
  const serializer = EmailSerializer.fromSchema(schema);
  const docFromSchema = schema.nodeFromJSON(doc);
  const serialized = serializer.serializeFragment(docFromSchema.content);
  const node = document.createElement('div');
  node.innerHTML = serialized;
  return node.querySelector('*');
};

describe('Renderer - EmailSerializer', () => {
  it('should inline text properties correctly', () => {
    const doc = {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'foo' }],
        },
      ],
    };
    const output = render(doc);
    expect(output).toMatchSnapshot();
  });
});
