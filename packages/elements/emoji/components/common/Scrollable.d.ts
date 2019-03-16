import { MouseEventHandler, PureComponent, ReactNode, UIEvent } from 'react';
export interface OnScroll {
    (element: Element, event: UIEvent<any>): void;
}
export interface Props {
    className?: string;
    maxHeight?: string;
    children?: ReactNode;
    onScroll?: OnScroll;
    onMouseLeave?: MouseEventHandler<any>;
}
export default class Scrollable extends PureComponent<Props, {}> {
    private scrollableDiv;
    reveal: (child: HTMLElement, forceToTop?: boolean | undefined) => void;
    scrollToBottom: () => void;
    private handleScroll;
    private handleRef;
    render(): JSX.Element;
}
