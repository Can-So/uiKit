import { Fragment, Mark, Node as PMNode, Schema, MarkType } from 'prosemirror-model';
import { Macro } from './types';
/**
 * Deduce a set of marks from a style declaration.
 */
export declare function marksFromStyle(schema: Schema, style: CSSStyleDeclaration): Mark[];
/**
 * Create a fragment by adding a set of marks to each node.
 */
export declare function addMarks(fragment: Fragment, marks: Mark[]): Fragment;
export declare function getNodeMarkOfType(node: PMNode, markType: MarkType): Mark | null;
/**
 *
 * Traverse the DOM node and build an array of the breadth-first-search traversal
 * through the tree.
 *
 * Detection of supported vs unsupported content happens at this stage. Unsupported
 * nodes do not have their children traversed. Doing this avoids attempting to
 * decode unsupported content descendents into ProseMirror nodes.
 */
export declare function findTraversalPath(roots: Node[]): Node[];
/**
 * Return an array containing the child nodes in a fragment.
 *
 * @param fragment
 */
export declare function children(fragment: Fragment): PMNode[];
export declare function getAcName(node: Element): string | undefined;
export declare function getNodeName(node: Node): string;
export declare function getAcTagContent(node: Element, tagName: string): string | null;
export declare function getAcTagChildNodes(node: Element, tagName: string): NodeList | null;
export declare function getAcTagNode(node: Element, tagName: string): Element | null;
export declare function getMacroAttribute(node: Element, attribute: string): string;
export declare function getMacroParameters(node: Element): any;
export declare function createCodeFragment(schema: Schema, codeContent: string, language?: string | null, title?: string | null): Fragment;
export declare function hasClass(node: Element, className: string): boolean;
/**
 * Calculates the size of an element in a given dimension, using its CSS property value,
 * which may be based to the parent element's dimensions.
 *
 * @param value Value for a CSS property. Supported units are px and %.
 * @param parentPixels The dimension of the container element, in pixels.
 */
export declare function calcPixelsFromCSSValue(value: string, parentPixels: number): number;
export declare function getContent(node: Node, convertedNodes: WeakMap<Node, Fragment | PMNode>): Fragment;
export declare function parseMacro(node: Element): Macro;
export declare const getExtensionMacroParams: (params: Record<string, any>) => Record<string, {
    value: any;
}>;
export declare const mapPanelTypeToPm: (panelType: string) => string;
export declare const mapPanelTypeToCxhtml: (panelType: string) => string;
export declare const encodeMacroParams: (doc: Document, params: {
    [name: string]: {
        value: string;
    };
}) => DocumentFragment;
