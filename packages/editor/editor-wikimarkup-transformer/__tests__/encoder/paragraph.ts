import { defaultSchema } from '@atlaskit/editor-common';
import WikiMarkupTransformer from '../../src';

import {
  a,
  code,
  doc,
  em,
  hardBreak,
  p,
  strike,
  strong,
  subsup,
  textColor,
  underline,
} from '@atlaskit/editor-test-helpers';

describe('ADF => WikiMarkup - Paragraph', () => {
  const transformer = new WikiMarkupTransformer();

  test('should convert plain-text paragraph', () => {
    const node = doc(p('some plain text'))(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert plain-text with hardBreak in paragraph', () => {
    const node = doc(
      p('the first line of text', hardBreak(), 'a new line of text'),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert em to _emphasis_', () => {
    const node = doc(p('This is an ', em('emphasised'), ' word.'))(
      defaultSchema,
    );
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert em to -- citation', () => {
    const node = doc(p('This is a ', em('-- citation')))(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert strike mark to deleted', () => {
    const node = doc(p('This is an ', strike('strike')))(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert underline mark to inserted', () => {
    const node = doc(p('This is an ', underline('underline')))(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert code mark to monospace', () => {
    const node = doc(p('This is an ', code('monospace')))(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert strong mark to bold', () => {
    const node = doc(p('This is an ', strong('strong')))(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert sub mark to subscript', () => {
    const node = doc(p('This is an ', subsup({ type: 'sub' })('subscript')))(
      defaultSchema,
    );
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert sup mark to superscript', () => {
    const node = doc(p('This is an ', subsup({ type: 'sup' })('superscript')))(
      defaultSchema,
    );
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert link mark to link', () => {
    const node = doc(
      p('This is an ', a({ href: 'https://www.atlassian.com' })('link')),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert color mark to color macro', () => {
    const node = doc(
      p('This is an ', textColor({ color: '#FFFFFF' })('colorful'), ' text'),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert color with strong mark', () => {
    const node = doc(
      p(
        'This is an ',
        textColor({ color: '#FFFFFF' })(strong('strong colored')),
        ' text',
      ),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert citation with strong mark', () => {
    const node = doc(
      p('This is an ', em(strong('-- strong citation')), ' text'),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert link with strong mark', () => {
    const node = doc(
      p(
        'This is an ',
        a({ href: 'https://www.atlassian.com' })(
          strong('strong Atlassian link'),
        ),
        ' text',
      ),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert two paragraph to different lines', () => {
    const node = doc(
      p('This is the first paragraph'),
      p('This is the second paragraph'),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });
});
