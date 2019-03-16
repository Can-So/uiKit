import { PureComponent } from 'react';
import { Message } from '../../types';
export interface Props {
    message: Message;
    className: string;
    tooltip?: boolean;
}
export default class EmojiErrorMessage extends PureComponent<Props> {
    renderWithTooltip(): JSX.Element;
    renderInline(): JSX.Element;
    render(): JSX.Element;
}
