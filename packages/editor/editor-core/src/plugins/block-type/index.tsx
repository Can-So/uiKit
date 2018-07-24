import * as React from 'react';
import EditorQuoteIcon from '@atlaskit/icon/glyph/editor/quote';
import { heading, blockquote, hardBreak } from '@atlaskit/editor-common';
import { EditorPlugin } from '../../types';
import { ToolbarSize } from '../../ui/Toolbar';
import { createPlugin, pluginKey } from './pm-plugins/main';
import keymapPlugin from './pm-plugins/keymap';
import inputRulePlugin from './pm-plugins/input-rule';
import ToolbarBlockType from './ui/ToolbarBlockType';
import WithPluginState from '../../ui/WithPluginState';
import { setBlockType } from './commands';

const blockType: EditorPlugin = {
  nodes({ allowBlockType }) {
    const nodes = [
      { name: 'heading', node: heading, rank: 600 },
      { name: 'blockquote', node: blockquote, rank: 700 },
      { name: 'hardBreak', node: hardBreak, rank: 1500 },
    ];

    if (allowBlockType) {
      const exclude = allowBlockType.exclude ? allowBlockType.exclude : [];
      return nodes.filter(node => exclude.indexOf(node.name) === -1);
    }

    return nodes;
  },

  pmPlugins() {
    return [
      {
        rank: 500,
        plugin: ({ props, dispatch }) =>
          createPlugin(dispatch, props.appearance),
      },
      { rank: 510, plugin: ({ schema }) => inputRulePlugin(schema) },
      // Needs to be lower priority than prosemirror-tables.tableEditing
      // plugin as it is currently swallowing right/down arrow events inside tables
      { rank: 925, plugin: ({ schema }) => keymapPlugin(schema) },
    ];
  },

  primaryToolbarComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    toolbarSize,
    disabled,
    isToolbarReducedSpacing,
    eventDispatcher,
  }) {
    const isSmall = toolbarSize < ToolbarSize.XL;
    const boundSetBlockType = name =>
      setBlockType(name)(editorView.state, editorView.dispatch);

    return (
      <WithPluginState
        editorView={editorView}
        eventDispatcher={eventDispatcher}
        plugins={{
          pluginState: pluginKey,
        }}
        render={({ pluginState }) => {
          return (
            <ToolbarBlockType
              isSmall={isSmall}
              isDisabled={disabled}
              isReducedSpacing={isToolbarReducedSpacing}
              setBlockType={boundSetBlockType}
              pluginState={pluginState}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsScrollableElement={popupsScrollableElement}
            />
          );
        }}
      />
    );
  },

  pluginsOptions: {
    quickInsert: [
      {
        title: 'Block quote',
        icon: () => <EditorQuoteIcon label="Block quote" />,
        action(insert, state) {
          return insert(
            state.schema.nodes.blockquote.createChecked(
              {},
              state.schema.nodes.paragraph.createChecked(),
            ),
          );
        },
      },
    ],
  },
};

export default blockType;
export { pluginKey, BlockTypeState } from './pm-plugins/main';
