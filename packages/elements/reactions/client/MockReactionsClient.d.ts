import { Reactions } from '../types/Reactions';
import { ReactionSummary } from '../types/ReactionSummary';
import { ReactionClient } from './ReactionClient';
export declare const containerAri: string;
export declare const ari: string;
export declare const reaction: (shortName: string, count: number, reacted: boolean) => {
    ari: string;
    containerAri: string;
    emojiId: string;
    count: number;
    reacted: boolean;
};
export declare const user: (id: string, displayName: string) => {
    id: string;
    displayName: string;
};
export declare class MockReactionsClient implements ReactionClient {
    private delay;
    mockData: {
        [key: string]: ReactionSummary[];
    };
    constructor(delay?: number);
    private delayPromise;
    getReactions(containerAri: string, aris: string[]): Promise<Reactions>;
    getDetailedReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary>;
    addReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]>;
    deleteReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]>;
}
