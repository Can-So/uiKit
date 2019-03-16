import { DOMParser } from 'prosemirror-model';
import { MarkdownSerializer, marks, nodes } from './serializer';
import { transformHtml } from './util';
var BitbucketTransformer = /** @class */ (function () {
    function BitbucketTransformer(schema, options) {
        if (options === void 0) { options = {}; }
        this.serializer = new MarkdownSerializer(nodes, marks);
        this.schema = schema;
        this.options = options;
    }
    BitbucketTransformer.prototype.encode = function (node) {
        return this.serializer.serialize(node);
    };
    BitbucketTransformer.prototype.parse = function (html) {
        var dom = this.buildDOMTree(html);
        return DOMParser.fromSchema(this.schema).parse(dom);
    };
    BitbucketTransformer.prototype.buildDOMTree = function (html) {
        return transformHtml(html, this.options);
    };
    return BitbucketTransformer;
}());
export { BitbucketTransformer };
//# sourceMappingURL=index.js.map