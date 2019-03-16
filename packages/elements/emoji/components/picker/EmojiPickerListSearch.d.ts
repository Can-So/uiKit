import { PureComponent } from 'react';
import { Styles } from '../../types';
export interface Props {
    style?: Styles;
    query?: string;
    onChange: any;
}
export default class EmojiPickerListSearch extends PureComponent<Props> {
    static defaultProps: {
        style: {};
    };
    private inputRef?;
    private inputSelection?;
    private onBlur;
    private onChange;
    private saveInputSelection;
    private restoreInputFocus;
    private focusInput;
    private handleInputRef;
    render(): JSX.Element;
}
