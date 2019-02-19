import { EditorView } from 'prosemirror-view';
import {
  Plugin,
  PluginKey,
  Transaction,
  EditorState,
  TextSelection,
} from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
import { isMarkTypeAllowedInCurrentSelection } from '../../../utils';
import {
  TypeAheadHandler,
  TypeAheadItem,
  TypeAheadItemsLoader,
} from '../types';
import { dismissCommand } from '../commands/dismiss';
import { itemsListUpdated } from '../commands/items-list-updated';
import { updateQueryCommand } from '../commands/update-query';
import { isQueryActive } from '../utils/is-query-active';
import { findTypeAheadQuery } from '../utils/find-query-mark';

export const pluginKey = new PluginKey('typeAheadPlugin');

export type PluginState = {
  isAllowed: boolean;
  active: boolean;
  prevActiveState: boolean;
  query: string | null;
  trigger: string | null;
  typeAheadHandler: TypeAheadHandler | null;
  items: Array<TypeAheadItem>;
  itemsLoader: TypeAheadItemsLoader;
  currentIndex: number;
  queryMarkPos: number | null;
  queryStarted: number;
  upKeyCount: number;
  downKeyCount: number;
};

type EditorViewWithDOMChange = EditorView & {
  inDOMChange: {
    composing: boolean;
    finish: (force: boolean) => void;
  };
};

export const ACTIONS = {
  SELECT_PREV: 'SELECT_PREV',
  SELECT_NEXT: 'SELECT_NEXT',
  SELECT_CURRENT: 'SELECT_CURRENT',
  SET_CURRENT_INDEX: 'SET_CURRENT_INDEX',
  SET_QUERY: 'SET_QUERY',
  ITEMS_LIST_UPDATED: 'ITEMS_LIST_UPDATED',
};

export function createInitialPluginState(
  prevActiveState = false,
  isAllowed = true,
): PluginState {
  return {
    isAllowed,
    active: false,
    prevActiveState,
    query: null,
    trigger: null,
    typeAheadHandler: null,
    currentIndex: 0,
    items: [],
    itemsLoader: null,
    queryMarkPos: null,
    queryStarted: 0,
    upKeyCount: 0,
    downKeyCount: 0,
  };
}

export function createPlugin(
  dispatch: Dispatch,
  reactContext: () => { [key: string]: any },
  typeAhead,
): Plugin {
  return new Plugin({
    key: pluginKey,
    state: {
      init() {
        return createInitialPluginState();
      },

      apply(tr, pluginState, oldState, state) {
        const meta = tr.getMeta(pluginKey) || {};
        const { action, params } = meta;

        switch (action) {
          case ACTIONS.SET_CURRENT_INDEX:
            return setCurrentItemIndex({
              dispatch,
              pluginState,
              tr,
              params,
            });

          case ACTIONS.SELECT_PREV:
            return selectPrevActionHandler({ dispatch, pluginState, tr });

          case ACTIONS.SELECT_NEXT:
            return selectNextActionHandler({ dispatch, pluginState, tr });

          case ACTIONS.ITEMS_LIST_UPDATED:
            return itemsListUpdatedActionHandler({ dispatch, pluginState, tr });

          case ACTIONS.SELECT_CURRENT:
            const { from, to } = tr.selection;
            const { typeAheadQuery } = state.schema.marks;

            // If inserted content has typeAheadQuery mark should fallback to default action handler
            return tr.doc.rangeHasMark(from - 1, to, typeAheadQuery)
              ? defaultActionHandler({
                  dispatch,
                  reactContext,
                  typeAhead,
                  state,
                  pluginState,
                  tr,
                })
              : selectCurrentActionHandler({ dispatch, pluginState, tr });

          case ACTIONS.SET_QUERY:
            return updateQueryHandler({ dispatch, pluginState, tr, params });

          default:
            return defaultActionHandler({
              dispatch,
              reactContext,
              typeAhead,
              state,
              pluginState,
              tr,
            });
        }
      },
    },

    view() {
      return {
        update(editorView) {
          const pluginState = pluginKey.getState(
            editorView.state,
          ) as PluginState;

          if (!pluginState) {
            return;
          }

          const { state, dispatch } = editorView;
          const { doc, selection } = state;
          const { from, to } = selection;
          const { typeAheadQuery } = state.schema.marks;

          // Disable type ahead query when removing trigger.
          if (
            pluginState.active &&
            !pluginState.query &&
            !pluginState.trigger
          ) {
            dismissCommand()(state, dispatch);
            return;
          }

          // Disable type ahead query when the first character is a space.
          if (
            pluginState.active &&
            (pluginState.query || '').indexOf(' ') === 0
          ) {
            dismissCommand()(state, dispatch);
            return;
          }

          // Optimization to not call dismissCommand if plugin is in an inactive state.
          if (
            !pluginState.active &&
            pluginState.prevActiveState &&
            !doc.rangeHasMark(from - 1, to, typeAheadQuery)
          ) {
            dismissCommand()(state, dispatch);
            return;
          }

          // Fetch type ahead items if handler returned a promise.
          if (pluginState.active && pluginState.itemsLoader) {
            pluginState.itemsLoader.promise.then(items =>
              itemsListUpdated(items)(editorView.state, dispatch),
            );
          }
        },
      };
    },
    props: {
      handleDOMEvents: {
        input(view, event: any) {
          const {
            state,
            dispatch,
            inDOMChange: domChange,
          } = view as EditorViewWithDOMChange;
          const { selection, schema } = state;

          if (
            selection instanceof TextSelection &&
            selection.$cursor &&
            schema.marks.typeAheadQuery.isInSet(selection.$cursor.marks())
          ) {
            updateQueryCommand(event.data)(state, dispatch);
            return false;
          }

          const triggers = typeAhead.map(
            typeAheadHandler => typeAheadHandler.trigger,
          );

          if (
            triggers.indexOf(event.data) !== -1 &&
            event.inputType === 'insertCompositionText' &&
            domChange &&
            domChange.composing
          ) {
            domChange.finish(true);
          }

          return false;
        },
      },
    },
  });
}

