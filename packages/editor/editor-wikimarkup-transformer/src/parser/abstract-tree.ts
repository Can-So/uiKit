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
    const content = parseString({
      tokenErrCallback,
      input: this.wikiMarkup,
      schema: this.schema,
      ignoreTokens: [],
    });

    return this.schema.nodes.doc.createChecked(
      {},
      normalizePMNodes(content, this.schema),
    );
  }
}
