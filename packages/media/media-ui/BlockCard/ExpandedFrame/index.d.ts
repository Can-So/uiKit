import * as React from 'react';
export interface ExpandedFrameProps {
    isPlaceholder?: boolean;
    href?: string;
    icon?: React.ReactElement<any>;
    text?: React.ReactNode;
    minWidth?: number;
    maxWidth?: number;
    children?: React.ReactNode;
    /** A flag that determines whether the card is selected in edit mode. */
    isSelected?: boolean;
    /** The optional click handler */
    onClick?: () => void;
}
export declare class ExpandedFrame extends React.Component<ExpandedFrameProps> {
    readonly isInteractive: boolean;
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
    renderHeader(): JSX.Element;
    renderContent(): JSX.Element;
    render(): JSX.Element;
}
