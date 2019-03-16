import { Plugin, PluginKey, Transaction, EditorState } from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
import { TypeAheadHandler, TypeAheadItem, TypeAheadItemsLoader } from '../types';
export declare const pluginKey: PluginKey<any>;
export declare type PluginState = {
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
export declare const ACTIONS: {
    SELECT_PREV: string;
    SELECT_NEXT: string;
    SELECT_CURRENT: string;
    SET_CURRENT_INDEX: string;
    SET_QUERY: string;
    ITEMS_LIST_UPDATED: string;
};
export declare function createInitialPluginState(prevActiveState?: boolean, isAllowed?: boolean): PluginState;
export declare function createPlugin(dispatch: Dispatch, reactContext: () => {
    [key: string]: any;
}, typeAhead: Array<TypeAheadHandler>): Plugin;
/**
 *
 * Action Handlers
 *
 */
export declare type ActionHandlerParams = {
    dispatch: Dispatch;
    pluginState: PluginState;
    tr: Transaction;
    params?: {
        currentIndex?: number;
        query?: string;
    };
};
export declare function createItemsLoader(promiseOfItems: Promise<Array<TypeAheadItem>>): TypeAheadItemsLoader;
export declare function defaultActionHandler({ dispatch, reactContext, typeAhead, pluginState, state, tr, }: {
    dispatch: Dispatch;
    reactContext: () => {
        [key: string]: any;
    };
    typeAhead: Array<TypeAheadHandler>;
    pluginState: PluginState;
    state: EditorState;
    tr: Transaction;
}): PluginState;
export declare function setCurrentItemIndex({ dispatch, pluginState, params, }: ActionHandlerParams): PluginState;
export declare function updateQueryHandler({ dispatch, pluginState, params, }: ActionHandlerParams): PluginState;
export declare function selectPrevActionHandler({ dispatch, pluginState, }: ActionHandlerParams): PluginState;
export declare function selectNextActionHandler({ dispatch, pluginState, }: ActionHandlerParams): PluginState;
export declare function itemsListUpdatedActionHandler({ dispatch, pluginState, tr, }: ActionHandlerParams): PluginState;
export declare function selectCurrentActionHandler({ dispatch, pluginState, }: ActionHandlerParams): PluginState;
