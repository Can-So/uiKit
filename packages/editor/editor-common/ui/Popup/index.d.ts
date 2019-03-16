import * as React from 'react';
import { Position } from './utils';
export interface Props {
    zIndex?: number;
    alignX?: 'left' | 'right' | 'center' | 'end';
    alignY?: 'top' | 'bottom' | 'start';
    target?: HTMLElement;
    fitHeight?: number;
    fitWidth?: number;
    boundariesElement?: HTMLElement;
    mountTo?: HTMLElement;
    offset?: number[];
    onPositionCalculated?: (position: Position) => Position;
    onPlacementChanged?: (placement: [string, string]) => void;
    scrollableElement?: HTMLElement;
    stick?: boolean;
    ariaLabel?: string;
    forcePlacement?: boolean;
}
export interface State {
    popup?: HTMLElement;
    position?: Position;
    overflowScrollParent: HTMLElement | false;
}
export default class Popup extends React.Component<Props, State> {
    scrollElement: undefined | false | HTMLElement;
    static defaultProps: {
        offset: number[];
    };
    state: State;
    private placement;
    /**
     * Calculates new popup position
     */
    private updatePosition;
    private cannotSetPopup;
    /**
     * Popup initialization.
     * Checks whether it's possible to position popup along given target, and if it's not throws an error.
     */
    private initPopup;
    private handleRef;
    private scheduledUpdatePosition;
    onResize: () => any;
    componentWillReceiveProps(newProps: Props): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private renderPopup;
    render(): JSX.Element | null;
}
