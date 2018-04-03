import * as React from 'react';

import { ClickAreaInline } from '../../../src/ui/Addon';
import { createEditor, doc, p } from '@atlaskit/editor-test-helpers';
import { mount } from 'enzyme';

const editor = (doc: any) =>
  createEditor({
    doc,
  });

describe('ClickAreaInline', () => {
  it('should create empty terminal empty paragraph when clicked', () => {
    const { editorView } = editor(doc(p('Hello world')));
    const clickArea = mount(<ClickAreaInline editorView={editorView} />);
    clickArea.simulate('click');
    expect(editorView.state.doc).toEqualDocument(doc(p('Hello world'), p('')));
  });

  it('should not create empty terminal empty paragraph if it is already present at end', () => {
    const { editorView } = editor(doc(p('Hello world'), p('')));
    const clickArea = mount(<ClickAreaInline editorView={editorView} />);
    clickArea.simulate('click').simulate('click');
    expect(editorView.state.doc).toEqualDocument(doc(p('Hello world'), p('')));
  });
});
