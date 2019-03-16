export declare function trimChunk(chunk: string): string;
export declare function singleWord(search: string): boolean;
export declare function defaultCompareFn(a: number | string, b: number | string): number;
export declare enum SortMode {
    PRIORITY_FIRST = "first",
    PRIORITY_LAST = "last"
}
export declare function buildSortPredicateWith<T>(getProp: (item: T) => string | number, getPriority: (item: T) => number, sortMode: SortMode, compareFn?: typeof defaultCompareFn): (a: T, b: T) => number;
export declare function distance(search: string, content: string): number;
export declare function distanceByWords(search: string, content: string): number;
export declare function getSearchChunks({ keywords, title, }: {
    keywords?: string;
    title: string;
}): string[];
export declare function find(query: string, items: Array<{
    title: string;
    keywords?: string;
    priority?: number;
}>): {
    title: string;
    keywords?: string | undefined;
    priority?: number | undefined;
}[];
