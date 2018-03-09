import { mount } from 'enzyme';
import * as React from 'react';
import blockTypePlugins from '../../src/plugins/block-type';
import ToolbarBlockType from '../../src/ui/ToolbarBlockType';
import ToolbarButton from '../../src/ui/ToolbarButton';
import TextStyleIcon from '@atlaskit/icon/glyph/editor/text-style';
import Item from '@atlaskit/item';
import AkButton from '@atlaskit/button';
import {
  doc,
  p,
  createEditor,
  code_block,
  blockquote,
  panel,
  defaultSchema,
} from '@atlaskit/editor-test-helpers';
import { analyticsService } from '../../src/analytics';
import panelPlugin from '../../src/editor/plugins/panel';
import listPlugin from '../../src/editor/plugins/lists';
import codeBlockPlugin from '../../src/editor/plugins/code-block';

describe('@atlaskit/editor-core/ui/ToolbarBlockType', () => {
  const blockTypePluginsSet = blockTypePlugins(defaultSchema);
  const editor = (doc: any) =>
    createEditor({
      doc,
      editorPlugins: [panelPlugin, listPlugin, codeBlockPlugin],
    });

  it('should render disabled ToolbarButton if isDisabled property is true', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarBlockType
        pluginState={blockTypePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
        isDisabled={true}
      />,
    );
    expect(toolbarOption.find(AkButton).prop('isDisabled')).toBe(true);
    toolbarOption.unmount();
  });

  it('should render disabled ToolbarButton if current selection is blockquote', () => {
    const { editorView } = editor(doc(blockquote(p('te{<>}xt'))));
    const toolbarOption = mount(
      <ToolbarBlockType
        pluginState={blockTypePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
        isDisabled={true}
      />,
    );
    expect(toolbarOption.find(AkButton).prop('isDisabled')).toBe(true);
    toolbarOption.unmount();
  });

  it('should not render disabled ToolbarButton if current selection is panel', () => {
    const { editorView } = editor(doc(panel()(p('te{<>}xt'))));
    const toolbarOption = mount(
      <ToolbarBlockType
        pluginState={blockTypePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
      />,
    );
    expect(toolbarOption.find(AkButton).prop('isDisabled')).toBe(false);
    toolbarOption.unmount();
  });

  it('should render disabled ToolbarButton if code-block is selected', () => {
    const { editorView } = editor(
      doc(code_block({ language: 'js' })('te{<>}xt')),
    );
    const toolbarOption = mount(
      <ToolbarBlockType
        pluginState={blockTypePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
        isDisabled={true}
      />,
    );
    expect(toolbarOption.find(AkButton).prop('isDisabled')).toBe(true);
    toolbarOption.unmount();
  });

  it('should have spacing of toolbar button set to none if property isReducedSpacing=true', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarBlockType
        pluginState={blockTypePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
        isReducedSpacing={true}
      />,
    );
    expect(toolbarOption.find(ToolbarButton).prop('spacing')).toBe('none');
    toolbarOption.unmount();
  });

  it('should have spacing of toolbar button set to default if property isReducedSpacing=false', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarBlockType
        pluginState={blockTypePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
      />,
    );
    expect(toolbarOption.find(ToolbarButton).prop('spacing')).toBe('default');
    toolbarOption.unmount();
  });

  it('should render icon in dropdown-menu if property isSmall=true', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarBlockType
        pluginState={blockTypePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
        isSmall={true}
      />,
    );
    expect(toolbarOption.find(ToolbarButton).find(TextStyleIcon).length).toBe(
      1,
    );
    toolbarOption.unmount();
  });

  it('should render current block type in dropdown-menu if property isSmall=false', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarBlockType
        pluginState={blockTypePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
      />,
    );
    expect(
      toolbarOption
        .find(ToolbarButton)
        .first()
        .text()
        .indexOf('Normal text') >= 0,
    ).toBe(true);
    toolbarOption.unmount();
  });

  describe('analytics', () => {
    let trackEvent;
    let toolbarOption;
    beforeEach(() => {
      const { editorView } = editor(doc(p('text')));
      toolbarOption = mount(
        <ToolbarBlockType
          pluginState={blockTypePluginsSet[0].getState(editorView.state)}
          editorView={editorView}
        />,
      );
      toolbarOption.find(ToolbarButton).simulate('click');
      trackEvent = jest.fn();
      analyticsService.trackEvent = trackEvent;
    });

    afterEach(() => {
      toolbarOption.unmount();
    });

    [
      { value: 'normal', name: 'Normal text' },
      { value: 'heading1', name: 'Heading 1' },
      { value: 'heading2', name: 'Heading 2' },
      { value: 'heading3', name: 'Heading 3' },
      { value: 'heading4', name: 'Heading 4' },
      { value: 'heading5', name: 'Heading 5' },
      { value: 'heading6', name: 'Heading 6' },
    ].forEach(blockType => {
      it(`should trigger analyticsService.trackEvent when ${
        blockType.name
      } is clicked`, () => {
        toolbarOption
          .find(Item)
          .filterWhere(n => n.text() === blockType.name)
          .simulate('click');
        expect(trackEvent).toHaveBeenCalledWith(
          `atlassian.editor.format.${blockType.value}.button`,
        );
      });
    });
  });
});
