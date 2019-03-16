import * as tslib_1 from "tslib";
import { codeBlockToJSON, defaultSchema, linkToJSON, mediaToJSON, mediaSingleToJSON, mentionToJSON, tableToJSON, toJSONTableCell, toJSONTableHeader, } from '@findable/adf-schema';
var isType = function (type) { return function (node) {
    return node.type.name === type;
}; };
var isCodeBlock = isType('codeBlock');
var isMediaNode = isType('media');
var isMediaSingleNode = isType('mediaSingle');
var isMentionNode = isType('mention');
var isParagraph = isType('paragraph');
var isHeading = isType('heading');
var isTable = isType('table');
var isTableCell = isType('tableCell');
var isTableHeader = isType('tableHeader');
var isLinkMark = isType('link');
var isUnsupportedNode = function (node) {
    return isType('unsupportedBlock')(node) || isType('unsupportedInline')(node);
};
var filterNull = function (subject) {
    return Object.keys(subject).reduce(function (acc, key) {
        var _a;
        var current = subject[key];
        if (current === null) {
            return acc;
        }
        if (typeof current === 'object' && !Array.isArray(current)) {
            current = filterNull(current);
        }
        return tslib_1.__assign({}, acc, (_a = {}, _a[key] = current, _a));
    }, {});
};
var toJSON = function (node) {
    var obj = { type: node.type.name };
    if (isUnsupportedNode(node)) {
        return node.attrs.originalValue;
    }
    else if (isMediaNode(node)) {
        obj.attrs = mediaToJSON(node).attrs;
    }
    else if (isMediaSingleNode(node)) {
        obj.attrs = mediaSingleToJSON(node).attrs;
    }
    else if (isMentionNode(node)) {
        obj.attrs = mentionToJSON(node).attrs;
    }
    else if (isCodeBlock(node)) {
        obj.attrs = codeBlockToJSON(node).attrs;
    }
    else if (isTable(node)) {
        obj.attrs = tableToJSON(node).attrs;
    }
    else if (isTableCell(node)) {
        obj.attrs = toJSONTableCell(node).attrs;
    }
    else if (isTableHeader(node)) {
        obj.attrs = toJSONTableHeader(node).attrs;
    }
    else if (Object.keys(node.attrs).length) {
        obj.attrs = node.attrs;
    }
    if (obj.attrs) {
        obj.attrs = filterNull(obj.attrs);
    }
    if (node.isText) {
        obj.text = node.textContent;
    }
    else {
        node.content.forEach(function (child) {
            obj.content = obj.content || [];
            obj.content.push(toJSON(child));
        });
    }
    if (isParagraph(node) || isHeading(node)) {
        obj.content = obj.content || [];
    }
    if (node.marks.length) {
        obj.marks = node.marks.map(function (n) {
            if (isLinkMark(n)) {
                return linkToJSON(n);
            }
            return n.toJSON();
        });
    }
    return obj;
};
var JSONTransformer = /** @class */ (function () {
    function JSONTransformer() {
    }
    JSONTransformer.prototype.encode = function (node) {
        var content = [];
        node.content.forEach(function (child) {
            content.push(toJSON(child));
        });
        return {
            version: 1,
            type: 'doc',
            content: content,
        };
    };
    JSONTransformer.prototype.parse = function (content) {
        if (content.type !== 'doc') {
            throw new Error('Expected content format to be ADF');
        }
        var doc = defaultSchema.nodeFromJSON(content);
        doc.check();
        return doc;
    };
    /**
     * This method is used to encode a single node
     */
    JSONTransformer.prototype.encodeNode = function (node) {
        return toJSON(node);
    };
    return JSONTransformer;
}());
export { JSONTransformer };
//# sourceMappingURL=index.js.map