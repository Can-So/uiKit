import { EmailSerializer } from '../../../index';
import { defaultSchema as schema } from '@atlaskit/adf-schema';

import * as paragraphIndents from '../../__fixtures__/paragraph-indents.adf.json';
import * as paragraphAlign from '../../__fixtures__/paragraph-align.adf.json';
import * as headingAlign from '../../__fixtures__/heading-align.adf.json';
import * as em from '../../__fixtures__/em.adf.json';
import * as codeBlock from '../../__fixtures__/code-block.adf.json';
import * as inlineCodeProps from '../../__fixtures__/inline-code-props.adf.json';
import * as inlineTextProps from '../../__fixtures__/inline-text-props.adf.json';
import * as link from '../../__fixtures__/link.adf.json';
import * as status from '../../__fixtures__/status.adf.json';

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

  it('should render link', () => {
    const output = render(link);
    expect(output).toMatchSnapshot();
  });

  it('should render status correctly', () => {
    const output = render(status);
    expect(output).toMatchSnapshot();
  });
});
