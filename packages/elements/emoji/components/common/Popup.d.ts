import { PureComponent, ReactElement } from 'react';
import { RelativePosition } from '../../types';
export interface Props {
    target: string | Element;
    relativePosition?: RelativePosition;
    offsetX?: number;
    offsetY?: number;
    zIndex?: string | number;
    children: ReactElement<any>;
}
export default class Popup extends PureComponent<Props, {}> {
    private popup?;
    private debounced;
    static defaultProps: {
        relativePosition: string;
        offsetX: number;
        offsetY: number;
        zIndex: number;
    };
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    applyBelowPosition(): void;
    applyAbovePosition(): void;
    applyAbsolutePosition(): void;
    private handleResize;
    renderContent(): void;
    render(): JSX.Element;
}
