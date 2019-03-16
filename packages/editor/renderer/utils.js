import { defaultSchema } from '@atlaskit/adf-schema';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
function createEncoder(parser, encoder) {
    return function (value) { return encoder.encode(parser.parse(value)); };
}
var ADFEncoder = /** @class */ (function () {
    function ADFEncoder(createTransformerWithSchema) {
        var transformer = createTransformerWithSchema(defaultSchema);
        this.encode = createEncoder(transformer, new JSONTransformer());
    }
    return ADFEncoder;
}());
export { ADFEncoder };
export var getText = function (node) {
    return (node.text ||
        (node.attrs && (node.attrs.text || node.attrs.shortName)) ||
        "[" + (typeof node.type === 'string' ? node.type : node.type.name) + "]");
};
export var getEventHandler = function (eventHandlers, type, eventName) {
    if (eventName === void 0) { eventName = 'onClick'; }
    return (eventHandlers &&
        type &&
        eventHandlers[type] &&
        eventHandlers[type][eventName]);
};
//# sourceMappingURL=utils.js.map