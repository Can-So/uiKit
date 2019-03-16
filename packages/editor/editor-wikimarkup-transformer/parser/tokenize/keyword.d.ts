import { TokenType } from './';
export declare function parseMacroKeyword(input: string): {
    type: TokenType;
} | null;
export declare function parseOtherKeyword(input: string): {
    type: TokenType;
} | null;
export declare function parseLeadingKeyword(input: string): {
    type: TokenType;
} | null;
export declare function parseIssueKeyword(input: string, issueKeyRegex?: RegExp): {
    type: TokenType;
} | null;
