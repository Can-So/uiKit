import { DecorationSet, Decoration } from 'prosemirror-view';
import {
  EditorState,
  Plugin,
  PluginKey,
  Selection,
  Transaction,
} from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Color as ColorType } from '@atlaskit/status';
import StatusNodeView from './nodeviews/status';
import { ReactNodeView } from '../../nodeviews';
import { PMPluginFactory } from '../../types';
import { ZWSP } from '../../utils';
import {
  mayGetStatusNodeAt,
  isEmptyStatus,
  setSelectionNearPos,
} from './utils';

export const pluginKey = new PluginKey('statusPlugin');

export type StatusType = {
  color: ColorType;
  text: string;
  localId?: string;
};

export type StatusState = {
  isNew: boolean;
  showStatusPickerAt: number | null;
  selectionChanges: SelectionChange;
  selectedStatus: StatusType | null;
};

export type SelectionChangeHandler = (
  newSelection: Selection,
  prevSelection: Selection,
) => any;

export class SelectionChange {
  private changeHandlers: SelectionChangeHandler[] = [];

  constructor() {
    this.changeHandlers = [];
  }

  subscribe(cb: SelectionChangeHandler) {
    this.changeHandlers.push(cb);
  }

  unsubscribe(cb: SelectionChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  notifyNewSelection(newSelection: Selection, prevSelection: Selection) {
    this.changeHandlers.forEach(cb => cb(newSelection, prevSelection));
  }
}

const createPlugin: PMPluginFactory = ({ dispatch, portalProviderAPI }) =>
  new Plugin({
    state: {
      init: () => ({
        isNew: false,
        selectionChanges: new SelectionChange(),
        showStatusPickerAt: null,
        selectedStatus: null,
      }),
      apply(tr, state: StatusState, editorState) {
        const meta = tr.getMeta(pluginKey);
        const nodeAtSelection = tr.doc.nodeAt(tr.selection.from);

        if (
          state.showStatusPickerAt &&
          (!nodeAtSelection ||
            nodeAtSelection.type !== editorState.schema.nodes.status ||
            // note: Status node has to==from+1 so from==to is positioned just before the Status node and StatusPicker should be dismissed
            tr.selection.from === tr.selection.to)
        ) {
          let newState = {
            ...state,
            showStatusPickerAt: null,
            selectedStatus: null,
          };
          dispatch(pluginKey, newState);
          return newState;
        }

        if (meta) {
          let selectedStatus: StatusType | null = null;
          if (
            meta.showStatusPickerAt &&
            meta.showStatusPickerAt !== state.showStatusPickerAt
          ) {
            const statusNode = tr.doc.nodeAt(meta.showStatusPickerAt);
            if (statusNode) {
              selectedStatus = statusNode.attrs as StatusType;
            }
          }
          let newState = { ...state, ...meta, selectedStatus };

          dispatch(pluginKey, newState);
          return newState;
        }

        if (tr.docChanged && state.showStatusPickerAt) {
          const { pos, deleted } = tr.mapping.mapResult(
            state.showStatusPickerAt,
          );

          const newState = {
            showStatusPickerAt: deleted ? null : pos,
            selectedStatus: null,
          };

          if (newState.showStatusPickerAt !== state.showStatusPickerAt) {
            dispatch(pluginKey, newState);

            return newState;
          }
        }
        return state;
      },
    },
    appendTransaction: (
      transactions: Transaction[],
      oldEditorState: EditorState,
      newEditorState: EditorState,
    ) => {
      let changed = false;
      let tr = newEditorState.tr;

      // user leaves the StatusPicker with empty text and selects a new node
      if (transactions.find(tr => tr.selectionSet)) {
        let oldStatus = mayGetStatusNodeAt(oldEditorState.selection);
        let newStatus = mayGetStatusNodeAt(newEditorState.selection);
        if (
          oldStatus &&
          ((newStatus && oldStatus.localId !== newStatus.localId) || !newStatus)
        ) {
          if (isEmptyStatus(oldStatus)) {
            const pos = oldEditorState.selection.from;
            tr.delete(tr.mapping.map(pos), tr.mapping.map(pos + 1));
            setSelectionNearPos(tr, pos); // without forcing the selection the selection border in status react component gets lost
            changed = true;
          }
        }
      }
      return changed ? tr : undefined;
    },
    key: pluginKey,
    props: {
      nodeViews: {
        status: ReactNodeView.fromComponent(StatusNodeView, portalProviderAPI),
      },
      decorations(state: EditorState) {
        const { tr } = state;
        const nodeAtSelection = tr.doc.nodeAt(tr.selection.from);

        if (
          nodeAtSelection &&
          nodeAtSelection.type === state.schema.nodes.status
        ) {
          const delayedNodeRendering = () => {
            return document.createTextNode(ZWSP);
          };

          const decoration = Decoration.widget(
            tr.selection.from,
            delayedNodeRendering,
            {
              side: 1,
              key: '#status-zero-width-char-decoration',
            },
          );

          const { doc } = state;
          return DecorationSet.create(doc, [decoration]);
        }

        return null;
      },
    },
    view: (_view: EditorView) => {
      return {
        update: (view: EditorView, prevState: EditorState) => {
          const newSelection = view.state.selection;
          const prevSelection = prevState.selection;
          if (!prevSelection.eq(newSelection)) {
            // selection changed
            const pluginState: StatusState = pluginKey.getState(view.state);
            const { selectionChanges } = pluginState;
            if (selectionChanges) {
              selectionChanges.notifyNewSelection(newSelection, prevSelection);
            }
          }
        },
      };
    },
  });

export default createPlugin;
