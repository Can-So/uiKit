import * as React from 'react';
import { alignment } from '@atlaskit/editor-common';
import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import { pluginKey, createPlugin, AlignmentState } from './pm-plugins/main';
import { changeAlignment } from './commands';
import ToolbarAlignment from './ui/ToolbarAlignment';

export const defaultConfig = {
  align: 'left',
};

const alignmentPlugin: EditorPlugin = {
  name: 'alignmentPlugin',

  marks() {
    return [{ name: 'alignment', mark: alignment }];
  },

  pmPlugins() {
    return [
      {
        name: 'alignmentPlugin',
        plugin: ({ props, dispatch }) => createPlugin(dispatch, defaultConfig),
      },
    ];
  },

  primaryToolbarComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    disabled,
    isToolbarReducedSpacing,
  }) {
    return (
      <WithPluginState
        plugins={{
          align: pluginKey,
        }}
        render={({ align }) => {
          return (
            <ToolbarAlignment
              pluginState={align}
              isReducedSpacing={isToolbarReducedSpacing}
              changeAlignment={(align: AlignmentState) =>
                changeAlignment(align)(editorView.state, editorView.dispatch)
              }
              disabled={!align.isEnabled}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsScrollableElement={popupsScrollableElement}
            />
          );
        }}
      />
    );
  },
};

export default alignmentPlugin;
