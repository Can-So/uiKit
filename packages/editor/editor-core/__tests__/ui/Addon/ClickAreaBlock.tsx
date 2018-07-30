import * as React from 'react';

import { ClickAreaBlock } from '../../../src/ui/Addon';
import { createEditor, doc, p, panel } from '@atlaskit/editor-test-helpers';
import { mount } from 'enzyme';
import gapCursorPlugin, {
  GapCursorSelection,
  Side,
} from '../../../src/plugins/gap-cursor';
import panelPlugin from '../../../src/plugins/panel';
import * as utils from '../../../src/utils';

const editor = (doc: any) =>
  createEditor({
    doc,
    editorPlugins: [gapCursorPlugin, panelPlugin],
  });

describe('ClickAreaBlock', () => {
  it('should create empty terminal empty paragraph when clicked', () => {
    const { editorView } = editor(doc(p('Hello world')));
    const clickWrapper = mount(<ClickAreaBlock editorView={editorView} />);
    clickWrapper.simulate('click', { clientY: 200 });
    expect(editorView.state.doc).toEqualDocument(doc(p('Hello world'), p('')));
    editorView.destroy();
    clickWrapper.unmount();
  });

  it('should not create empty terminal empty paragraph when clicked at height less then editor bottom', () => {
    const { editorView } = editor(doc(p('Hello world')));
    const clickWrapper = mount(<ClickAreaBlock editorView={editorView} />);
    clickWrapper.simulate('click', {
      clientY: 0,
    });
    expect(editorView.state.doc).toEqualDocument(doc(p('Hello world')));
    editorView.destroy();
    clickWrapper.unmount();
  });

  it('should not create empty terminal empty paragraph if it is already present at end', () => {
    const { editorView } = editor(doc(p('Hello world'), p('')));
    const clickWrapper = mount(<ClickAreaBlock editorView={editorView} />);
    clickWrapper.simulate('click').simulate('click');
    expect(editorView.state.doc).toEqualDocument(doc(p('Hello world'), p('')));
    editorView.destroy();
    clickWrapper.unmount();
  });

  it('should set a GapCursorSelection on click above the content area', () => {
    const { editorView } = editor(doc(panel()(p('{<>}'))));
    const clickWrapper = mount(<ClickAreaBlock editorView={editorView} />);
    clickWrapper.simulate('click', {
      // Note: editorView.dom.getBoundingClientRect() gives incorrect result in tests: { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0 }
      // that's why writing tests for clicks on the right/left side of the content-area is not possible
      clientY: -10,
    });
    const selection = editorView.state.selection as GapCursorSelection;
    expect(selection instanceof GapCursorSelection).toBe(true);
    expect(selection.side).toEqual(Side.LEFT);
    editorView.destroy();
    clickWrapper.unmount();
  });

  // @see ED-5126
  it('should not call editorView.focus() if the click target is inside Popup', () => {
    const closestElementSpy = jest.spyOn(utils, 'closestElement');
    (closestElementSpy as any).mockReturnValue({});
    const { editorView } = editor(doc(p('Hello world'), p('')));
    const focusSpy = jest.spyOn(editorView, 'focus');
    const clickWrapper = mount(<ClickAreaBlock editorView={editorView} />);
    clickWrapper.simulate('click', { clientY: 200 });
    expect(closestElementSpy).toHaveBeenCalled();
    expect(focusSpy).not.toHaveBeenCalled();
    editorView.destroy();
    clickWrapper.unmount();
  });
});
