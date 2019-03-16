import { commonMacro } from './common-macro';
export var anchorMacro = function (_a) {
    var input = _a.input, position = _a.position, schema = _a.schema, context = _a.context;
    return commonMacro(input.substring(position), schema, {
        keyword: 'anchor',
        paired: false,
        context: context,
        rawContentProcessor: rawContentProcessor,
    });
};
var rawContentProcessor = function (rawAttrs, rawContent, length, schema, context) {
    return {
        type: 'text',
        text: '',
        length: length,
    };
};
//# sourceMappingURL=anchor-macro.js.map