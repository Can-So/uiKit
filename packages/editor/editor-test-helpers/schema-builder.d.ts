import { ExternalMediaAttributes, MediaAttributes, MentionAttributes, MediaSingleAttributes, ApplicationCardAttributes, CellAttributes, LinkAttributes, TableAttributes, CardAttributes, BreakoutMarkAttrs, AlignmentAttributes, IndentationMarkAttributes } from '@atlaskit/adf-schema';
import { MarkType, Node, NodeType, Schema, Slice, Mark } from 'prosemirror-model';
/**
 * Represents a ProseMirror "position" in a document.
 */
export declare type position = number;
/**
 * A useful feature of the builder is being able to declaratively mark positions
 * in content using the curly braces e.g. `{<>}`.
 *
 * These positions are called "refs" (inspired by React), and are tracked on
 * every node in the tree that has a ref on any of its descendants.
 */
export declare type Refs = {
    [name: string]: position;
};
/**
 * Content that contains refs information.
 */
export declare type RefsContentItem = RefsNode | RefsTracker;
/**
 * Content node or mark builders can consume, e.g.
 *
 *     const builder = nodeFactory('p');
 *     builder('string');
 *     builder(aNode);
 *     builder(aRefsNode);
 *     builder(aRefsTracker);
 *     builder([aNode, aRefsNode, aRefsTracker]);
 */
export declare type BuilderContentFn = (schema: Schema) => Node | RefsContentItem | Array<Node | RefsContentItem>;
export declare type BuilderContent = string | BuilderContentFn;
/**
 * ProseMirror doesn't support empty text nodes, which can be quite
 * inconvenient when you want to capture a position ref without introducing
 * text.
 *
 * Take a couple of examples:
 *
 *     p('{<>}')
 *     p('Hello ', '{<>}', 'world!')
 *
 * After the ref syntax is stripped you're left with:
 *
 *     p('')
 *     p('Hello ', '', 'world!')
 *
 * This violates the rule of text nodes being non-empty. This class solves the
 * problem by providing an alternative data structure that *only* stores refs,
 * and can be used in scenarios where an empty text would be forbidden.
 *
 * This is done under the hood when using `text()` factory, and instead of
 * always returning a text node, it'll instead return one of two things:
 *
 * - a text node -- when given a non-empty string
 * - a refs tracker -- when given a string that *only* contains refs.
 */
export declare class RefsTracker {
    refs: Refs;
}
/**
 * A standard ProseMirror Node that also tracks refs.
 */
export interface RefsNode extends Node {
    refs: Refs;
}
/**
 * Create a text node.
 *
 * Special markers called "refs" can be put in the text. Refs provide a way to
 * declaratively describe a position within some text, and then access the
 * position in the resulting node.
 */
export declare function text(value: string, schema: Schema): RefsContentItem;
/**
 * Offset ref position values by some amount.
 */
export declare function offsetRefs(refs: Refs, offset: number): Refs;
/**
 * Given a collection of nodes, sequence them in an array and return the result
 * along with the updated refs.
 */
export declare function sequence(...content: RefsContentItem[]): {
    nodes: RefsNode[];
    refs: Refs;
};
/**
 * Given a jagged array, flatten it down to a single level.
 */
export declare function flatten<T>(deep: (T | T[])[]): T[];
/**
 * Coerce builder content into ref nodes.
 */
export declare function coerce(content: BuilderContent[], schema: Schema): {
    nodes: RefsNode[];
    refs: Refs;
};
/**
 * Create a factory for nodes.
 */
