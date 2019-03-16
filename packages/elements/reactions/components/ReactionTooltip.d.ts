import * as React from 'react';
import { ReactionSummary } from '../types/ReactionSummary';
export interface Props {
    emojiName?: string;
    reaction: ReactionSummary;
    children: React.ReactNode;
}
export declare const ReactionTooltip: ({ emojiName, children, reaction: { users }, }: Props) => JSX.Element;
