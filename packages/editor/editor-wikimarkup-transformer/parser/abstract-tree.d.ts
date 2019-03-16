import { Node as PMNode, Schema } from 'prosemirror-model';
import { Context } from './tokenize';
export default class AbstractTree {
    private schema;
    private wikiMarkup;
    constructor(schema: Schema, wikiMarkup: string);
    /**
     * Convert reduced macros tree into prosemirror model tree
     */
    getProseMirrorModel(context: Context): PMNode;
}
