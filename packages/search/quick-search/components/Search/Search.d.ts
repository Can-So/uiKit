import * as React from 'react';
declare type Props = {
    /** The elements to render as options to search from. */
    children?: React.ReactNode;
    /** Set whether the loading state should be shown. */
    isLoading?: boolean;
    /** Function to be called when the search input loses focus. */
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    /** Function to be called when a input action occurs (native `oninput` event). */
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
    /** Function to be called when the user hits the escape key.  */
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    /** Placeholder text for search field. */
    placeholder?: string;
    /** Current value of search field. */
    value?: string;
};
declare type State = {
    /** Current value of search field. */
    value?: string;
};
export default class Search extends React.PureComponent<Props, State> {
    static defaultProps: Partial<Props>;
    state: {
        value: string | undefined;
    };
    onInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onInput: (event: React.FormEvent<HTMLInputElement>) => void;
    setInputRef: (ref: React.Ref<any>) => void;
    inputRef: React.Ref<any>;
    render(): JSX.Element;
}
export {};
