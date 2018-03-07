import * as React from 'react';
import { heading, blockquote, hardBreak } from '@atlaskit/editor-common';
import { EditorPlugin } from '../../types';
import { plugin, stateKey } from '../../../plugins/block-type';
import keymapPlugin from '../../../plugins/block-type/keymap';
import inputRulePlugin from '../../../plugins/block-type/input-rule';
import ToolbarBlockType from '../../../ui/ToolbarBlockType';
import { ToolbarSize } from '../../ui/Toolbar';

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
      { rank: 500, plugin: () => plugin },
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
  }) {
    const pluginState = stateKey.getState(editorView.state);
    const isSmall = toolbarSize < ToolbarSize.XL;
    return (
      <ToolbarBlockType
        isSmall={isSmall}
        isDisabled={disabled}
        isReducedSpacing={isToolbarReducedSpacing}
        editorView={editorView}
        pluginState={pluginState}
        popupsMountPoint={popupsMountPoint}
        popupsBoundariesElement={popupsBoundariesElement}
        popupsScrollableElement={popupsScrollableElement}
      />
    );
  },
};

export default blockType;
