import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
import { EmojiProvider } from '@atlaskit/emoji';
import * as React from 'react';
import { OnEmoji, OnReaction } from '../types';
import { ReactionStatus } from '../types/ReactionStatus';
import { ReactionSummary } from '../types/ReactionSummary';
export interface Props {
    reactions: ReactionSummary[];
    status: ReactionStatus;
    loadReaction: () => void;
    onSelection: OnEmoji;
    onReactionClick: OnEmoji;
    onReactionHover?: OnReaction;
    allowAllEmojis?: boolean;
    flash?: {
        [emojiId: string]: boolean;
    };
    boundariesElement?: string;
    errorMessage?: string;
    emojiProvider: Promise<EmojiProvider>;
}
export declare const Reactions: React.ComponentClass<Pick<Props & WithAnalyticsEventProps, "reactions" | "emojiProvider" | "flash" | "onSelection" | "boundariesElement" | "allowAllEmojis" | "status" | "loadReaction" | "onReactionClick" | "onReactionHover" | "errorMessage">, any>;
