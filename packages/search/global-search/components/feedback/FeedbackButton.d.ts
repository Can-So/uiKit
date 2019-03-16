import * as React from 'react';
export interface Props {
    collectorId: string;
}
export default class FeedbackButton extends React.Component<Props> {
    state: {
        showDialog: boolean;
        showFlag: boolean;
    };
    showDialog: () => void;
    hideDialog: () => void;
    showFlag: () => void;
    hideFlag: () => void;
    handleSubmit: () => void;
    render(): JSX.Element;
}
