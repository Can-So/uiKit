import { PureComponent, ReactElement } from 'react';
export interface Props {
    className?: string;
    disabled?: boolean;
    hideTooltip?: boolean;
    href?: string;
    iconAfter?: ReactElement<any>;
    iconBefore?: ReactElement<any>;
    onClick?: (event: Event) => void;
    selected?: boolean;
    spacing?: 'default' | 'compact' | 'none';
    target?: string;
    theme?: 'dark';
    title?: string;
    titlePosition?: string;
    ariaLabel?: string;
}
export default class ToolbarButton extends PureComponent<Props, {}> {
    static defaultProps: {
        className: string;
    };
    render(): JSX.Element;
    private handleClick;
}
