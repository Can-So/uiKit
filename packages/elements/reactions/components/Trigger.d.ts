import { PureComponent } from 'react';
export interface Props {
    onClick: Function;
    miniMode?: boolean;
    disabled?: boolean;
}
export declare class Trigger extends PureComponent<Props, {}> {
    static defaultProps: {
        disabled: boolean;
    };
    private handleMouseDown;
    render(): JSX.Element;
}
