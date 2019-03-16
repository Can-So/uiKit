import { Node as PMNode, Schema } from 'prosemirror-model';
export default function getMediaSingleNodeView(schema: Schema, filename: string, attrs: {
    [key: string]: string;
}): PMNode;
