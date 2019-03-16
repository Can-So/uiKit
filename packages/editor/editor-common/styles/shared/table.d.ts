import { TableLayout } from '@findable/adf-schema';
export declare const tableMarginTop = 24;
export declare const tableMarginBottom = 16;
export declare const tableMarginSides = 8;
export declare const tableCellMinWidth = 48;
export declare const tableNewColumnMinWidth = 140;
export declare const tableCellBorderWidth = 1;
export declare const TableSharedCssClassName: {
    TABLE_CONTAINER: string;
    TABLE_NODE_WRAPPER: string;
    TABLE_LEFT_SHADOW: string;
    TABLE_RIGHT_SHADOW: string;
    TABLE_CELL_NODEVIEW_CONTENT_DOM: string;
};
declare const tableSharedStyle: import("styled-components").InterpolationValue[];
export declare const calcTableWidth: (layout: TableLayout, containerWidth?: number | undefined, addControllerPadding?: boolean) => string;
export { tableSharedStyle };
