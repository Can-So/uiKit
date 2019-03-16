import { MarkdownSerializerState } from 'prosemirror-markdown';
import { Node as PMNode } from 'prosemirror-model';
declare const _default: {
    table(state: MarkdownSerializerState, node: PMNode<any>): void;
    tableRow(state: MarkdownSerializerState, node: PMNode<any>): void;
    tableHeader: (state: MarkdownSerializerState, node: PMNode<any>) => void;
    tableCell: (state: MarkdownSerializerState, node: PMNode<any>) => void;
};
export default _default;
