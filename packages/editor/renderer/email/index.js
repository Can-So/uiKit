import * as tslib_1 from "tslib";
import { fontFamily, fontSize } from '@findable/theme';
import { nodeSerializers } from './serializers';
import { serializeStyle } from './util';
import { calcTableColumnWidths } from '@findable/adf-schema';
var serializeNode = function (node, serializedHTML) {
    // ignore nodes with unknown type
    if (!nodeSerializers[node.type.name]) {
        return "[UNKNOWN_NODE_TYPE: " + node.type.name + "]";
    }
    var attrs = node.type.name === 'table' ? getTableAttrs(node) : node.attrs;
    return nodeSerializers[node.type.name]({
        attrs: attrs,
        marks: node.marks,
        text: serializedHTML || node.attrs.text || node.attrs.shortName || node.text,
    });
};
var getTableAttrs = function (node) {
    return tslib_1.__assign({}, node.attrs, { columnWidths: calcTableColumnWidths(node) });
};
var traverseTree = function (fragment) {
    var output = '';
    fragment.forEach(function (childNode) {
        if (childNode.isLeaf) {
            output += serializeNode(childNode);
        }
        else {
            var innerHTML = traverseTree(childNode.content);
            output += serializeNode(childNode, innerHTML);
        }
    });
    return output;
};
export var commonStyle = {
    'font-family': fontFamily(),
    'font-size': fontSize(),
    'font-weight': 400,
    'line-height': '24px',
};
var wrapperCSS = serializeStyle(commonStyle);
var EmailSerializer = /** @class */ (function () {
    function EmailSerializer() {
    }
    EmailSerializer.prototype.serializeFragment = function (fragment) {
        var innerHTML = traverseTree(fragment);
        return "<div style=\"" + wrapperCSS + "\">" + innerHTML + "</div>";
    };
    EmailSerializer.fromSchema = function (schema) {
        return new EmailSerializer();
    };
    return EmailSerializer;
}());
export default EmailSerializer;
//# sourceMappingURL=index.js.map