import * as React from 'react';
export interface Props {
    value: string;
    label?: string;
    onClick?: () => void;
    expanded?: boolean;
}
export default class ColorCard extends React.PureComponent<Props> {
    onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    render(): JSX.Element;
}
