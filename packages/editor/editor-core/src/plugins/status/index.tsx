import * as React from 'react';
import { status } from '@atlaskit/editor-common';
import LabelIcon from '@atlaskit/icon/glyph/label';
import { findDomRefAtPos } from 'prosemirror-utils';
import { EditorPlugin } from '../../types';
import createStatusPlugin, { StatusState, pluginKey } from './plugin';
import WithPluginState from '../../ui/WithPluginState';
import StatusPicker from './ui/statusPicker';
import { commitStatusPicker, updateStatus, createStatus } from './actions';

const baseStatusPlugin = (): EditorPlugin => ({
  nodes() {
    return [{ name: 'status', node: status }];
  },

  pmPlugins() {
    return [
      {
        name: 'status',
        plugin: createStatusPlugin,
      },
    ];
  },

  contentComponent({ editorView }) {
    const domAtPos = editorView.domAtPos.bind(editorView);
    return (
      <WithPluginState
        plugins={{
          statusState: pluginKey,
        }}
        render={({ statusState = {} as StatusState }) => {
          const { showStatusPickerAt } = statusState;
          if (showStatusPickerAt === null) {
            return null;
          }

          const target = findDomRefAtPos(
            showStatusPickerAt,
            domAtPos,
          ) as HTMLElement;

          const statusNode: any = editorView.state.doc.nodeAt(
            showStatusPickerAt,
          );

          if (!statusNode || statusNode.type.name !== 'status') {
            return null;
          }

          const { text, color, localId } = statusNode.attrs;

          return (
            <StatusPicker
              autoFocus={statusState.autoFocus}
              target={target}
              defaultText={text}
              defaultColor={color}
              defaultLocalId={localId}
              onSelect={status => {
                updateStatus(status)(editorView);
              }}
              onTextChanged={status => {
                updateStatus(status)(editorView);
              }}
              closeStatusPicker={() => {
                commitStatusPicker()(editorView);
              }}
              onEnter={() => {
                commitStatusPicker()(editorView);
              }}
            />
          );
        }}
      />
    );
  },
});

const createQuickInsertMenuItem = () => ({
  title: 'Status',
  priority: 700,
  keywords: ['lozenge'],
  icon: () => <LabelIcon label="Status" />,
  action: createStatus(),
});

export interface StatusOptions {
  menuDisabled: boolean;
}

const decorateWithPluginOptions = (
  plugin: EditorPlugin,
  options: StatusOptions,
): EditorPlugin => {
  if (options.menuDisabled === true) {
    return plugin;
  }
  plugin.pluginsOptions = {
    quickInsert: [createQuickInsertMenuItem()],
  };
  return plugin;
};

const statusPlugin = (options: StatusOptions): EditorPlugin =>
  decorateWithPluginOptions(baseStatusPlugin(), options);

export default statusPlugin;
