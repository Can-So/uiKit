import { Node as PmNode } from 'prosemirror-model';
import { Transaction } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
import { TableLayout } from '@atlaskit/adf-schema';
export declare type PermittedLayoutsDescriptor = TableLayout[] | 'all';
export declare type Cell = {
    pos: number;
    start: number;
    node: PmNode;
};
export declare type CellTransform = (cell: Cell) => (tr: Transaction) => Transaction;
export interface PluginConfig {
    advanced?: boolean;
    allowBackgroundColor?: boolean;
    allowColumnResizing?: boolean;
    allowHeaderColumn?: boolean;
    allowHeaderRow?: boolean;
    allowMergeCells?: boolean;
    allowNumberColumn?: boolean;
    isHeaderRowRequired?: boolean;
    stickToolbarToBottom?: boolean;
    permittedLayouts?: PermittedLayoutsDescriptor;
    allowControls?: boolean;
}
export interface TablePluginState {
    decorationSet: DecorationSet;
    editorHasFocus?: boolean;
    hoveredColumns: number[];
    hoveredRows: number[];
    pluginConfig: PluginConfig;
    targetCellPosition?: number;
    tableNode?: PmNode;
    tableRef?: HTMLElement;
    tableFloatingToolbarTarget?: HTMLElement;
    isContextualMenuOpen?: boolean;
    isInDanger?: boolean;
    insertColumnButtonIndex?: number;
    insertRowButtonIndex?: number;
}
export interface CellRect {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
export interface ColumnResizingPlugin {
    handleWidth?: number;
    cellMinWidth?: number;
    lastColumnResizable?: boolean;
    dynamicTextSizing?: boolean;
}
export declare const TableDecorations: {
    CONTROLS_HOVER: string;
};
export declare const TableCssClassName: {
    COLUMN_CONTROLS_WRAPPER: string;
    COLUMN_CONTROLS: string;
    COLUMN_CONTROLS_INNER: string;
    COLUMN_CONTROLS_BUTTON_WRAP: string;
    ROW_CONTROLS_WRAPPER: string;
    ROW_CONTROLS: string;
    ROW_CONTROLS_INNER: string;
    ROW_CONTROLS_BUTTON_WRAP: string;
    CONTROLS_BUTTON: string;
    CONTROLS_BUTTON_ICON: string;
    CONTROLS_INSERT_BUTTON: string;
    CONTROLS_INSERT_BUTTON_INNER: string;
    CONTROLS_INSERT_BUTTON_WRAP: string;
    CONTROLS_INSERT_LINE: string;
    CONTROLS_BUTTON_OVERLAY: string;
    LAYOUT_BUTTON: string;
    CONTROLS_INSERT_MARKER: string;
    CONTROLS_INSERT_COLUMN: string;
    CONTROLS_INSERT_ROW: string;
    CONTROLS_DELETE_BUTTON_WRAP: string;
    CONTROLS_DELETE_BUTTON: string;
    CORNER_CONTROLS: string;
    CONTROLS_CORNER_BUTTON: string;
    NUMBERED_COLUMN: string;
    NUMBERED_COLUMN_BUTTON: string;
    HOVERED_CELL: string;
    WITH_CONTROLS: string;
    RESIZING_PLUGIN: string;
    RESIZE_CURSOR: string;
    IS_RESIZING: string;
    CONTEXTUAL_SUBMENU: string;
    CONTEXTUAL_MENU_BUTTON_WRAP: string;
    CONTEXTUAL_MENU_BUTTON: string;
    CONTEXTUAL_MENU_ICON: string;
    CELL_NODEVIEW_WRAPPER: string;
    COLUMN_RESIZE_HANDLE: string;
    SELECTED_CELL: string;
    NODEVIEW_WRAPPER: string;
    TABLE_HEADER_NODE_WRAPPER: string;
    TABLE_CELL_NODE_WRAPPER: string;
    TOP_LEFT_CELL: string;
    TABLE_CONTAINER: string;
    TABLE_NODE_WRAPPER: string;
    TABLE_LEFT_SHADOW: string;
    TABLE_RIGHT_SHADOW: string;
    TABLE_CELL_NODEVIEW_CONTENT_DOM: string;
};
