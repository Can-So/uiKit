import * as React from 'react';
import { orderedList, bulletList, listItem } from '@atlaskit/editor-common';
import { EditorPlugin } from '../../types';
import { ToolbarSize } from '../../ui/Toolbar';
import ToolbarLists from './ui/ToolbarLists';
import { createPlugin, pluginKey } from './pm-plugins/main';
import inputRulePlugin from './pm-plugins/input-rule';
import keymapPlugin from './pm-plugins/keymap';
import WithPluginState from '../../ui/WithPluginState';

const listPlugin: EditorPlugin = {
  nodes() {
    return [
      { name: 'bulletList', node: bulletList, rank: 300 },
      { name: 'orderedList', node: orderedList, rank: 400 },
      { name: 'listItem', node: listItem, rank: 500 },
    ];
  },

  pmPlugins() {
    return [
      { rank: 600, plugin: ({ dispatch }) => createPlugin(dispatch) },
      { rank: 620, plugin: ({ schema }) => inputRulePlugin(schema) },
      { rank: 640, plugin: ({ schema }) => keymapPlugin(schema) },
    ];
  },

  primaryToolbarComponent({
    editorView,
    appearance,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    toolbarSize,
    disabled,
    isToolbarReducedSpacing,
  }) {
    const isSmall = toolbarSize < ToolbarSize.L;
    const isSeparator = toolbarSize >= ToolbarSize.S;

    return (
      <WithPluginState
        plugins={{ listsState: pluginKey }}
        render={({ listsState }) => (
          <ToolbarLists
            isSmall={isSmall}
            isSeparator={isSeparator}
            isReducedSpacing={isToolbarReducedSpacing}
            disabled={disabled}
            editorView={editorView}
            popupsMountPoint={popupsMountPoint}
            popupsBoundariesElement={popupsBoundariesElement}
            popupsScrollableElement={popupsScrollableElement}
            allowTasks={
              !!editorView.state.schema.nodes.taskItem &&
              appearance === 'full-page'
            }
            bulletListActive={listsState.bulletListActive}
            bulletListDisabled={listsState.bulletListDisabled}
            orderedListActive={listsState.orderedListActive}
            orderedListDisabled={listsState.orderedListDisabled}
          />
        )}
      />
    );
  },
};

export default listPlugin;
