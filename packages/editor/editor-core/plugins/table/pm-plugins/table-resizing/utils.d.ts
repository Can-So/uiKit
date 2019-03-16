import { TableLayout, CellAttributes } from '@atlaskit/adf-schema';
import { EditorView } from 'prosemirror-view';
import { ResolvedPos } from 'prosemirror-model';
export declare const tableLayoutToSize: Record<string, number>;
/**
 * Translates named layouts in number values.
 * @param tableLayout
 * @param containerWidth
 */
export declare function getLayoutSize(tableLayout: TableLayout, containerWidth?: number, dynamicTextSizing?: boolean): number;
export declare function getDefaultLayoutMaxWidth(containerWidth?: number): 680 | 760 | 850;
/**
 * Does the current position point at a cell.
 * @param $pos
 */
export declare function pointsAtCell($pos: ResolvedPos<any>): false | import("prosemirror-model").Node<any> | null | undefined;
/**
 * Returns the pos of the cell on the side requested.
 * @param view
 * @param event
 * @param side
 */
export declare function edgeCell(view: EditorView, event: MouseEvent, side: string, handleWidth: number): number;
/**
 * Get the current col width, handles colspan.
 * @param view
 * @param cellPos
 * @param param2
 */
export declare function currentColWidth(view: EditorView, cellPos: number, { colspan, colwidth }: CellAttributes): number;
/**
 * Attempts to find a parent TD/TH depending on target element.
 * @param target
 */
export declare function domCellAround(target: HTMLElement | null): HTMLElement | null;
