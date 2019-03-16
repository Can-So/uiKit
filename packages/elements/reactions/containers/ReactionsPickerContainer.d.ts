import { EmojiProvider } from '@atlaskit/emoji';
import * as React from 'react';
import { ReactionStoreProp } from '../reaction-store/ReactionConsumer';
export declare type Props = {
    containerAri: string;
    ari: string;
    emojiProvider: Promise<EmojiProvider>;
    miniMode?: boolean;
    boundariesElement?: string;
    className?: string;
    allowAllEmojis?: boolean;
    store: ReactionStoreProp;
};
export default class ReactionPickerContainer extends React.PureComponent<Props> {
    private renderChild;
    private actionsMapper;
    render(): JSX.Element;
}
