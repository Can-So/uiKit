import * as React from 'react';
import EditorDateIcon from '@atlaskit/icon/glyph/editor/date';
import { date } from '@atlaskit/editor-common';
import { findDomRefAtPos } from 'prosemirror-utils';
import { NodeSelection } from 'prosemirror-state';

import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import { insertDate, setDatePickerAt } from './actions';
import createDatePlugin, { DateState, pluginKey } from './plugin';
import keymap from './keymap';
import DatePicker from './ui/DatePicker';

export type DateType = {
  year: number;
  month: number;
  day?: number;
};

const datePlugin: EditorPlugin = {
  nodes() {
    return [{ name: 'date', node: date }];
  },

  pmPlugins() {
    return [
      {
        name: 'date',
        plugin: createDatePlugin,
      },
      { name: 'dateKeymap', plugin: ({ schema }) => keymap(schema) },
    ];
  },

  contentComponent({ editorView }) {
    const { dispatch } = editorView;
    return (
      <WithPluginState
        plugins={{
          dateState: pluginKey,
        }}
        render={({ dateState = {} as DateState }) => {
          if (dateState.showDatePickerAt === null) {
            return null;
          }

          const element = findDomRefAtPos(
            dateState.showDatePickerAt,
            editorView.domAtPos.bind(editorView),
          ) as HTMLElement;

          return (
            <DatePicker
              element={element}
              onSelect={date => insertDate(date)(editorView.state, dispatch)}
              closeDatePicker={() =>
                setDatePickerAt(null)(editorView.state, dispatch)
              }
            />
          );
        }}
      />
    );
  },

  pluginsOptions: {
    quickInsert: [
      {
        title: 'Date',
        priority: 800,
        keywords: ['time', '/'],
        icon: () => <EditorDateIcon label="Date" />,
        action(insert, state) {
          const dateNode = state.schema.nodes.date.createChecked({
            timestamp: Date.now(),
          });

          const tr = insert(dateNode);
          const showDatePickerAt = tr.selection.from - 2;
          tr.setSelection(NodeSelection.create(tr.doc, showDatePickerAt));
          return tr.setMeta(pluginKey, { showDatePickerAt });
        },
      },
    ],
  },
};

export default datePlugin;
