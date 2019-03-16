export declare type ReactionAction = (containerAri: string, ari: string, emojiId: string) => void;
export interface OnEmoji {
    (emojiId: string): any;
}
export declare type OnReaction = (emojiId: string) => void;
