import { WithAnalyticsEventProps } from '@findable/analytics-next-types';
import { EmojiProvider } from '@findable/emoji';
import * as React from 'react';
import { SyntheticEvent } from 'react';
import { ReactionSummary } from '../types/ReactionSummary';
export interface ReactionOnClick {
    (emojiId: string, event?: SyntheticEvent<any>): void;
}
export interface Props {
    reaction: ReactionSummary;
    emojiProvider: Promise<EmojiProvider>;
    onClick: ReactionOnClick;
    className?: string;
    onMouseOver?: (reaction: ReactionSummary, event?: SyntheticEvent<any>) => void;
    flash?: boolean;
}
export interface State {
    emojiName?: string;
}
export declare const Reaction: React.ComponentClass<Pick<Props & WithAnalyticsEventProps, "className" | "reaction" | "emojiProvider" | "onClick" | "onMouseOver" | "flash">, any>;
