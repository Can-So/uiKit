import { PureComponent } from 'react';
export interface Props {
    palette: Map<string, string>;
    selectedColor: string | null;
    borderColors: object;
    onClick: (value: string) => void;
    cols?: number;
    className?: string;
    checkMarkColor?: string;
}
export default class ColorPalette extends PureComponent<Props, any> {
    render(): JSX.Element;
}
