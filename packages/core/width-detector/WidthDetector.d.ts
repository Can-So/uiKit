import * as React from 'react';
declare type Props = {
    children: (width?: number) => React.ReactNode;
    onResize?: (width: number) => void;
    /** Optional styles to be applied to the containing element */
    containerStyle?: React.CSSProperties;
};
declare type State = {
    width?: number;
};
declare type ResizeObject = HTMLObjectElement & {
    data: String;
    contentDocument: HTMLDocument;
};
export default class WidthDetector extends React.Component<Props, State> {
    state: State;
    container?: HTMLDivElement;
    resizeObjectDocument?: Window;
    resizeObject?: ResizeObject;
    static defaultProps: {
        containerStyle: {};
    };
    handleResize: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleContainerRef: (ref: HTMLDivElement) => void;
    handleObjectRef: (ref: ResizeObject) => void;
    handleObjectLoad: () => void;
    render(): JSX.Element;
}
export {};
