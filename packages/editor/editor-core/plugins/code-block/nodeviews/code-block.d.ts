import { EditorView } from 'prosemirror-view';
import { Node } from 'prosemirror-model';
export declare class CodeBlockView {
    node: Node;
    dom: HTMLElement;
    contentDOM: HTMLElement;
    lineNumberGutter: HTMLElement;
    constructor(node: Node, view: EditorView, getPos: () => number);
    private ensureLineNumbers;
    update(node: Node): boolean;
    ignoreMutation(record: MutationRecord): boolean;
}
declare const _default: (node: Node<any>, view: EditorView<any>, getPos: () => number) => CodeBlockView;
export default _default;
