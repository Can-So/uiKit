import * as React from 'react';
import { mount } from 'enzyme';
import { createEditor, doc, p } from '@atlaskit/editor-test-helpers';
import Comment from '../../../ui/Appearance/Comment';

describe('comment editor', () => {
  let unmountEditor: () => void | undefined = undefined;

  beforeEach(() => {
    unmountEditor = undefined;
  });

  afterEach(() => {
    if (unmountEditor) {
      unmountEditor();
    }
  });

  const editor = (doc: any) => {
    const { unmount, ...rest } = createEditor({
      doc,
      editorProps: { allowExtension: true },
    });
    unmountEditor = unmount;
    return rest;
  };

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
