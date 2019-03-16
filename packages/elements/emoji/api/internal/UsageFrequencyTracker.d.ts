import { EmojiDescription } from '../../types';
import DuplicateLimitedQueue from '../../DuplicateLimitedQueue';
/**
 * Keeps track of the last 150 emoji usages, although limiting the maximum count for a single emoji to 25 to
 * ensure we don't end up with only a single emoji being recorded. Usage is persisted to local storage for
 * consistency between 'sessions'.
 *
 * Skin tone variations for an emoji will be 'collapsed' so they are tracked as their base emoji. Gender
 * variations are not collapsed in this way and will be tracked per gender. This decision reflects the UI of
 * the EmojiPicker component.
 */
export declare class UsageFrequencyTracker {
    private static readonly queueOptions;
    protected queue: DuplicateLimitedQueue<string>;
    private gateway;
    constructor(useStorageIfPossible?: boolean);
    /**
     * Record the fact that the supplied emoji was used. You should note that usage is updated asynchronously so you can not
     * count on getOrder() reflecting this usage immediately.
     *
     * @param emoji the emoji who's usage is to be recorded. If the emoji has no id then no usage will be recorded
     */
    recordUsage(emoji: EmojiDescription): void;
    /**
     * Returns an array of emoji id (without skin tone variations) sorted by most used to least used. If there
     * are no usages then an empty array will be returned.
     */
    getOrder(): Array<string>;
    /**
     * Exposed for testing only. Clear any recorded usage.
     */
    clear(): void;
}
export declare class Gateway {
    private maximumPermitted;
    private count;
    constructor(maximumPermitted: number);
    /**
     * Run the supplied function if the count of already submitted work allows it. Drop the work
     * if it's not allowed to run.
     *
     * Will return true if the function has been submitted or false if it was not submitted.
     */
    submit(f: () => void): boolean;
    private completed;
}
