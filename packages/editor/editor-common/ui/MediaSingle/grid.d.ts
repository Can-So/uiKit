import { MediaSingleLayout } from '@atlaskit/adf-schema';
export declare const layoutSupportsWidth: (layout: MediaSingleLayout) => boolean;
export declare function calcPxFromColumns(columns: number, lineLength: number, gridSize: number): number;
export declare function calcColumnsFromPx(width: number, lineLength: number, gridSize: number): number;
export declare function calcPxFromPct(pct: number, lineLength: number): number;
export declare function calcPctFromPx(width: number, lineLength: number): number;
export declare const snapToGrid: (gridWidth: number, width: number, height: number, lineLength: number, gridSize: number) => {
    height: number;
    width: number;
};
