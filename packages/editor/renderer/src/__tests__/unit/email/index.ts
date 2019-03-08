import { EmailSerializer } from '../../../index';
import { defaultSchema as schema } from '@atlaskit/adf-schema';

const paragraphIndents = require('../../__fixtures__/paragraph-indents.adf');
const paragraphAlign = require('../../__fixtures__/paragraph-align.adf');
const headingAlign = require('../../__fixtures__/heading-align.adf');
const em = require('../../__fixtures__/em.adf');
const codeBlock = require('../../__fixtures__/code-block.adf');
const inlineCodeProps = require('../../__fixtures__/inline-code-props.adf');
const inlineTextProps = require('../../__fixtures__/inline-text-props.adf');

const render = (doc: any) => {
  const serializer = EmailSerializer.fromSchema(schema);
  const docFromSchema = schema.nodeFromJSON(doc);
  const serialized = serializer.serializeFragment(docFromSchema.content);
  const node = document.createElement('div');
  node.innerHTML = serialized;
  return node.firstChild;
};

describe('Renderer - EmailSerializer', () => {
  it('should render text with em inside of a paragraph correctly', () => {
    const output = render(em);
    expect(output).toMatchSnapshot();
  });

  it('should align paragraph correctly', () => {
    const output = render(paragraphAlign);
    expect(output).toMatchSnapshot();
  });

  it('should align heading correctly', () => {
    const output = render(headingAlign);
    expect(output).toMatchSnapshot();
  });

  it('should inline text properties correctly', () => {
    const output = render(inlineTextProps);
    expect(output).toMatchSnapshot();
  });

  it('should inline code properties correctly', () => {
    const output = render(inlineCodeProps);
    expect(output).toMatchSnapshot();
  });

  it('should render codeblock correctly', () => {
    const output = render(codeBlock);
    expect(output).toMatchSnapshot();
  });

  it('should render paragraph with indentations', () => {
    const output = render(paragraphIndents);
    expect(output).toMatchSnapshot();
  });
});
