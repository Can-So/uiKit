import { mount } from 'enzyme';
import * as React from 'react';
import {
  TextFormattingState,
  stateKey,
} from '../../src/plugins/text-formatting';
import ToolbarButton from '../../src/ui/ToolbarButton';
import AkButton from '@atlaskit/button';
import ToolbarTextFormatting from '../../src/ui/ToolbarTextFormatting';
import { doc, p, createEditor } from '@atlaskit/editor-test-helpers';
import { analyticsService } from '../../src/analytics';
import textFormatting from '../../src/editor/plugins/text-formatting';

describe('ToolbarTextFormatting', () => {
  const editor = (doc: any) =>
    createEditor<TextFormattingState>({
      doc,
      editorPlugins: [textFormatting()],
      pluginKey: stateKey,
    });

  it('should render disabled ToolbarButtons if disabled property is true', () => {
    const { editorView, pluginState } = editor(doc(p('text')));
    const toolbarTextColor = mount(
      <ToolbarTextFormatting
        disabled={true}
        pluginState={pluginState}
        editorView={editorView}
      />,
    );

    toolbarTextColor.find(ToolbarButton).forEach(node => {
      expect(node.prop('disabled')).toBe(true);
    });
    toolbarTextColor.unmount();
  });

  describe('analytics', () => {
    let trackEvent;
    let toolbarOption;
    beforeEach(() => {
      const { editorView, pluginState } = editor(doc(p('text')));
      toolbarOption = mount(
        <ToolbarTextFormatting
          pluginState={pluginState}
          editorView={editorView}
        />,
      );
      trackEvent = jest.fn();
      analyticsService.trackEvent = trackEvent;
    });

    afterEach(() => {
      toolbarOption.unmount();
    });

    it('should trigger analyticsService.trackEvent when bold button is clicked', () => {
      toolbarOption
        .find(AkButton)
        .first()
        .simulate('click');
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.editor.format.strong.button',
      );
    });

    it('should trigger analyticsService.trackEvent when italic button is clicked', () => {
      toolbarOption
        .find(AkButton)
        .at(1)
        .simulate('click');
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.editor.format.em.button',
      );
    });
  });
});
