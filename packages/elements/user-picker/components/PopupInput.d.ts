import * as React from 'react';
export declare type Props = {
    selectProps: {
        disableInput?: boolean;
    };
    innerRef: (ref: HTMLInputElement) => void;
};
export declare class PopupInput extends React.Component<Props> {
    private ref;
    componentDidMount(): void;
    private handleInnerRef;
    render(): JSX.Element;
}
