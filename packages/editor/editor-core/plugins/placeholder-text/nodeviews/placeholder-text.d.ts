import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
export default class PlaceholderTextNode {
    dom: HTMLElement | undefined;
    view: EditorView;
    getPos: () => number;
    constructor(node: PMNode, view: EditorView, getPos: () => number);
    update: (node: PMNode<any>) => boolean;
    destroy: () => void;
    handleClick: (event: MouseEvent) => boolean;
}
