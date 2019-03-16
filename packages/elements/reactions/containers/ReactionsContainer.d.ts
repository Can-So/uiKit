import { EmojiProvider } from '@atlaskit/emoji';
import * as React from 'react';
import { ReactionStoreProp } from '../reaction-store/ReactionConsumer';
export declare type Props = {
    containerAri: string;
    ari: string;
    allowAllEmojis?: boolean;
    boundariesElement?: string;
    emojiProvider: Promise<EmojiProvider>;
    store: ReactionStoreProp;
};
export default class ReactionsContainer extends React.PureComponent<Props> {
    private renderChild;
    private stateMapper;
    private actionsMapper;
    render(): JSX.Element;
}
