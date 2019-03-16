import { EditorView } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import Resizer from './resizer/resizer';
import ResizeState from './resizer/resizeState';
export declare function updateColumnWidth(view: EditorView, cell: number, movedWidth: number, resizer: Resizer): void;
export declare function applyColumnWidths(view: EditorView, state: ResizeState, table: PMNode, start: number): import("prosemirror-state").Transaction<any>;
export declare function handleBreakoutContent(view: EditorView, elem: HTMLElement, cellPos: number, start: number, minWidth: number, node: PMNode): void;
export declare function resizeColumn(view: EditorView, cell: number, width: number, resizer: Resizer): ResizeState;
export declare const updateResizeHandle: (view: EditorView<any>) => false | undefined;
/**
 * Updates the column controls on resize
 */
export declare const updateControls: (state: EditorState<any>) => void;
/**
 * Scale the table to meet new requirements (col, layout change etc)
 * @param view
 * @param tableElem
 * @param node
 * @param pos
 * @param containerWidth
 * @param currentLayout
 */
export declare function scaleTable(view: EditorView, tableElem: HTMLTableElement | null, node: PMNode, prevNode: PMNode, pos: number, containerWidth: number | undefined, initialScale?: boolean, parentWidth?: number, dynamicTextSizing?: boolean): void;
/**
 * Light wrapper over Resizer.resize
 * Mainly used to re-set a columns width.
 * @param elem
 * @param colIdx
 * @param amount
 * @param node
 */
export declare function resizeColumnTo(view: EditorView, start: number, elem: HTMLElement, colIdx: number, amount: number, node: PMNode): ResizeState;
