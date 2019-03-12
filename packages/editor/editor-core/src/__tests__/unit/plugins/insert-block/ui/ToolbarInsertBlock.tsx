import * as React from 'react';
import Item from '@atlaskit/item';
import { EmojiPicker as AkEmojiPicker } from '@atlaskit/emoji';
import { emoji as emojiData } from '@atlaskit/util-data-test';
import {
  doc,
  p,
  createEditorFactory,
  code_block,
  decisionList,
  decisionItem,
  taskList,
  taskItem,
  mountWithIntl,
} from '@atlaskit/editor-test-helpers';
import { taskDecision } from '@atlaskit/util-data-test';
import { ProviderFactory } from '@atlaskit/editor-common';
import { uuid } from '@atlaskit/adf-schema';
import Button from '@atlaskit/button';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';

import { pluginKey as blockTypePluginKey } from '../../../../../plugins/block-type/pm-plugins/main';
import {
  messages as blockTypeMessages,
  CODE_BLOCK,
  PANEL,
} from '../../../../../plugins/block-type/types';
import DropdownMenu from '../../../../../ui/DropdownMenu';
import ToolbarInsertBlock, {
  messages,
} from '../../../../../plugins/insert-block/ui/ToolbarInsertBlock';
import ToolbarButton from '../../../../../ui/ToolbarButton';
import EditorActions from '../../../../../actions';
import { MediaProvider } from '../../../../../plugins/media';
import {
  stateKey as hyperlinkPluginKey,
  LinkAction,
} from '../../../../../plugins/hyperlink/pm-plugins/main';
import {
  analyticsPluginKey,
  INPUT_METHOD,
} from '../../../../../plugins/analytics';
import tablesPlugin from '../../../../../plugins/table';
import { AnalyticsHandler } from '../../../../../analytics';
import { ReactWrapper } from 'enzyme';
import { EditorView } from 'prosemirror-view';

const emojiProvider = emojiData.testData.getEmojiResourcePromise();

const mediaProvider: Promise<MediaProvider> = Promise.resolve({
  viewContext: Promise.resolve({} as any),
  uploadContext: Promise.resolve({} as any),
});

const providerFactory = ProviderFactory.create({ mediaProvider });

const clickToolbarButton = (title: string, toolbarOption: ReactWrapper) => {
  const toolbarButton = toolbarOption
    .find(ToolbarButton)
    .filterWhere(n => n.prop('title')!.indexOf(title) > -1)
    .find(Button);
  toolbarButton.simulate('click');
};

const clickInsertMenuOption = (title: string, toolbarOption: ReactWrapper) => {
  toolbarOption.find('button').simulate('click');
  const insertMenuOption = toolbarOption
    .find(Item)
    .filterWhere(n => n.text().indexOf(title) > -1);
  insertMenuOption.simulate('click');
};

const menus = [
  {
    name: INPUT_METHOD.TOOLBAR,
    numButtons: 1,
    clickButton: clickToolbarButton,
  },
  {
    name: INPUT_METHOD.INSERT_MENU,
    numButtons: 0,
    clickButton: clickInsertMenuOption,
  },
];

