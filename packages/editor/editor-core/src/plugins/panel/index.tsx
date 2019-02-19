import * as React from 'react';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import EditorWarningIcon from '@atlaskit/icon/glyph/editor/warning';
import EditorErrorIcon from '@atlaskit/icon/glyph/editor/error';
import EditorSuccessIcon from '@atlaskit/icon/glyph/editor/success';
import EditorNoteIcon from '@atlaskit/icon/glyph/editor/note';
import { panel, PanelType } from '@atlaskit/adf-schema';

import { EditorPlugin } from '../../types';
import { messages } from '../block-type/types';
import { createPlugin } from './pm-plugins/main';
import { getToolbarConfig } from './toolbar';

import keymap from './pm-plugins/keymaps';
import { EditorState } from 'prosemirror-state';
import {
  addAnalytics,
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  INPUT_METHOD,
  EVENT_TYPE,
  PANEL_TYPE,
} from '../analytics';
import { QuickInsertActionInsert } from '../quick-insert/types';

const insertPanelTypeWithAnalytics = (
  panelType: PANEL_TYPE,
  state: EditorState,
  insert: QuickInsertActionInsert,
) => {
  const tr = insert(insertPanelType(panelType, state));
  if (tr) {
    addAnalytics(tr, {
      action: ACTION.INSERTED,
      actionSubject: ACTION_SUBJECT.DOCUMENT,
      actionSubjectId: ACTION_SUBJECT_ID.PANEL,
      attributes: {
        inputMethod: INPUT_METHOD.QUICK_INSERT,
        panelType,
      },
      eventType: EVENT_TYPE.TRACK,
    });
  }
  return tr;
};

const insertPanelType = (panelType: PanelType, state: EditorState) =>
  state.schema.nodes.panel.createChecked(
    { panelType },
    state.schema.nodes.paragraph.createChecked(),
  );

const panelPlugin: EditorPlugin = {
  nodes() {
    return [{ name: 'panel', node: panel }];
  },

  pmPlugins() {
    return [
      { name: 'panel', plugin: createPlugin },
      {
        name: 'panelKeyMap',
        plugin: () => keymap(),
      },
    ];
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.panel),
        keywords: ['info'],
        priority: 900,
        icon: () => <InfoIcon label={formatMessage(messages.panel)} />,
        action(insert, state) {
          return insertPanelTypeWithAnalytics(PANEL_TYPE.INFO, state, insert);
        },
      },
      {
        title: formatMessage(messages.notePanel),
        keywords: ['note'],
        priority: 1000,
        icon: () => (
          <EditorNoteIcon label={formatMessage(messages.notePanel)} />
        ),
        action(insert, state) {
          return insertPanelTypeWithAnalytics(PANEL_TYPE.NOTE, state, insert);
        },
      },
      {
        title: formatMessage(messages.successPanel),
        keywords: ['success', 'tip'],
        priority: 1000,
        icon: () => (
          <EditorSuccessIcon label={formatMessage(messages.successPanel)} />
        ),
        action(insert, state) {
          return insertPanelTypeWithAnalytics(
            PANEL_TYPE.SUCCESS,
            state,
            insert,
          );
        },
      },
      {
        title: formatMessage(messages.warningPanel),
        keywords: ['warning'],
        priority: 1000,
        icon: () => (
          <EditorWarningIcon label={formatMessage(messages.warningPanel)} />
        ),
        action(insert, state) {
          return insertPanelTypeWithAnalytics(
            PANEL_TYPE.WARNING,
            state,
            insert,
          );
        },
      },
      {
        title: formatMessage(messages.errorPanel),
        keywords: ['error'],
        priority: 1000,
        icon: () => (
          <EditorErrorIcon label={formatMessage(messages.errorPanel)} />
        ),
        action(insert, state) {
          return insertPanelTypeWithAnalytics(PANEL_TYPE.ERROR, state, insert);
        },
      },
    ],
    floatingToolbar: getToolbarConfig,
  },
};

export default panelPlugin;
