import { parseString } from './text';
import { normalizePMNodes } from './utils/normalize';
var AbstractTree = /** @class */ (function () {
    function AbstractTree(schema, wikiMarkup) {
        this.schema = schema;
        this.wikiMarkup = wikiMarkup;
    }
    /**
     * Convert reduced macros tree into prosemirror model tree
     */
    AbstractTree.prototype.getProseMirrorModel = function (context) {
        var content = parseString({
            context: context,
            ignoreTokenTypes: [],
            input: this.wikiMarkup,
            schema: this.schema,
        });
        return this.schema.nodes.doc.createChecked({}, normalizePMNodes(content, this.schema));
    };
    return AbstractTree;
}());
export default AbstractTree;
//# sourceMappingURL=abstract-tree.js.map