/**
 *
 * Action Handlers
 *
 */

export type ActionHandlerParams = {
  dispatch: Dispatch;
  pluginState: PluginState;
  tr: Transaction;
  params?: {
    currentIndex?: number;
    query?: string;
  };
};

export function createItemsLoader(
  promiseOfItems: Promise<Array<TypeAheadItem>>,
): TypeAheadItemsLoader {
  let canceled = false;

  return {
    promise: new Promise((resolve, reject) => {
      promiseOfItems
        .then(result => !canceled && resolve(result))
        .catch(error => !canceled && reject(error));
    }),
    cancel() {
      canceled = true;
    },
  };
}

export function defaultActionHandler({
  dispatch,
  reactContext,
  typeAhead,
  pluginState,
  state,
  tr,
}: {
  dispatch: Dispatch;
  reactContext: () => { [key: string]: any };
  typeAhead: Array<TypeAheadHandler>;
  pluginState: PluginState;
  state: EditorState;
  tr: Transaction;
}): PluginState {
  const { typeAheadQuery } = state.schema.marks;
  const { doc, selection } = state;
  const { from, to } = selection;
  const isActive = isQueryActive(typeAheadQuery, doc, from - 1, to);
  const isAllowed = isMarkTypeAllowedInCurrentSelection(typeAheadQuery, state);

  if (!isAllowed && !isActive) {
    const newPluginState = createInitialPluginState(
      pluginState.active,
      isAllowed,
    );
    dispatch(pluginKey, newPluginState);
    return newPluginState;
  }

  const { nodeBefore } = selection.$from;

  if (!isActive || !nodeBefore || !pluginState) {
    const newPluginState = createInitialPluginState(
      pluginState ? pluginState.active : false,
    );
    if (!pluginState || pluginState.active || !pluginState.isAllowed) {
      dispatch(pluginKey, newPluginState);
    }
    return newPluginState;
  }

  const typeAheadMark = typeAheadQuery.isInSet(nodeBefore.marks || []);
  if (!typeAheadMark || !typeAheadMark.attrs.trigger) {
    return pluginState;
  }

  const textContent = nodeBefore.textContent || '';
  const trigger = typeAheadMark.attrs.trigger.replace(
    /([^\x00-\xFF]|[\s\n])+/g,
    '',
  );

  // If trigger has been removed, reset plugin state
  if (!textContent.includes(trigger)) {
    const newPluginState = { ...createInitialPluginState(true), active: true };
    dispatch(pluginKey, newPluginState);
    return newPluginState;
  }

  const query = textContent
    .replace(/^([^\x00-\xFF]|[\s\n])+/g, '')
    .replace(trigger, '');

  const typeAheadHandler = typeAhead.find(t => t.trigger === trigger)!;
  let typeAheadItems: Array<TypeAheadItem> | Promise<Array<TypeAheadItem>> = [];
  let itemsLoader: TypeAheadItemsLoader = null;

  try {
    const { intl } = reactContext();
    typeAheadItems = typeAheadHandler.getItems(
      query,
      state,
      intl,
      {
        prevActive: pluginState.prevActiveState,
        queryChanged: query !== pluginState.query,
      },
      tr,
      dispatch,
    );

    if (pluginState.itemsLoader) {
      pluginState.itemsLoader.cancel();
    }

    if ((typeAheadItems as Promise<Array<TypeAheadItem>>).then) {
      itemsLoader = createItemsLoader(typeAheadItems as Promise<
        Array<TypeAheadItem>
      >);
      typeAheadItems = pluginState.items;
    }
  } catch (e) {}

  const queryMark = findTypeAheadQuery(state);

  const newPluginState = {
    isAllowed,
    query,
    trigger,
    typeAheadHandler,
    active: true,
    prevActiveState: pluginState.active,
    items: typeAheadItems as Array<TypeAheadItem>,
    itemsLoader: itemsLoader,
    currentIndex: pluginState.currentIndex,
    queryMarkPos: queryMark !== null ? queryMark.start : null,
    queryStarted: Date.now(),
    upKeyCount: 0,
    downKeyCount: 0,
  };

  dispatch(pluginKey, newPluginState);
  return newPluginState;
}

