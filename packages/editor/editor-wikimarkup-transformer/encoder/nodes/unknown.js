import { JSONTransformer } from '@findable/editor-json-transformer';
var jsonTransformer = new JSONTransformer();
export var unknown = function (node) {
    var content = JSON.stringify(jsonTransformer.encodeNode(node));
    return node.isBlock
        ? "{adf:display=block}\n" + content + "\n{adf}"
        : "{adf:display=inline}" + content + "{adf}";
};
//# sourceMappingURL=unknown.js.map