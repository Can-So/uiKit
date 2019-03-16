import * as React from 'react';
export interface Props {
    collectorId: string;
    onClose: () => void;
    onSubmit: () => void;
}
export default class FeedbackDialog extends React.Component<Props> {
    state: {
        isInvalid: boolean;
        feedbackText: string;
        Modal: null;
    };
    submit: () => void;
    handleTextAreaChange: (e: any) => void;
    componentDidMount(): void;
    renderDialog(Modal: new () => React.Component<any, any>): JSX.Element;
    render(): JSX.Element | null;
}
