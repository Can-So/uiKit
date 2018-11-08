import * as React from 'react';
import { status, uuid } from '@atlaskit/editor-common';
import LabelIcon from '@atlaskit/icon/glyph/label';
import { findDomRefAtPos } from 'prosemirror-utils';
import { NodeSelection } from 'prosemirror-state';
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
    return (
      <WithPluginState
        plugins={{
          statusState: pluginKey,
        }}
        render={({ statusState = {} as StatusState }) => {
          if (statusState.showStatusPickerAt === null) {
            return null;
          }

          const element = findDomRefAtPos(
            statusState.showStatusPickerAt,
            editorView.domAtPos.bind(editorView),
          ) as HTMLElement;

          return (
            <StatusPicker
              autoFocus={statusState.autoFocus}
              element={element}
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
