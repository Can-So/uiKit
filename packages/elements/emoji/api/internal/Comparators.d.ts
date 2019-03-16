import { EmojiDescription } from '../../types';
/**
 * Create the default sort comparator to be used for the user queries against emoji
 *
 * @param query the query used in the search to be sorted. Any colons will be stripped from the query and it will be
 * converted to lowercase.
 * @param orderedIds the id of emoji ordered by how frequently they are used
 */
export declare function createSearchEmojiComparator(query?: string, orderedIds?: Array<string>): EmojiComparator;
export declare function createUsageOnlyEmojiComparator(orderedIds: Array<string>): EmojiComparator;
/**
 * Returns a number representing the result of comparing e1 and e2.
 * Compatible with Array.sort, which is to say -
 *   - less than 0 if e1 should come first
 *   - 0 if they are equal; e1 and e2 will be unchanged in position relative to each other
 *   - greater than 0 if e2 should come first.
 */
export interface EmojiComparator {
    compare(e1: EmojiDescription, e2: EmojiDescription): number;
}
/**
 * A combinator comparator that applies an ordered chained of sub-comparators. The first comparator that
 * returns a non-zero value stops the chain and causes that value to be returned. If a comparator returns a
 * zero then the next one in the chain is tried.
 *
 * If no comparators in the chain return a non-zero value then zero will be returned.
 */
export declare class ChainedEmojiComparator implements EmojiComparator {
    private chain;
    constructor(...comparators: EmojiComparator[]);
    compare(e1: EmojiDescription, e2: EmojiDescription): number;
}
/**
 * Orders two emoji such that if one of them has an ascii representation that exactly matches the query then it will
 * be ordered first.
 */
export declare class AsciiMatchComparator implements EmojiComparator {
    private query;
    constructor(query: string);
    compare(e1: EmojiDescription, e2: EmojiDescription): 1 | 0 | -1;
}
/**
 * Orders two emoji such that the one who's shortname matches the query exactly comes first. If there are matching
 * shortnames then the type of emoji is taken into account with SITE emoji coming first.
 */
export declare class ExactShortNameMatchComparator implements EmojiComparator {
    private colonQuery;
    private typeComparator;
    constructor(query: string);
    compare(e1: EmojiDescription, e2: EmojiDescription): number;
}
/**
 * Orders two emoji based on their type, with the types being STANDARD, ATLASSIAN and SITE (in that order).
 * If the comparator is configured to 'reverse' then the order will be SITE, ATLASSIAN, STANDARD.
 *
 * Regardless of the reverse setting, an unknown type will always come last.
 */
export declare class EmojiTypeComparator implements EmojiComparator {
    private typeToNumber;
    constructor(reverse?: boolean);
    compare(e1: EmojiDescription, e2: EmojiDescription): number;
    private emojiTypeToOrdinal;
}
/**
 * Order two emoji such as the one which is more frequently used comes first. If neither have any usage
 * information then leave their order unchanged.
 */
export declare class UsageFrequencyComparator implements EmojiComparator {
    private positionLookup;
    constructor(orderedIds: Array<string>);
    compare(e1: EmojiDescription, e2: EmojiDescription): number;
    /**
     * Get the ordinal representing the position of this emoji.
     *
     * @param id the id of the emoji
     */
    private getPositionInOrder;
}
declare type KeysOfType<T, TProp> = {
    [P in keyof T]: T[P] extends (TProp | undefined) ? P : never;
}[keyof T];
/**
 * A comparator that will sort higher an emoji which matches the query string earliest in the indicated
 * property.
 */
export declare class QueryStringPositionMatchComparator implements EmojiComparator {
    private readonly propertyName;
    private query;
    /**
     * @param query the query to match
     * @param propertyToCompare the property of EmojiDescription to check for query within
     */
    constructor(query: string, propertyToCompare: KeysOfType<EmojiDescription, string>);
    private getScore;
    compare(e1: EmojiDescription, e2: EmojiDescription): number;
}
export declare class OrderComparator implements EmojiComparator {
    private static INSTANCE;
    private constructor();
    static readonly Instance: OrderComparator;
    compare(e1: EmojiDescription, e2: EmojiDescription): number;
}
export declare class AlphabeticalShortnameComparator implements EmojiComparator {
    private static INSTANCE;
    private constructor();
    static readonly Instance: AlphabeticalShortnameComparator;
    compare(e1: EmojiDescription, e2: EmojiDescription): number;
}
export {};
