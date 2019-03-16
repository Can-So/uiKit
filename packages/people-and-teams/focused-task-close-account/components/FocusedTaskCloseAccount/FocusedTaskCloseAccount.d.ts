import * as React from 'react';
export interface Props {
    isOpen: boolean;
    onClose: () => void;
    screens: React.ReactNode[];
    submitButton: React.ReactNode;
    learnMoreLink: string;
}
export interface State {
    currentScreenIdx: number;
}
export declare class FocusedTaskCloseAccount extends React.Component<Props, State> {
    state: State;
    nextScreen: () => void;
    previousScreen: () => void;
    renderCurrentScreen: () => React.ReactNode;
    render(): JSX.Element;
}
export default FocusedTaskCloseAccount;