export function setCurrentItemIndex({
  dispatch,
  pluginState,
  params,
}: ActionHandlerParams) {
  if (!params) {
    return pluginState;
  }

  const newPluginState = {
    ...pluginState,
    currentIndex:
      params.currentIndex || params.currentIndex === 0
        ? params.currentIndex
        : pluginState.currentIndex,
  };

  dispatch(pluginKey, newPluginState);
  return newPluginState;
}

export function updateQueryHandler({
  dispatch,
  pluginState,
  params,
}: ActionHandlerParams): PluginState {
  if (!params) {
    return pluginState;
  }

  const newPluginState = {
    ...pluginState,
    query: typeof params.query === 'string' ? params.query : null,
  };

  dispatch(pluginKey, newPluginState);
  return newPluginState;
}

export function selectPrevActionHandler({
  dispatch,
  pluginState,
}: ActionHandlerParams): PluginState {
  const newIndex = pluginState.currentIndex - 1;
  const newPluginState = {
    ...pluginState,
    currentIndex: newIndex < 0 ? pluginState.items.length - 1 : newIndex,
    upKeyCount: ++pluginState.upKeyCount,
  };
  dispatch(pluginKey, newPluginState);
  return newPluginState;
}

export function selectNextActionHandler({
  dispatch,
  pluginState,
}: ActionHandlerParams): PluginState {
  const newIndex = pluginState.currentIndex + 1;
  const newPluginState = {
    ...pluginState,
    currentIndex: newIndex > pluginState.items.length - 1 ? 0 : newIndex,
    downKeyCount: ++pluginState.downKeyCount,
  };
  dispatch(pluginKey, newPluginState);
  return newPluginState;
}

export function itemsListUpdatedActionHandler({
  dispatch,
  pluginState,
  tr,
}: ActionHandlerParams): PluginState {
  const items = tr.getMeta(pluginKey).items;
  const newPluginState = {
    ...pluginState,
    items,
    itemsLoader: null,
    currentIndex:
      pluginState.currentIndex > items.length ? 0 : pluginState.currentIndex,
  };
  dispatch(pluginKey, newPluginState);
  return newPluginState;
}

export function selectCurrentActionHandler({
  dispatch,
  pluginState,
}: ActionHandlerParams): PluginState {
  const newPluginState = createInitialPluginState(false);
  dispatch(pluginKey, newPluginState);
  return newPluginState;
}
