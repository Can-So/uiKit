import * as tslib_1 from "tslib";
import { defaultSchema } from '@atlaskit/adf-schema';
import { encode } from './encoder';
import AbstractTree from './parser/abstract-tree';
import { buildIssueKeyRegex } from './parser/tokenize/issue-key';
var WikiMarkupTransformer = /** @class */ (function () {
    function WikiMarkupTransformer(schema) {
        if (schema === void 0) { schema = defaultSchema; }
        this.schema = schema;
    }
    WikiMarkupTransformer.prototype.encode = function (node) {
        return encode(node);
    };
    WikiMarkupTransformer.prototype.parse = function (wikiMarkup, context) {
        var tree = new AbstractTree(this.schema, wikiMarkup);
        return tree.getProseMirrorModel(this.buildContext(context));
    };
    WikiMarkupTransformer.prototype.buildContext = function (context) {
        return context
            ? tslib_1.__assign({}, context, { issueKeyRegex: buildIssueKeyRegex(context.inlineCardConversion) }) : {};
    };
    return WikiMarkupTransformer;
}());
export { WikiMarkupTransformer };
export default WikiMarkupTransformer;
//# sourceMappingURL=index.js.map