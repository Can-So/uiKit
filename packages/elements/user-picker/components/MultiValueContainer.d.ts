import * as React from 'react';
export declare const ScrollAnchor: import("styled-components").StyledComponentClass<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare type State = {
    valueSize: number;
    previousValueSize: number;
};
declare type Props = {
    getValue: () => any[];
    selectProps: any;
};
export declare class MultiValueContainer extends React.PureComponent<Props, State> {
    static getDerivedStateFromProps(nextProps: Props, prevState: State): {
        valueSize: number;
        previousValueSize: number;
    };
    private bottomAnchor;
    constructor(props: Props);
    componentDidUpdate(): void;
    handleBottomAnchor: (ref: HTMLDivElement | null) => void;
    private showPlaceholder;
    private addPlaceholder;
    private renderChildren;
    render(): JSX.Element;
}
export {};
