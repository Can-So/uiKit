import { ReactionClient } from '../client';
import { ReactionsState } from '../types';
export declare type State = {
    reactions: {
        [key: string]: ReactionsState;
    };
    flash: {
        [key: string]: {
            [emojiId: string]: boolean;
        };
    };
};
export declare type OnUpdateCallback = (state: State) => void;
export interface ReactionsStore {
    getReactions: (containerAri: string, ...aris: string[]) => void;
    toggleReaction: (containerAri: string, aris: string, emojiId: string) => void;
    addReaction: (containerAri: string, aris: string, emojiId: string) => void;
    getDetailedReaction: (containerAri: string, aris: string, emojiId: string) => void;
    getState: () => State;
    onChange: (callback: OnUpdateCallback) => void;
    removeOnChangeListener: (callback: OnUpdateCallback) => void;
}
export declare class MemoryReactionsStore implements ReactionsStore {
    private client;
    private state;
    private callbacks;
    constructor(client: ReactionClient, state?: State);
    private setState;
    private triggerOnChange;
    private setReactions;
    private getReactionsState;
    private handleDetailedReactionResponse;
    private setFlash;
    private flash;
    private optmisticUpdate;
    /**
     * Utility function to help execute a callback to Reaction if its state is ready.
     *
     *
     * @param containerAri
     * @param ari
     *
     * @returns (updater: Updater<ReactionsReadyState>) => ReactionsState?
     *  A function that will execute the received callback with the ReactionsState if
     *  ready. If some state is returned, the new state will be applied.
     */
    private withReadyReaction;
    /**
     * Utility function to help execute actions with a reaction. It handles reaction discovery
     * and branching between reacted and not reacted.
     *
     * @param reactedCallback callback that will be executed when the user has already reacted
     * with the emoji
     * @param notReactedCallback callback that will be executed when the user hasn't reacted
     * with the emoji
     *
     * @returns (containerAri: string, ari: string, emojiId: string) => ReactionsState?
     *  A function that will execute the correct callback to the triple containerAri, ari and
     *  emojiId. If some state is returned, the new state will be applied.
     */
    private withReaction;
    private doAddReaction;
    private doRemoveReaction;
    getReactions: (key: string, ...args: string[]) => void;
    toggleReaction: (containerAri: string, ari: string, emojiId: string) => void;
    addReaction: (containerAri: string, ari: string, emojiId: string) => void;
    getDetailedReaction: (containerAri: string, ari: string, emojiId: string) => void;
    getState: () => State;
    onChange: (callback: OnUpdateCallback) => void;
    removeOnChangeListener: (toRemove: OnUpdateCallback) => void;
}
