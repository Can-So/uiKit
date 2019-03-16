declare const BRACKET_MAP: {
    '{': string;
    '[': string;
    '(': string;
};
export declare type BracketMapKeys = Array<keyof typeof BRACKET_MAP>;
export declare const getAutoClosingBracketInfo: (before: string, after: string) => {
    left: "(" | "{" | "[" | undefined;
    right: string | undefined;
    hasTrailingMatchingBracket: boolean;
};
export declare const isCursorBeforeClosingBracket: (after: string) => boolean;
export declare const isClosingBracket: (text: string) => boolean;
export {};
