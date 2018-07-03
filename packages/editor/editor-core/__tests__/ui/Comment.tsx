import * as React from 'react';

import Comment from '../../src/ui/Appearance/Comment';
import { createEditor, doc, p } from '@atlaskit/editor-test-helpers';
import { mount } from 'enzyme';

const editor = (doc: any) =>
  createEditor({
    doc,
    editorProps: { allowExtension: true },
  });

describe('comment editor', () => {
  it('should create empty terminal empty paragraph when clicked outside editor', () => {
    const { editorView } = editor(doc(p('Hello world'), p('Hello world')));
    const fullPage = mount(
      <Comment
        editorView={editorView}
        providerFactory={{} as any}
        editorDOMElement={<div />}
      />,
    );
    fullPage
      .findWhere(elm => elm.name() === 'ClickWrapper')
      .simulate('click', { clientY: 200 });
    expect(editorView.state.doc).toEqualDocument(
      doc(p('Hello world'), p('Hello world'), p('')),
    );
  });

  it('should not create empty terminal empty paragraph if it is already present at end', () => {
    const { editorView } = editor(doc(p('Hello world'), p('')));
    const fullPage = mount(
      <Comment
        editorView={editorView}
        providerFactory={{} as any}
        editorDOMElement={<div />}
      />,
    );
    fullPage
      .findWhere(elm => elm.name() === 'ClickWrapper')
      .simulate('click', { clientY: 200 })
      .simulate('click', { clientY: 200 });
    expect(editorView.state.doc).toEqualDocument(doc(p('Hello world'), p('')));
  });

  it('should not create empty terminal paragraph when clicked inside editor', () => {
    const { editorView } = editor(doc(p('Hello world')));
    const fullPage = mount(
      <Comment
        editorView={editorView}
        providerFactory={{} as any}
        editorDOMElement={<div />}
      />,
    );
    fullPage
      .findWhere(elm => elm.name() === 'ContentArea')
      .childAt(0)
      .simulate('click');
    expect(editorView.state.doc).toEqualDocument(doc(p('Hello world')));
  });
});
