import { name } from '../../../../../package.json';
import { createSchema } from '../../../../..';
import { fromHTML, toHTML, toContext } from '../../../../../test-helpers';
import {
  layoutSection,
  layoutColumn,
  doc,
  p,
} from '@atlaskit/editor-test-helpers';

const schema = makeSchema();

describe(`${name}/schema layout-column node`, () => {
  it('serializes to <div data-layout-column />', () => {
    const html = toHTML(schema.nodes.layoutColumn.create(), schema);
    expect(html).toContain('<div data-layout-column="true">');
  });

  it('matches <div data-layout-column /> inside layoutSection', () => {
    const doc = fromHTML(
      '<div data-layout-type="two_equal"><div data-layout-column/></div>',
      schema,
    );
    const node = doc.firstChild!.firstChild!;
    expect(node.type.name).toEqual('layoutColumn');
  });

  it('should not match <div data-layout-column /> when pasted inside layoutSection/layoutColumn', () => {
    const document = doc(
      layoutSection()(layoutColumn(p('{<>}')), layoutColumn(p(''))),
    );
    const context = toContext(document, schema);
    const pmDoc = fromHTML(
      '<div data-layout-column><p>Text</p></div>',
      schema,
      { context },
    );
    const node = pmDoc.firstChild!;
    expect(node.type.name).toEqual('paragraph');
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'layoutSection', 'layoutColumn', 'paragraph', 'text'],
  });
}
