import * as React from 'react';
interface FooterProps {
    currentScreenIdx: number;
    numScreens: number;
    submitButton: React.ReactNode;
    onNext: () => void;
    onPrevious: () => void;
    onCancel: () => void;
    secondaryActions: React.ReactNode;
}
export default class Footer extends React.Component<FooterProps> {
    render(): JSX.Element;
}
export {};
