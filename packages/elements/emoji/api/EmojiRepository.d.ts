import { CategoryId } from '../components/picker/categories';
import { EmojiDescription, EmojiSearchResult, OptionalEmojiDescription, SearchOptions } from '../types';
import { UsageFrequencyTracker } from './internal/UsageFrequencyTracker';
export declare const getEmojiVariation: (emoji: EmojiDescription, options?: SearchOptions | undefined) => EmojiDescription;
export default class EmojiRepository {
    private emojis;
    private fullSearch;
    private shortNameMap;
    private idMap;
    private asciiMap;
    private dynamicCategoryList;
    private static readonly defaultEmojiWeight;
    protected usageTracker: UsageFrequencyTracker;
    constructor(emojis: EmojiDescription[], usageTracker?: UsageFrequencyTracker);
    /**
     * Returns all available (and searchable) emoji in some default order.
     */
    all(): EmojiSearchResult;
    /**
     * Text search of emoji shortName and name field for suitable matches.
     *
     * Returns an array of all (searchable) emoji if query is empty or null, otherwise returns matching emoji.
     *
     * You can change how the results are sorted by specifying a custom EmojiComparator in the SearchOptions. If
     * you don't want any sorting you can also disable via the SearchOptions (this might be a useful optimisation).
     * If no sort is specified in SearchOptions then a default sorting it applied based on the query.
     */
    search(query?: string, options?: SearchOptions): EmojiSearchResult;
    /**
     * Returns all emoji with matching shortName
     */
    findAllMatchingShortName(shortName: string): EmojiDescription[];
    /**
     * Returns the first matching emoji matching the shortName, or null if none found.
     */
    findByShortName(shortName: string): OptionalEmojiDescription;
    /**
     * Returns the first matching emoji matching the id, or null if none found.
     */
    findById(id: string): OptionalEmojiDescription;
    findByAsciiRepresentation(asciiEmoji: string): OptionalEmojiDescription;
    findInCategory(categoryId: CategoryId): EmojiDescription[];
    addUnknownEmoji(emoji: EmojiDescription): void;
    getAsciiMap(): Map<string, EmojiDescription>;
    /**
     * Return the most frequently used emoji, ordered from most frequent to least frequent. Return an empty array if
     * there are none.
     *
     * @param options optional settings to be applied to the set of frequently used emoji
     */
    getFrequentlyUsed(options?: SearchOptions): EmojiDescription[];
    getDynamicCategoryList(): CategoryId[];
    /**
     * Call this on emoji usage to allow the EmojiRepository to track the usage of emoji (which could be useful
     * in sorting, etc).
     *
     * @param emoji the emoji that was just used
     */
    used(emoji: EmojiDescription): void;
    delete(emoji: EmojiDescription): void;
    private withAsciiMatch;
    private applySearchOptions;
    private initMembers;
    /**
     * Optimisation to initialise all map member variables in single loop over emojis
     */
    private initRepositoryMetadata;
    private initSearchIndex;
    private getAllSearchableEmojis;
    private addToMaps;
    private addToDynamicCategories;
}
