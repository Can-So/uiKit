import { commonMacro } from './common-macro';
import { parseAttrs } from '../utils/attrs';
import { title } from '../utils/title';
export var noformatMacro = function (_a) {
    var input = _a.input, position = _a.position, schema = _a.schema, context = _a.context;
    return commonMacro(input.substring(position), schema, {
        keyword: 'noformat',
        paired: true,
        context: context,
        rawContentProcessor: rawContentProcessor,
    });
};
var rawContentProcessor = function (rawAttrs, rawContent, length, schema, context) {
    var output = [];
    var codeBlock = schema.nodes.codeBlock;
    var parsedAttrs = parseAttrs(rawAttrs);
    var trimedContent = rawContent.replace(/^\s+|\s+$/g, '');
    var textNode = trimedContent.length
        ? schema.text(trimedContent)
        : undefined;
    if (parsedAttrs.title) {
        output.push(title(parsedAttrs.title, schema));
    }
    output.push(codeBlock.createChecked({ language: 'java' }, textNode));
    return {
        type: 'pmnode',
        nodes: output,
        length: length,
    };
};
//# sourceMappingURL=noformat-macro.js.map