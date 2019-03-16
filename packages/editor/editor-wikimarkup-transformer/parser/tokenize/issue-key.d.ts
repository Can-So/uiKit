import { Schema, Node as PMNode } from 'prosemirror-model';
import { TokenParser, Context, InlineCardConversion } from './';
/**
 * Inline Card From Text (ICFT).
 *
 * When we convert WikiMarkup to ADF we stamp all issue keys URLs with the
 * #icft= syntax to identify  which keys should be involved by brackets
 * [XX-999] from the ones which should be blue links in the ADF to WikiMarkup
 * convertion.
 */
export declare const INLINE_CARD_FROM_TEXT_STAMP: RegExp;
export interface Issue {
    key: string;
    url: string;
}
export declare const issueKey: TokenParser;
export declare const getIssue: (context: Context, key: string) => Issue | null;
export declare const buildInlineCard: (schema: Schema<any, any>, issue: Issue) => PMNode<any>[];
export declare const buildIssueKeyRegex: (inlineCardConversion?: InlineCardConversion | undefined) => RegExp | undefined;
