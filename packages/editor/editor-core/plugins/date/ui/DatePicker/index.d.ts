import * as React from 'react';
import { DateType } from '../../index';
export interface Props {
    element: HTMLElement | null;
    closeDatePicker: () => void;
    onSelect: (date: DateType) => void;
}
export interface State {
    day: number;
    month: number;
    year: number;
    selected: Array<string>;
}
export default class DatePicker extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element | null;
    private handleChange;
    private handleRef;
}
