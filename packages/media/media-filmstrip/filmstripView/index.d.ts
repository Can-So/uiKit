import * as React from 'react';
import { ReactNode, MouseEvent } from 'react';
export declare const MUTATION_CONFIG: {
    attributes: boolean;
    childList: boolean;
    subtree: boolean;
    characterData: boolean;
};
export interface ChildOffset {
    left: number;
    right: number;
}
export interface SizeEvent {
    width: number;
    offset: number;
    offsets: ChildOffset[];
    minOffset: number;
    maxOffset: number;
}
export interface ScrollEvent {
    direction: 'left' | 'right';
    offset: number;
    animate: boolean;
}
export interface FilmstripViewProps {
    /**  A **boolean**. Defaults to **false**.
     *  When true, any change to the **offset** property will be animated.
     * Having **animate=true** results in an awkward UX when changing the **offset** property before the
     * animation finishes.
     */
    animate?: boolean;
    /** A **number**. Defaults to 0.
     * Determines the visible portion of the filmstrip.
     */
    offset?: number;
    /** Any React **node** */
    children?: ReactNode;
    /** A **function** called when the size of the filmstrip has been changed e.g. when mounted, after the window is resized or the children have changed.
     * **Arguments:**
     * - event:
     * - width - A number. The visible width of the filmstrip;
     * - offset - A number.
     * - offsets: ChildOffset[];
     * - minOffset - A number.
     * - maxOffset - A number.
     */
    onSize?: (event: SizeEvent) => void;
    /** A **function** called when the user has indicated they wish to change the visible porition of the filmstrip e.g. clicked the left or right arrows, or scrolled the scroll wheel.
     * **Arguments:**
     * - event:
     * - direction - Either **"left"** or **"right"**. The direction the user wants to move the filmstrip.
     * - offset - A **number**. The desired offset.
     * - animate - A **boolean**. Whether the change should be animated (this arg could probably do with a better name!)
     */
    onScroll?: (event: ScrollEvent) => void;
}
export interface FilmstripViewState {
    bufferWidth: number;
    windowWidth: number;
}
export interface ArrowProps {
    onClick: (event: MouseEvent<HTMLDivElement>) => void;
}
export declare const LeftArrow: React.SFC<ArrowProps>;
export declare const RightArrow: React.SFC<ArrowProps>;
export declare class FilmstripView extends React.Component<FilmstripViewProps, FilmstripViewState> {
    static defaultProps: Partial<FilmstripViewProps>;
    bufferElement: HTMLElement;
    windowElement: HTMLElement;
    mutationObserver: MutationObserver;
    childOffsets: ChildOffset[];
    previousOffset: number;
    state: {
        bufferWidth: number;
        windowWidth: number;
    };
    constructor(props: FilmstripViewProps);
    readonly offset: number;
    readonly minOffset: number;
    /**
     * The furthest we can scroll, where the end of the buffer is just in view
     */
    readonly maxOffset: number;
    readonly canGoLeft: boolean;
    readonly canGoRight: boolean;
    readonly transitionDuration: number;
    initMutationObserver(): void;
    triggerScrollEvent(): void;
    getClosestForLeft(offset: number): number;
    getClosestForRight(offset: number): number;
    handleSizeChange: () => void;
    handleWindowElementChange: (windowElement: HTMLElement) => void;
    handleBufferElementChange: (bufferElement: HTMLElement) => void;
    handleMutation: (mutationList: MutationRecord[]) => void;
    handleLeftClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleRightClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleScroll: (event: React.WheelEvent<HTMLDivElement>) => void;
    renderLeftArrow(): JSX.Element | null;
    renderRightArrow(): JSX.Element | null;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