describe('@atlaskit/editor-core/ui/ToolbarInsertBlock', () => {
  const createEditor = createEditorFactory();
  let trackEvent: jest.SpyInstance<AnalyticsHandler>;
  let editorView: EditorView;
  let editorActions: EditorActions;
  let toolbarOption: ReactWrapper;
  let createAnalyticsEvent: CreateUIAnalyticsEventSignature;
  let dispatchAnalyticsSpy: jest.Mock;

  const editor = (doc: any, editorPlugins?: any[]) => {
    createAnalyticsEvent = jest.fn(() => ({ fire() {} }));
    return createEditor({
      doc,
      pluginKey: blockTypePluginKey,
      editorProps: {
        analyticsHandler: trackEvent as any,
        allowCodeBlocks: true,
        allowLayouts: true,
        allowLists: true,
        allowPanel: true,
        allowRule: true,
        allowAnalyticsGASV3: true,
        taskDecisionProvider: Promise.resolve(
          taskDecision.getMockTaskDecisionResource(),
        ),
      },
      editorPlugins,
      providerFactory,
      createAnalyticsEvent,
    });
  };

  beforeEach(() => {
    trackEvent = jest.fn();
    editorActions = new EditorActions();
  });

  it('should render disabled DropdownMenu trigger if isDisabled property is true', () => {
    const { editorView, pluginState } = editor(doc(p('text')));

    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        tableSupported={true}
        editorView={editorView}
        availableWrapperBlockTypes={pluginState.availableWrapperBlockTypes}
        isDisabled={true}
        buttons={0}
        isReducedSpacing={false}
      />,
    );
    expect(toolbarOption.find(ToolbarButton).prop('disabled')).toEqual(true);
    toolbarOption.unmount();
  });

  it('should return null if none of the plugins are present', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        editorView={editorView}
        buttons={5}
        isReducedSpacing={false}
      />,
    );
    expect(toolbarOption.html()).toEqual(null);
    toolbarOption.unmount();
  });

  // Following test case is breaking due to trouble in @atlaskit/downdown.
  // isDisabled is always set to false.
  it('should disable mention option if mentionsEnabled is false', () => {
    const { editorView } = editor(
      doc(code_block({ language: 'js' })('te{<>}xt')),
    );
    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        mentionsSupported={true}
        mentionsEnabled={false}
        editorView={editorView}
        buttons={0}
        isReducedSpacing={false}
      />,
    );
    toolbarOption.find('button').simulate('click');
    const mentionButton = toolbarOption
      .find(Item)
      .filterWhere(n => n.text().indexOf(messages.mention.defaultMessage) > -1);
    expect(mentionButton.prop('isDisabled')).toEqual(true);
    toolbarOption.unmount();
  });

  it('should close emoji picker when dropdown is toggled', () => {
    const { editorView } = editor(doc(p()));
    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        emojiDisabled={false}
        emojiProvider={emojiProvider}
        editorView={editorView}
        buttons={0}
        isReducedSpacing={false}
      />,
    );
    toolbarOption.setState({ emojiPickerOpen: true });
    toolbarOption.find('button').simulate('click');
    expect(toolbarOption.state('emojiPickerOpen')).toEqual(false);
    toolbarOption.unmount();
  });

  it('should open emoji picker when emoji option is clicked', () => {
    const { editorView } = editor(doc(p()));
    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        emojiDisabled={false}
        emojiProvider={emojiProvider}
        editorView={editorView}
        buttons={0}
        isReducedSpacing={false}
      />,
    );
    clickInsertMenuOption(messages.emoji.defaultMessage, toolbarOption);
    expect(toolbarOption.state('emojiPickerOpen')).toEqual(true);
    toolbarOption.unmount();
  });

  it('should trigger emoji picker opened analytics event when emoji picker opened', () => {
    const { editorView } = editor(doc(p()));
    const dispatchAnalyticsSpy = jest.fn();
    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        emojiDisabled={false}
        emojiProvider={emojiProvider}
        editorView={editorView}
        buttons={0}
        isReducedSpacing={false}
        dispatchAnalyticsEvent={dispatchAnalyticsSpy}
      />,
    );
    clickInsertMenuOption(messages.emoji.defaultMessage, toolbarOption);

    expect(dispatchAnalyticsSpy).toHaveBeenCalledWith({
      action: 'opened',
      actionSubject: 'picker',
      actionSubjectId: 'emojiPicker',
      attributes: { inputMethod: 'toolbar' },
      eventType: 'ui',
    });
    toolbarOption.unmount();
  });

  it('should have emoji picker component when emojiPickerOpen is true', () => {
    const { editorView } = editor(doc(p()));
    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        emojiDisabled={false}
        emojiProvider={emojiProvider}
        editorView={editorView}
        buttons={0}
        isReducedSpacing={false}
      />,
    );
    toolbarOption.setState({ emojiPickerOpen: true });
    expect(toolbarOption.find(AkEmojiPicker).length).toEqual(1);
    toolbarOption.unmount();
  });

  it('should trigger emoji inserted analytics event when emoji selected in picker', () => {
    const { editorView } = editor(doc(p()));
    const dispatchAnalyticsSpy = jest.fn();
    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        emojiDisabled={false}
        emojiProvider={emojiProvider}
        editorView={editorView}
        buttons={0}
        isReducedSpacing={false}
        insertEmoji={jest.fn()}
        dispatchAnalyticsEvent={dispatchAnalyticsSpy}
      />,
    );

    clickInsertMenuOption(messages.emoji.defaultMessage, toolbarOption);
    toolbarOption.update();
    const onSelection = toolbarOption.find(AkEmojiPicker).prop('onSelection');
    onSelection!({ id: '1f603', shortName: ':smiley:' }, undefined);

    expect(dispatchAnalyticsSpy).toHaveBeenCalledWith({
      action: 'inserted',
      actionSubject: 'document',
      actionSubjectId: 'emoji',
      attributes: { inputMethod: 'picker' },
      eventType: 'track',
    });
    toolbarOption.unmount();
  });

  it('should have 1 child elements if mediaSupported and mediaUploadsEnabled is defined and equals true', async () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        mediaSupported={true}
        mediaUploadsEnabled={true}
        editorView={editorView}
        buttons={5}
        isReducedSpacing={false}
      />,
    );
    expect(toolbarOption.find(ToolbarButton).length).toEqual(1);
    toolbarOption.unmount();
  });

  it('should call onShowMediaPicker when media option is clicked', () => {
    const { editorView } = editor(doc(p('text')));
    const spy = jest.fn();
    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        mediaSupported={true}
        mediaUploadsEnabled={true}
        onShowMediaPicker={spy}
        editorView={editorView}
        buttons={0}
        isReducedSpacing={false}
      />,
    );
    toolbarOption.find('button').simulate('click');
    const mediaButton = toolbarOption
      .find(Item)
      .filterWhere(
        n => n.text().indexOf(messages.filesAndImages.defaultMessage) > -1,
      );
    mediaButton.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(trackEvent).toHaveBeenCalledWith(
      'atlassian.editor.format.media.button',
    );
    toolbarOption.unmount();
  });

  it('should trigger cloud picker opened analytics event when media option clicked', () => {
    const { editorView } = editor(doc(p()));
    const dispatchAnalyticsSpy = jest.fn();
    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        mediaSupported={true}
        mediaUploadsEnabled={true}
        onShowMediaPicker={jest.fn()}
        editorView={editorView}
        buttons={0}
        isReducedSpacing={false}
        dispatchAnalyticsEvent={dispatchAnalyticsSpy}
      />,
    );
    toolbarOption.find('button').simulate('click');
    const mediaButton = toolbarOption
      .find(Item)
      .filterWhere(
        n => n.text().indexOf(messages.filesAndImages.defaultMessage) > -1,
      );
    mediaButton.simulate('click');

    expect(dispatchAnalyticsSpy).toHaveBeenCalledWith({
      action: 'opened',
      actionSubject: 'picker',
      actionSubjectId: 'cloudPicker',
      attributes: { inputMethod: 'toolbar' },
      eventType: 'ui',
    });
    toolbarOption.unmount();
  });

  it('should insert link when link option is clicked', () => {
    const { editorView } = editor(doc(p('text')));
    const dispatchSpy = jest.spyOn(editorView, 'dispatch');
    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        linkSupported={true}
        editorView={editorView}
        buttons={0}
        isReducedSpacing={false}
      />,
    );
    toolbarOption.find('button').simulate('click');
    const linkButton = toolbarOption
      .find(Item)
      .filterWhere(n => n.text().indexOf(messages.link.defaultMessage) > -1);
    linkButton.simulate('click');

    const linkMeta = dispatchSpy.mock.calls[0][0].getMeta(hyperlinkPluginKey);
    expect(linkMeta).toEqual(LinkAction.SHOW_INSERT_TOOLBAR);
    toolbarOption.unmount();
    dispatchSpy.mockRestore();
  });

  it('should trigger link typeahead invoked analytics event when link option clicked', () => {
    const { editorView } = editor(doc(p('text')));
    const dispatchSpy = jest.spyOn(editorView, 'dispatch');
    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        linkSupported={true}
        editorView={editorView}
        buttons={0}
        isReducedSpacing={false}
      />,
    );
    toolbarOption.find('button').simulate('click');
    const linkButton = toolbarOption
      .find(Item)
      .filterWhere(n => n.text().indexOf(messages.link.defaultMessage) > -1);
    linkButton.simulate('click');

    const analyticsMeta = dispatchSpy.mock.calls[0][0].getMeta(
      analyticsPluginKey,
    );
    expect(analyticsMeta[0].payload).toEqual(
      expect.objectContaining({
        action: 'invoked',
        actionSubjectId: 'linkTypeAhead',
        attributes: expect.objectContaining({ inputMethod: 'toolbar' }),
      }),
    );
    toolbarOption.unmount();
    dispatchSpy.mockRestore();
  });

  it('should trigger insertBlockType when Panel option is clicked', () => {
    const { editorView, pluginState: pluginStateBlockType } = editor(
      doc(p('text')),
    );
    const spy = jest.fn(blockType => {
      return () => {
        return true;
      };
    });

    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        availableWrapperBlockTypes={
          pluginStateBlockType.availableWrapperBlockTypes
        }
        onInsertBlockType={spy}
        editorView={editorView}
        buttons={0}
        isReducedSpacing={false}
      />,
    );
    toolbarOption.find('button').simulate('click');
    const panelButton = toolbarOption
      .find(Item)
      .filterWhere(
        n => n.text().indexOf(blockTypeMessages.panel.defaultMessage) > -1,
      );
    panelButton.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('panel');
    expect(trackEvent).toHaveBeenCalledWith(
      'atlassian.editor.format.panel.button',
    );
    toolbarOption.unmount();
  });

  it('should trigger insertBlockType when code block option is clicked', () => {
    const { editorView, pluginState: pluginStateBlockType } = editor(
      doc(p('text')),
    );
    const spy = jest.fn(blockType => {
      return () => {
        return true;
      };
    });

    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        availableWrapperBlockTypes={
          pluginStateBlockType.availableWrapperBlockTypes
        }
        onInsertBlockType={spy}
        editorView={editorView}
        buttons={0}
        isReducedSpacing={false}
      />,
    );
    toolbarOption.find('button').simulate('click');
    const codeblockButton = toolbarOption
      .find(Item)
      .filterWhere(
        n => n.text().indexOf(blockTypeMessages.codeblock.defaultMessage) > -1,
      );
    codeblockButton.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('codeblock');
    expect(trackEvent).toHaveBeenCalledWith(
      'atlassian.editor.format.codeblock.button',
    );
    toolbarOption.unmount();
  });

  it('should trigger insertBlockType when blockquote option is clicked', () => {
    const { editorView, pluginState: pluginStateBlockType } = editor(
      doc(p('text')),
    );
    const spy = jest.fn(blockType => {
      return () => {
        return true;
      };
    });

    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        availableWrapperBlockTypes={
          pluginStateBlockType.availableWrapperBlockTypes
        }
        onInsertBlockType={spy}
        editorView={editorView}
        buttons={0}
        isReducedSpacing={false}
      />,
    );
    toolbarOption.find('button').simulate('click');
    const blockquoteButton = toolbarOption
      .find(Item)
      .filterWhere(
        n => n.text().indexOf(blockTypeMessages.blockquote.defaultMessage) > -1,
      );

    blockquoteButton.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('blockquote');
    expect(trackEvent).toHaveBeenCalledWith(
      'atlassian.editor.format.blockquote.button',
    );
    toolbarOption.unmount();
  });

  it('should track table creation event when table menu is clicked option is clicked', () => {
    const { editorView } = editor(doc(p('text')), [tablesPlugin()]);
    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        tableSupported={true}
        editorView={editorView}
        buttons={0}
        isReducedSpacing={false}
      />,
    );
    clickInsertMenuOption(messages.table.defaultMessage, toolbarOption);
    expect(trackEvent).toHaveBeenCalledWith(
      'atlassian.editor.format.table.button',
    );
    toolbarOption.unmount();
  });

  it(`should trigger insertMacroFromMacroBrowser when "${
    messages.viewMore.defaultMessage
  }" option is clicked`, () => {
    const { editorView } = editor(doc(p('text')));
    const insertMacroFromMacroBrowser = jest.fn();
    const macroProvider = {} as any;

    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        macroProvider={macroProvider}
        onInsertMacroFromMacroBrowser={() => insertMacroFromMacroBrowser}
        editorView={editorView}
        buttons={0}
        isReducedSpacing={false}
      />,
    );

    toolbarOption.find('button').simulate('click');
    const button = toolbarOption
      .find(Item)
      .filterWhere(
        n => n.text().indexOf(messages.viewMore.defaultMessage) > -1,
      );
    button.simulate('click');
    expect(insertMacroFromMacroBrowser).toHaveBeenCalledTimes(1);
    expect(trackEvent).toHaveBeenCalledWith(
      'atlassian.editor.format.macro.button',
    );
    toolbarOption.unmount();
  });

  it(`should track placeholder insert event when "${
    messages.placeholderText.defaultMessage
  }" option is clicked`, () => {
    const { editorView } = editor(doc(p('text')));

    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        placeholderTextEnabled={true}
        editorView={editorView}
        buttons={0}
        isReducedSpacing={false}
      />,
    );

    toolbarOption.find('button').simulate('click');
    const button = toolbarOption
      .find(Item)
      .filterWhere(
        n => n.text().indexOf(messages.placeholderText.defaultMessage) > -1,
      );
    button.simulate('click');

    expect(trackEvent).toHaveBeenCalledWith(
      'atlassian.editor.format.placeholder.button',
    );
    toolbarOption.unmount();
  });

  it(`should track layout section insert event when "${
    messages.columns.defaultMessage
  }" option is clicked`, () => {
    const { editorView } = editor(doc(p('text')));

    const toolbarOption = mountWithIntl(
      <ToolbarInsertBlock
        layoutSectionEnabled={true}
        editorView={editorView}
        buttons={0}
        isReducedSpacing={false}
      />,
    );

    toolbarOption.find('button').simulate('click');
    const button = toolbarOption
      .find(Item)
      .filterWhere(n => n.text().indexOf(messages.columns.defaultMessage) > -1);
    button.simulate('click');

    expect(trackEvent).toHaveBeenCalledWith(
      'atlassian.editor.format.layout.button',
    );
    toolbarOption.unmount();
  });

  describe('Options in insert toolbar', () => {
    it('should have table option if tableSupported is true', () => {
      const { editorView } = editor(doc(p('text')));
      const toolbarOption = mountWithIntl(
        <ToolbarInsertBlock
          tableSupported={true}
          editorView={editorView}
          buttons={0}
          isReducedSpacing={false}
        />,
      );
      toolbarOption.find('button').simulate('click');
      expect(
        toolbarOption
          .find('Item')
          .filterWhere(
            n => n.text().indexOf(messages.table.defaultMessage) > -1,
          ).length > 0,
      ).toEqual(true);
    });

    it('should have 3 child elements if availableWrapperBlockTypes is defined', () => {
      const { editorView, pluginState: pluginStateBlockType } = editor(
        doc(p('text')),
      );
      const toolbarOption = mountWithIntl(
        <ToolbarInsertBlock
          availableWrapperBlockTypes={
            pluginStateBlockType.availableWrapperBlockTypes
          }
          editorView={editorView}
          buttons={0}
          isReducedSpacing={false}
        />,
      );
      const items = toolbarOption.find(DropdownMenu).prop('items');
      expect((items[0] as any).items.length).toEqual(3);
      toolbarOption.unmount();
    });

    it('should add custom items passed to the plus menu', () => {
      const { editorView } = editor(doc(p('text')));

      editorActions.appendText = jest.fn();

      const customItems = [
        {
          content: 'Custom A',
          value: { name: 'custom-a' },
          onClick: (editorActions: EditorActions) => {
            editorActions.appendText('adding custom-a');
          },
        },
        {
          content: 'Custom B',
          value: { name: 'custom-b' },
          onClick: (editorActions: EditorActions) => {
            editorActions.appendText('adding custom-b');
          },
        },
      ];

      const plusMenu = mountWithIntl(
        <ToolbarInsertBlock
          editorView={editorView}
          editorActions={editorActions}
          buttons={0}
          isReducedSpacing={false}
          insertMenuItems={customItems}
        />,
      );

      const items = plusMenu.find(DropdownMenu).prop('items');
      expect((items[0] as any).items.length).toEqual(2);

      const onItemActivated = plusMenu
        .find(DropdownMenu)
        .prop('onItemActivated');

      if (onItemActivated) {
        onItemActivated.call(
          {
            props: {
              editorActions: editorActions,
              insertMenuItems: customItems,
            },
          },
          { item: customItems[0] },
        );
      }

      expect(editorActions.appendText).toHaveBeenCalledWith('adding custom-a');
      plusMenu.unmount();
    });
  });

  menus.forEach(menu => {
    describe(`for menu type ${menu}`, () => {
      beforeEach(() => {
        ({ editorView } = editor(doc(p('text'))));
        dispatchAnalyticsSpy = jest.fn();
      });

      afterEach(() => {
        if (toolbarOption) {
          toolbarOption.unmount();
        }
      });

      it('should fire analytics event when rule option clicked', () => {
        toolbarOption = mountWithIntl(
          <ToolbarInsertBlock
            horizontalRuleEnabled={true}
            editorView={editorView}
            buttons={menu.numButtons}
            isReducedSpacing={false}
          />,
        );
        menu.clickButton(messages.horizontalRule.defaultMessage, toolbarOption);

        expect(createAnalyticsEvent).toHaveBeenCalledWith({
          action: 'inserted',
          actionSubject: 'document',
          actionSubjectId: 'divider',
          attributes: { inputMethod: menu.name },
          eventType: 'track',
        });
      });

      it('should fire analytics event when panel option is clicked', () => {
        toolbarOption = mountWithIntl(
          <ToolbarInsertBlock
            availableWrapperBlockTypes={[PANEL]}
            onInsertBlockType={jest.fn(() => () => true)}
            editorView={editorView}
            buttons={menu.numButtons}
            isReducedSpacing={false}
            dispatchAnalyticsEvent={dispatchAnalyticsSpy}
          />,
        );
        menu.clickButton(blockTypeMessages.panel.defaultMessage, toolbarOption);

        expect(dispatchAnalyticsSpy).toHaveBeenCalledWith({
          action: 'inserted',
          actionSubject: 'document',
          actionSubjectId: 'panel',
          attributes: { inputMethod: menu.name, panelType: 'info' },
          eventType: 'track',
        });
      });

      it('should fire analytics event when code block option clicked', () => {
        toolbarOption = mountWithIntl(
          <ToolbarInsertBlock
            availableWrapperBlockTypes={[CODE_BLOCK]}
            onInsertBlockType={jest.fn(() => () => true)}
            editorView={editorView}
            buttons={menu.numButtons}
            isReducedSpacing={false}
            dispatchAnalyticsEvent={dispatchAnalyticsSpy}
          />,
        );
        menu.clickButton(
          blockTypeMessages.codeblock.defaultMessage,
          toolbarOption,
        );

        expect(dispatchAnalyticsSpy).toHaveBeenCalledWith({
          action: 'inserted',
          actionSubject: 'document',
          actionSubjectId: 'codeBlock',
          attributes: { inputMethod: menu.name },
          eventType: 'track',
        });
      });

      it('should fire v3 analytics event when table option clicked', () => {
        ({ editorView } = editor(doc(p('text')), [tablesPlugin()]));
        toolbarOption = mountWithIntl(
          <ToolbarInsertBlock
            tableSupported={true}
            editorView={editorView}
            buttons={menu.numButtons}
            isReducedSpacing={false}
          />,
        );
        menu.clickButton(messages.table.defaultMessage, toolbarOption);

        expect(createAnalyticsEvent).toHaveBeenCalledWith({
          action: 'inserted',
          actionSubject: 'document',
          actionSubjectId: 'table',
          attributes: { inputMethod: menu.name },
          eventType: 'track',
        });
      });

      describe('click action option', () => {
        beforeEach(() => {
          uuid.setStatic('local-highlight');
          toolbarOption = mountWithIntl(
            <ToolbarInsertBlock
              actionSupported={true}
              editorView={editorView}
              buttons={menu.numButtons}
              isReducedSpacing={false}
            />,
          );
          menu.clickButton(messages.action.defaultMessage, toolbarOption);
        });

        afterEach(() => {
          uuid.setStatic(false);
        });

        it('should insert action', () => {
          expect(editorView.state.doc).toEqualDocument(
            doc(
              taskList({ localId: 'local-highlight' })(
                taskItem({ localId: 'local-highlight', state: 'TODO' })('text'),
              ),
            ),
          );
        });

        it('should fire v2 analytics event', () => {
          expect(trackEvent).toHaveBeenCalledWith(
            'atlassian.fabric.action.trigger.button',
          );
        });

        it('should fire v3 analytics event', () => {
          expect(createAnalyticsEvent).toHaveBeenCalledWith({
            action: 'inserted',
            actionSubject: 'document',
            actionSubjectId: 'action',
            attributes: expect.objectContaining({ inputMethod: menu.name }),
            eventType: 'track',
          });
        });
      });

      describe('click decision option', () => {
        beforeEach(() => {
          uuid.setStatic('local-highlight');
          toolbarOption = mountWithIntl(
            <ToolbarInsertBlock
              decisionSupported={true}
              editorView={editorView}
              buttons={menu.numButtons}
              isReducedSpacing={false}
            />,
          );
          menu.clickButton(messages.decision.defaultMessage, toolbarOption);
        });

        afterEach(() => {
          uuid.setStatic(false);
        });

        it('should insert decision', () => {
          expect(editorView.state.doc).toEqualDocument(
            doc(
              decisionList({ localId: 'local-highlight' })(
                decisionItem({ localId: 'local-highlight' })('text'),
              ),
            ),
          );
        });

        it('should fire v2 analytics event', () => {
          expect(trackEvent).toHaveBeenCalledWith(
            'atlassian.fabric.decision.trigger.button',
          );
        });

        it('should fire v3 analytics event', () => {
          expect(createAnalyticsEvent).toHaveBeenCalledWith({
            action: 'inserted',
            actionSubject: 'document',
            actionSubjectId: 'decision',
            attributes: expect.objectContaining({ inputMethod: menu.name }),
            eventType: 'track',
          });
        });
      });
    });
  });
});
