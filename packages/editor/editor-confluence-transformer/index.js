import parse from './parse';
import encode from './encode';
export { LANGUAGE_MAP as CONFLUENCE_LANGUAGE_MAP } from './languageMap';
var ConfluenceTransformer = /** @class */ (function () {
    function ConfluenceTransformer(schema) {
        var _this = this;
        this.parse = function (html) { return parse(html, _this.schema); };
        this.encode = function (node) { return encode(node, _this.schema); };
        this.schema = schema;
    }
    return ConfluenceTransformer;
}());
export { ConfluenceTransformer };
//# sourceMappingURL=index.js.map