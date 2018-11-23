import * as React from 'react';
import {
  Plugin,
  NodeSelection,
  Transaction,
  TextSelection,
} from 'prosemirror-state';
import { PluginKey } from 'prosemirror-state';
import { placeholder } from '@atlaskit/editor-common';
import { EditorPlugin } from '../../types/editor-plugin';
import WithPluginState from '../../ui/WithPluginState';
import { Dispatch } from '../../event-dispatcher';
import { isEmptyNode } from '../../utils/document';
import { FakeTextCursorSelection } from '../fake-text-cursor/cursor';
import PlaceholderTextNodeView from './nodeviews/placeholder-text';
import PlaceholderFloatingToolbar from './ui/PlaceholderFloatingToolbar';
import {
  hidePlaceholderFloatingToolbar,
  insertPlaceholderTextAtSelection,
} from './actions';

export const pluginKey = new PluginKey('placeholderTextPlugin');

export interface PlaceholderTextOptions {
  allowInserting?: boolean;
}

export interface PluginState {
  showInsertPanelAt: number | null;
  // Enables the "Insert Placeholder Text" dropdown item
  allowInserting: boolean;
}

export function createPlugin(
  dispatch: Dispatch<PluginState>,
  options: PlaceholderTextOptions,
): Plugin | undefined {
  const allowInserting = !!options.allowInserting;
  return new Plugin({
    key: pluginKey,
    state: {
      init: () =>
        ({
          showInsertPanelAt: null,
          allowInserting,
        } as PluginState),
      apply: (tr: Transaction, state: PluginState) => {
        const meta = tr.getMeta(pluginKey) as Partial<PluginState>;
        if (meta && meta.showInsertPanelAt !== undefined) {
          const newState = {
            showInsertPanelAt: meta.showInsertPanelAt,
            allowInserting,
          };
          dispatch(pluginKey, newState);
          return newState;
        } else if (state.showInsertPanelAt) {
          const newState = {
            showInsertPanelAt: tr.mapping.map(state.showInsertPanelAt),
            allowInserting,
          };
          dispatch(pluginKey, newState);
          return newState;
        }
        return state;
      },
    },
    props: {
      nodeViews: {
        placeholder(node, view, getPos) {
          return new PlaceholderTextNodeView(node, view, getPos);
        },
      },
    },
    appendTransaction(transactions, oldState, newState) {
      if (transactions.some(txn => txn.docChanged)) {
        const didPlaceholderExistBeforeTxn =
          oldState.selection.$head.nodeAfter ===
          newState.selection.$head.nodeAfter;
        const adjacentNode = newState.selection.$head.nodeAfter;
        const adjacentNodePos = newState.selection.$head.pos;
        const placeholderNodeType = newState.schema.nodes.placeholder;
        if (
          adjacentNode &&
          adjacentNode.type === placeholderNodeType &&
          didPlaceholderExistBeforeTxn
        ) {
          // Check that cursor has moved forward in the document **and** that there is content before the cursor
          const wasContentAdded =
            oldState.selection.$head.pos < newState.selection.$head.pos &&
            !isEmptyNode(newState.selection.$head.nodeBefore!);
          if (wasContentAdded) {
            const { $from, $to } = NodeSelection.create(
              newState.doc,
              adjacentNodePos,
            );
            return newState.tr
              .setMeta('isLocal', true)
              .deleteRange($from.pos, $to.pos);
          }
        }
      }

      // Handle Fake Text Cursor for Floating Toolbar
      if (
        !(pluginKey.getState(oldState) as PluginState).showInsertPanelAt &&
        (pluginKey.getState(newState) as PluginState).showInsertPanelAt
      ) {
        return newState.tr.setSelection(
          new FakeTextCursorSelection(newState.selection.$from),
        );
      }
      if (
        (pluginKey.getState(oldState) as PluginState).showInsertPanelAt &&
        !(pluginKey.getState(newState) as PluginState).showInsertPanelAt
      ) {
        if (newState.selection instanceof FakeTextCursorSelection) {
          return newState.tr.setSelection(
            new TextSelection(newState.selection.$from),
          );
        }
      }
    },
  });
}

const placeholderTextPlugin = (
  options: PlaceholderTextOptions,
): EditorPlugin => ({
  nodes() {
    return [{ name: 'placeholder', node: placeholder }];
  },

  pmPlugins() {
    return [
      {
        name: 'placeholderText',
        plugin: ({ schema, props, dispatch }) =>
          createPlugin(dispatch, options),
      },
    ];
  },

  contentComponent({ editorView, popupsMountPoint, popupsBoundariesElement }) {
    const insertPlaceholderText = (value: string) =>
      insertPlaceholderTextAtSelection(value)(
        editorView.state,
        editorView.dispatch,
      );
    const hidePlaceholderToolbar = () =>
      hidePlaceholderFloatingToolbar(editorView.state, editorView.dispatch);
    const getNodeFromPos = (pos: number) => editorView.domAtPos(pos).node;
    const getFixedCoordinatesFromPos = (pos: number) =>
      editorView.coordsAtPos(pos);
    const setFocusInEditor = () => editorView.focus();

    return (
      <WithPluginState
        plugins={{ placeholderTextState: pluginKey }}
        render={({ placeholderTextState = {} as PluginState }) => {
          if (placeholderTextState.showInsertPanelAt) {
            return (
              <PlaceholderFloatingToolbar
                editorViewDOM={editorView.dom as HTMLElement}
                popupsMountPoint={popupsMountPoint}
                popupsBoundariesElement={popupsBoundariesElement}
                getFixedCoordinatesFromPos={getFixedCoordinatesFromPos}
                getNodeFromPos={getNodeFromPos}
                hidePlaceholderFloatingToolbar={hidePlaceholderToolbar}
                showInsertPanelAt={placeholderTextState.showInsertPanelAt}
                insertPlaceholder={insertPlaceholderText}
                setFocusInEditor={setFocusInEditor}
              />
            );
          }
          return null;
        }}
      />
    );
  },
});
export default placeholderTextPlugin;
