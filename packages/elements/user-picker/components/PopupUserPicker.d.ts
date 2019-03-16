import * as React from 'react';
import { PopupUserPickerProps } from '../types';
interface State {
    flipped: boolean;
}
export declare class PopupUserPicker extends React.Component<PopupUserPickerProps, State> {
    static defaultProps: {
        width: number;
    };
    state: {
        flipped: boolean;
    };
    handleFlipStyle: (data: {
        flipped: boolean;
        styles: any;
        popper: any;
    }) => {
        flipped: boolean;
        styles: any;
        popper: any;
    };
    render(): JSX.Element;
}
export {};
