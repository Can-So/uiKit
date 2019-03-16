import * as React from 'react';
declare type Props = {
    forwardedRef?: (elem: HTMLTextAreaElement | null) => void;
    /**
     * Enables the resizing of the textarea:
     * auto: both directions.
     * horizontal: only along the x axis.
     * vertical: only along the y axis.
     * smart (default): vertically grows and shrinks the textarea automatically to wrap your input text.
     * none: explicitly disallow resizing on the textarea.
     */
    resize?: 'auto' | 'vertical' | 'horizontal' | 'smart' | 'none';
    /** Handler to be called when the input changes. */
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
declare type State = {
    height: string;
};
export default class TextAreaElement extends React.Component<Props, State> {
    textareaElement: HTMLTextAreaElement | null;
    state: {
        height: string;
    };
    componentDidMount(): void;
    getTextAreaRef: (ref: HTMLTextAreaElement | null) => void;
    handleOnChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    render(): JSX.Element;
}
export {};