export declare function nodeFactory(type: NodeType, attrs?: {}, marks?: Mark[]): (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
/**
 * Create a factory for marks.
 */
export declare function markFactory(type: MarkType, attrs?: {}, allowDupes?: boolean): (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode[];
export declare const fragment: (...content: BuilderContent[]) => BuilderContent[];
export declare const slice: (...content: BuilderContent[]) => Slice<any>;
/**
 * Builds a 'clean' version of the nodes, without Refs or RefTrackers
 */
export declare const clean: (content: BuilderContentFn) => (schema: Schema<any, any>) => Node<Schema<any, any>> | Node<any>[] | undefined;
export declare const doc: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const p: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const blockquote: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const h1: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const h2: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const h3: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const h4: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const h5: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const h6: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const li: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const ul: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const ol: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const br: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const hr: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const panel: (attrs?: {}) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const panelNote: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const hardBreak: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const code_block: (attrs?: {}) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const img: (attrs: {
    src: string;
    alt?: string | undefined;
    title?: string | undefined;
}) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const emoji: (attrs: {
    shortName: string;
    id?: string | undefined;
    fallback?: string | undefined;
    text?: string | undefined;
}) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const mention: (attrs: MentionAttributes) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const table: (attrs?: TableAttributes | undefined) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const tr: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const td: (attrs?: CellAttributes | undefined) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const th: (attrs?: CellAttributes | undefined) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const tdEmpty: (schema: Schema<any, any>) => RefsNode;
export declare const thEmpty: (schema: Schema<any, any>) => RefsNode;
export declare const tdCursor: (schema: Schema<any, any>) => RefsNode;
export declare const thCursor: (schema: Schema<any, any>) => RefsNode;
export declare const decisionList: (attrs?: {
    localId?: string | undefined;
}) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const decisionItem: (attrs?: {
    localId?: string | undefined;
    state?: string | undefined;
}) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const taskList: (attrs?: {
    localId?: string | undefined;
}) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const taskItem: (attrs?: {
    localId?: string | undefined;
    state?: string | undefined;
}) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const confluenceUnsupportedBlock: (cxhtml: string) => (schema: Schema<any, any>) => RefsNode;
export declare const confluenceUnsupportedInline: (cxhtml: string) => (schema: Schema<any, any>) => RefsNode;
export declare const confluenceJiraIssue: (attrs: {
    issueKey?: string | undefined;
    macroId?: string | undefined;
    schemaVersion?: string | undefined;
    server?: string | undefined;
    serverId?: string | undefined;
}) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const inlineExtension: (attrs: {
    extensionKey: string;
    extensionType: string;
    parameters?: object | undefined;
    text?: string | undefined;
}) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const extension: (attrs: {
    extensionKey: string;
    extensionType: string;
    parameters?: object | undefined;
    text?: string | undefined;
    layout?: string | undefined;
}) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const bodiedExtension: (attrs: {
    extensionKey: string;
    extensionType: string;
    parameters?: object | undefined;
    text?: string | undefined;
    layout?: string | undefined;
}) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const date: (attrs: {
    timestamp: string | number;
}) => (schema: Schema<any, any>) => RefsNode;
export declare const status: (attrs: {
    text: string;
    color: string;
    localId: string;
}) => (schema: Schema<any, any>) => RefsNode;
export declare const mediaSingle: (attrs?: MediaSingleAttributes) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const mediaGroup: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const media: (attrs: MediaAttributes | ExternalMediaAttributes) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const applicationCard: (attrs: ApplicationCardAttributes) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const placeholder: (attrs: {
    text: string;
}) => (schema: Schema<any, any>) => RefsNode;
export declare const layoutSection: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const layoutColumn: (attrs: {
    width: number;
}) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const inlineCard: (attrs: CardAttributes) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const blockCard: (attrs: CardAttributes) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const unsupportedInline: (attrs: any) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const unsupportedBlock: (attrs: any) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode;
export declare const em: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode[];
export declare const subsup: (attrs: {
    type: string;
}) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode[];
export declare const underline: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode[];
export declare const strong: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode[];
export declare const code: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode[];
export declare const strike: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode[];
export declare const a: (attrs: LinkAttributes) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode[];
export declare const emojiQuery: (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode[];
export declare const typeAheadQuery: (attrs?: {
    trigger: string;
    query?: string | undefined;
}) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode[];
export declare const textColor: (attrs: {
    color: string;
}) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode[];
export declare const confluenceInlineComment: (attrs: {
    reference: string;
}) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode[];
export declare const alignment: (attrs: AlignmentAttributes) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode[];
export declare const breakout: (attrs: BreakoutMarkAttrs) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode[];
export declare const indentation: (attrs: IndentationMarkAttributes) => (...content: BuilderContent[]) => (schema: Schema<any, any>) => RefsNode[];
