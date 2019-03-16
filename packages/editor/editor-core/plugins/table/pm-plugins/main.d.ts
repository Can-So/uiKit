import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { PluginConfig } from '../types';
import { Dispatch } from '../../../event-dispatcher';
import { EventDispatcher } from '../../../event-dispatcher';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
export declare const pluginKey: PluginKey<any>;
export declare const defaultTableSelection: {
    hoveredColumns: never[];
    hoveredRows: never[];
    isInDanger: boolean;
};
export declare enum ACTIONS {
    SET_EDITOR_FOCUS = 0,
    SET_TABLE_REF = 1,
    SET_TARGET_CELL_POSITION = 2,
    CLEAR_HOVER_SELECTION = 3,
    HOVER_COLUMNS = 4,
    HOVER_ROWS = 5,
    HOVER_TABLE = 6,
    TOGGLE_CONTEXTUAL_MENU = 7,
    SHOW_INSERT_COLUMN_BUTTON = 8,
    SHOW_INSERT_ROW_BUTTON = 9,
    HIDE_INSERT_COLUMN_OR_ROW_BUTTON = 10
}
export declare const createPlugin: (dispatch: Dispatch<any>, portalProviderAPI: PortalProviderAPI, eventDispatcher: EventDispatcher<any>, pluginConfig: PluginConfig, appearance?: "comment" | "full-page" | "chromeless" | "mobile" | undefined, dynamicTextSizing?: boolean | undefined) => Plugin<any>;
export declare const getPluginState: (state: EditorState<any>) => any;
