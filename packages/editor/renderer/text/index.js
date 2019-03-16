import { defaultSchema } from '@atlaskit/adf-schema';
import { reduce } from './nodes';
var TextSerializer = /** @class */ (function () {
    function TextSerializer(schema) {
        this.schema = schema;
        this.schema = schema;
    }
    TextSerializer.prototype.serializeFragment = function (fragment) {
        var _this = this;
        var result = [];
        fragment.forEach(function (n) {
            result.push(reduce(n, _this.schema));
        });
        return result.join('\n').replace(/\n+/g, '\n');
    };
    TextSerializer.fromSchema = function (schema) {
        if (schema === void 0) { schema = defaultSchema; }
        return new TextSerializer(schema);
    };
    return TextSerializer;
}());
export default TextSerializer;
//# sourceMappingURL=index.js.map