import { defaultSchema } from '@atlaskit/editor-common';
import WikiMarkupTransformer from '../../src';

import {
  code_block,
  doc,
  h1,
  h2,
  h3,
  h4,
  hr,
  li,
  ol,
  p,
  panel,
  table,
  td,
  th,
  tr,
  ul,
} from '@atlaskit/editor-test-helpers';

describe('ADF => WikiMarkup - Table', () => {
  const transformer = new WikiMarkupTransformer();

  test('should convert Table node', () => {
    const node = doc(
      table()(
        tr(th()(p('Header 1')), th()(p('Header 2'))),
        tr(td()(p('Cell 1')), td()(p('Cell 2'))),
        tr(td()(p('Cell 3')), td()(p('Cell 4'))),
      ),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert Table node without a header row', () => {
    const node = doc(
      table()(
        tr(td()(p('Cell 1')), td()(p('Cell 2'))),
        tr(td()(p('Cell 3')), td()(p('Cell 4'))),
      ),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert Table node with panel in the cell', () => {
    const node = doc(
      table()(
        tr(
          td()(panel({ panelType: 'note' })(p('This is a note panel'))),
          td()(panel({ panelType: 'info' })(p('This is a info panel'))),
        ),
        tr(
          td()(panel({ panelType: 'tip' })(p('This is a tip panel'))),
          td()(panel({ panelType: 'warning' })(p('This is a warning panel'))),
        ),
      ),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert Table node with list in the cell', () => {
    const node = doc(
      table()(
        tr(
          td()(ul(li(p('item 1')), li(p('item 2')))),
          td()(ol(li(p('item 1')), li(p('item 2')))),
        ),
        tr(
          td()(ol(li(p('item 1')), li(p('item 2')))),
          td()(ul(li(p('item 1')), li(p('item 2')))),
        ),
      ),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert Table node with list and paragraph in the cell', () => {
    const node = doc(
      table()(
        tr(
          td()(ul(li(p('item 1')), li(p('item 2'))), p('below the list')),
          td()(ol(li(p('item 1')), li(p('item 2'))), p('below the list')),
        ),
        tr(
          td()(ol(li(p('item 1')), li(p('item 2'))), p('below the list')),
          td()(ul(li(p('item 1')), li(p('item 2'))), p('below the list')),
        ),
      ),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert Table node with ruler and heading in the cell', () => {
    const node = doc(
      table()(
        tr(
          td()(h1('Heading 1'), hr(), h1('Heading 1')),
          td()(h2('Heading 2'), hr(), h2('Heading 2')),
        ),
        tr(
          td()(h3('Heading 3'), hr(), h3('Heading 3')),
          td()(h4('Heading 4'), hr(), h4('Heading 4')),
        ),
      ),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert Table node with codeBlock in the cell', () => {
    const node = doc(
      table()(
        tr(
          td()(code_block({ language: 'javascript' })('const i = 0;')),
          td()(code_block({ language: 'javascript' })('const i = 0;')),
        ),
        tr(
          td()(code_block({ language: 'javascript' })('const i = 0;')),
          td()(code_block({ language: 'javascript' })('const i = 0;')),
        ),
      ),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });
});
