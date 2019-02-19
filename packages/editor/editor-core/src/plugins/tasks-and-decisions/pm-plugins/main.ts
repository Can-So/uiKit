import { Plugin, PluginKey } from 'prosemirror-state';
import { Node as PMNode } from 'prosemirror-model';
import { uuid } from '@atlaskit/adf-schema';
import { ProviderFactory } from '@atlaskit/editor-common';
import { findParentNodeOfType } from 'prosemirror-utils';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { decisionItemNodeView } from '../nodeviews/decisionItem';
import { taskItemNodeViewFactory } from '../nodeviews/taskItem';
import { EditorAppearance } from '../../../types';
import { Dispatch } from '../../../event-dispatcher';

export const stateKey = new PluginKey('tasksAndDecisionsPlugin');

export interface TaskDecisionPluginState {
  currentTaskDecisionItem: PMNode | undefined;
}

export function createPlugin(
  portalProviderAPI: PortalProviderAPI,
  providerFactory: ProviderFactory,
  dispatch: Dispatch,
  editorAppearance?: EditorAppearance,
) {
  return new Plugin({
    props: {
      nodeViews: {
        taskItem: taskItemNodeViewFactory(portalProviderAPI, providerFactory),
        decisionItem: decisionItemNodeView(portalProviderAPI),
      },
    },
    state: {
      init() {
        return { insideTaskDecisionItem: false };
      },
      apply(tr, pluginState) {
        const newPluginState = tr.getMeta(stateKey) || pluginState;
        dispatch(stateKey, newPluginState);
        return newPluginState;
      },
    },
    view() {
      return {
        update: view => {
          if (editorAppearance !== 'mobile') {
            return;
          }

          /**
           * For composition we need to hide the placeholder when the user is
           * inside of a taskItem, this is done via pluginState since focus always
           * lies with the root PM node.
           *
           * For web this should always display the placeholder until there is content.
           * Only mobile will hide the placeholder on focus.
           *
           * @see ED-5924
           */
          const { state, dispatch } = view;
          const { selection, schema } = state;

          const {
            currentTaskDecisionItem,
          }: TaskDecisionPluginState = stateKey.getState(state);
          const taskDecisionItem = findParentNodeOfType([
            schema.nodes.taskItem,
            schema.nodes.decisionItem,
          ])(selection);

          if (!taskDecisionItem && currentTaskDecisionItem) {
            dispatch(
              state.tr.setMeta(stateKey, {
                currentTaskDecisionItem: undefined,
              }),
            );
            return;
          }

          if (
            taskDecisionItem &&
            currentTaskDecisionItem &&
            taskDecisionItem.node.eq(currentTaskDecisionItem) === false
          ) {
            dispatch(
              state.tr.setMeta(stateKey, {
                currentTaskDecisionItem: taskDecisionItem.node,
              }),
            );
            return;
          }

          if (taskDecisionItem && !currentTaskDecisionItem) {
            dispatch(
              state.tr.setMeta(stateKey, {
                currentTaskDecisionItem: taskDecisionItem.node,
              }),
            );
            return;
          }
        },
      };
    },
    key: stateKey,
    /*
     * After each transaction, we search through the document for any decisionList/Item & taskList/Item nodes
     * that do not have the localId attribute set and generate a random UUID to use. This is to replace a previous
     * Prosemirror capabibility where node attributes could be generated dynamically.
     * See https://discuss.prosemirror.net/t/release-0-23-0-possibly-to-be-1-0-0/959/17 for a discussion of this approach.
     *
     * Note: we currently do not handle the edge case where two nodes may have the same localId
     */
    appendTransaction: (transactions, oldState, newState) => {
      const tr = newState.tr;
      let modified = false;
      if (transactions.some(transaction => transaction.docChanged)) {
        // Adds a unique id to a node
        newState.doc.descendants((node, pos) => {
          const {
            decisionList,
            decisionItem,
            taskList,
            taskItem,
          } = newState.schema.nodes;
          if (
            !!node.type &&
            (node.type === decisionList ||
              node.type === decisionItem ||
              node.type === taskList ||
              node.type === taskItem)
          ) {
            const { localId, ...rest } = node.attrs;
            if (localId === undefined || localId === null || localId === '') {
              tr.setNodeMarkup(pos, undefined, {
                localId: uuid.generate(),
                ...rest,
              });
              modified = true;
            }
          }
        });
      }

      if (modified) {
        return tr;
      }
    },
  });
}
