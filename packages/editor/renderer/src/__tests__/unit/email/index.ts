import { EmailSerializer } from '../../../index';
import { defaultSchema as schema } from '@atlaskit/adf-schema';

const render = (doc: any) => {
  const serializer = EmailSerializer.fromSchema(schema);
  const docFromSchema = schema.nodeFromJSON(doc);
  const serialized = serializer.serializeFragment(docFromSchema.content);
  const node = document.createElement('div');
  node.innerHTML = serialized;
  return node.firstChild;
};

describe('Renderer - EmailSerializer', () => {
  it('should align paragraph correctly', () => {
    const doc = {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Plain Paragraph',
            },
          ],
        },
        {
          type: 'paragraph',
          marks: [
            {
              type: 'alignment',
              attrs: {
                align: 'center',
              },
            },
          ],
          content: [
            {
              type: 'text',
              text: 'Paragraph with center alignment',
            },
          ],
        },
        {
          type: 'paragraph',
          marks: [
            {
              type: 'alignment',
              attrs: {
                align: 'end',
              },
            },
          ],
          content: [
            {
              type: 'text',
              text: 'Paragraph with end alignment',
            },
          ],
        },
      ],
    };
    const output = render(doc);
    expect(output).toMatchSnapshot();
  });

  it('should align heading correctly', () => {
    const doc = {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'heading',
          attrs: {
            level: 1,
          },
          content: [
            {
              type: 'text',
              text: 'Plain Heading',
            },
          ],
        },
        {
          type: 'heading',
          attrs: {
            level: 1,
          },
          marks: [
            {
              type: 'alignment',
              attrs: {
                align: 'center',
              },
            },
          ],
          content: [
            {
              type: 'text',
              text: 'Heading with center alignment',
            },
          ],
        },
        {
          type: 'heading',
          attrs: {
            level: 1,
          },
          marks: [
            {
              type: 'alignment',
              attrs: {
                align: 'end',
              },
            },
          ],
          content: [
            {
              type: 'text',
              text: 'Heading with end alignment',
            },
          ],
        },
      ],
    };

    const output = render(doc);
    expect(output).toMatchSnapshot();
  });

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

  it('should inline code properties correctly', () => {
    const doc = {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'text',
          text: 'const foo = bar();',
          marks: [
            {
              type: 'code',
            },
          ],
        },
      ],
    };
    const output = render(doc);
    expect(output).toMatchSnapshot();
  });

  it('should render codeblock correctly', () => {
    const doc = {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text:
                '// Create a map.\nfinal IntIntOpenHashMap map = new IntIntOpenHashMap();\nmap.put(1, 2);\nmap.put(2, 5);\nmap.put(3, 10);',
            },
            {
              type: 'text',
              text:
                '\nint count = map.forEach(new IntIntProcedure()\n{\n   int count;\n   public void apply(int key, int value)\n   {\n       if (value >= 5) count++;\n   }\n}).count;\nSystem.out.println("There are " + count + " values >= 5");',
            },
          ],
          attrs: {
            language: 'javascript',
          },
        },
      ],
    };
    const output = render(doc);
    expect(output).toMatchSnapshot();
  });

  it('should render paragraph with indentations', () => {
    const doc = {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'paragraph',
          marks: [{ type: 'indentation', attrs: { level: 1 } }],
          content: [
            { type: 'text', text: 'Paragraph with 1 level of indentation' },
          ],
        },
        {
          type: 'paragraph',
          marks: [{ type: 'indentation', attrs: { level: 2 } }],
          content: [
            { type: 'text', text: 'Paragraph with 2 levels of indentation' },
          ],
        },
        {
          type: 'paragraph',
          marks: [{ type: 'indentation', attrs: { level: 3 } }],
          content: [
            { type: 'text', text: 'Paragraph with 3 levels of indentation' },
          ],
        },
        {
          type: 'paragraph',
          marks: [{ type: 'indentation', attrs: { level: 4 } }],
          content: [
            { type: 'text', text: 'Paragraph with 4 levels of indentation' },
          ],
        },
        {
          type: 'paragraph',
          marks: [{ type: 'indentation', attrs: { level: 5 } }],
          content: [
            { type: 'text', text: 'Paragraph with 5 levels of indentation' },
          ],
        },
        {
          type: 'paragraph',
          marks: [{ type: 'indentation', attrs: { level: 6 } }],
          content: [
            { type: 'text', text: 'Paragraph with 6 levels of indentation' },
          ],
        },
      ],
    };
    const output = render(doc);
    expect(output).toMatchSnapshot();
  });
});
