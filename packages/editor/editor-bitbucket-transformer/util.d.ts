/**
 * A replacement for `String.repeat` until it becomes widely available.
 */
export declare function stringRepeat(text: string, length: number): string;
/**
 * This function escapes all plain-text sequences that might get converted into markdown
 * formatting by Bitbucket server (via python-markdown).
 * @see MarkdownSerializerState.esc()
 */
export declare function escapeMarkdown(str: string, startOfLine?: boolean, insideTable?: boolean): string;
/**
 * This function gets markup rendered by Bitbucket server and transforms it into markup that
 * can be consumed by Prosemirror HTML parser, conforming to our schema.
 */
export declare function transformHtml(html: string, options: {
    disableBitbucketLinkStripping?: boolean;
}): HTMLElement;
