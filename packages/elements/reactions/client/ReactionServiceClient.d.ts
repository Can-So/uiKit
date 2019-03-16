import { Reactions } from '../types/Reactions';
import { ReactionSummary } from '../types/ReactionSummary';
import { ReactionClient } from './ReactionClient';
export declare class ReactionServiceClient implements ReactionClient {
    private sessionToken?;
    private serviceConfig;
    constructor(baseUrl: string, sessionToken?: string);
    private getHeaders;
    private requestService;
    getReactions(containerAri: string, aris: string[]): Promise<Reactions>;
    getDetailedReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary>;
    addReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]>;
    deleteReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]>;
}
