import { commonMacro } from './common-macro';
export var adfMacro = function (_a) {
    var input = _a.input, position = _a.position, schema = _a.schema, context = _a.context;
    return commonMacro(input.substring(position), schema, {
        keyword: 'adf',
        paired: true,
        context: context,
        rawContentProcessor: rawContentProcessor,
    });
};
var rawContentProcessor = function (rawAttrs, rawContent, length, schema, context) {
    var json = JSON.parse(rawContent);
    var node = schema.nodeFromJSON(json);
    return {
        type: 'pmnode',
        nodes: [node],
        length: length,
    };
};
//# sourceMappingURL=adf-macro.js.map