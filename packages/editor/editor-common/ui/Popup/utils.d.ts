export interface Position {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}
export interface CalculatePositionParams {
    placement: [string, string];
    target?: HTMLElement;
    popup?: HTMLElement;
    offset: number[];
    stick?: boolean;
}
export declare function isBody(elem: HTMLElement | Element): boolean;
export declare function isTextNode(elem: HTMLElement | Element): boolean;
/**
 * Decides if given fitHeight fits below or above the target taking boundaries into account.
 */
export declare function getVerticalPlacement(target: HTMLElement, boundariesElement: HTMLElement, fitHeight?: number, alignY?: string, forcePlacement?: boolean): string;
/**
 * Decides if given fitWidth fits to the left or to the right of the target taking boundaries into account.
 */
export declare function getHorizontalPlacement(target: HTMLElement, boundariesElement: HTMLElement, fitWidth?: number, alignX?: string, forcePlacement?: boolean): string;
export declare function calculatePlacement(target: HTMLElement, boundariesElement: HTMLElement, fitWidth?: number, fitHeight?: number, alignX?: string, alignY?: string, forcePlacement?: boolean): [string, string];
/**
 * Calculates relative coordinates for placing popup along with the target.
 * Uses placement from calculatePlacement.
 */
export declare function calculatePosition({ placement, target, popup, offset, stick, }: CalculatePositionParams): Position;
/**
 * Traverse DOM Tree upwards looking for popup parents with "overflow: scroll".
 */
export declare function findOverflowScrollParent(popup: HTMLElement | null): HTMLElement | false;
