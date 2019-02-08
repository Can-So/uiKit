import { Node as PMNode, Schema } from 'prosemirror-model';
import { parseString } from './text';
import { normalizePMNodes } from './utils/normalize';
import { TokenErrCallback } from './tokenize';

export default class AbstractTree {
  private schema: Schema;
  private wikiMarkup: string;

  constructor(schema: Schema, wikiMarkup: string) {
    this.schema = schema;
    this.wikiMarkup = wikiMarkup;
  }

  /**
   * Convert reduced macros tree into prosemirror model tree
   */
  getProseMirrorModel(tokenErrCallback?: TokenErrCallback): PMNode {
    // TODO: Receive the context as parameter instead of tokenErrCallBack
    const content = parseString({
      context: { tokenErrCallback },
      ignoreTokens: [],
      input: this.wikiMarkup,
      schema: this.schema,
    });

    return this.schema.nodes.doc.createChecked(
      {},
      normalizePMNodes(content, this.schema),
    );
  }
}
