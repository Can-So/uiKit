import * as tslib_1 from "tslib";
import { Slice } from 'prosemirror-model';
var isBlockNode = function (node, schema) {
    if (!schema) {
        return false;
    }
    var nodeType = schema.nodes[node.type];
    if (!nodeType) {
        return false;
    }
    return nodeType.isBlock;
};
/**
 * Filters text (e.g. from code blocks) that include new lines - convert to hardBreaks
 */
var filterText = function (acc, node) {
    var text = node.text;
    if (!text || node.type !== 'text') {
        return;
    }
    var lines = text.split('\n');
    return lines.reduce(function (acc, line, index) {
        if (index > 0) {
            acc.push({
                type: 'hardBreak',
            });
        }
        acc.push(tslib_1.__assign({}, node, { text: line }));
        return acc;
    }, acc);
};
var filterContent = function (content, types, schema, breakBetweenBlocks) {
    return content.reduce(function (acc, node) {
        if (types.has(node.type)) {
            if (node.content) {
                acc.push(tslib_1.__assign({}, node, { content: filterContent(node.content, types) }));
            }
            else if (node.type === 'text') {
                filterText(acc, node);
            }
            else {
                acc.push(node);
            }
        }
        else if (node.content) {
            if (breakBetweenBlocks && acc.length > 0 && isBlockNode(node, schema)) {
                // Seperate blocks with hard breaks
                acc.push({
                    type: 'hardBreak',
                });
            }
            filterContent(node.content, types).forEach(function (child) { return acc.push(child); });
        }
        return acc;
    }, []);
};
export var filterContentByType = function (doc, types, schema, breakBetweenBlocks) {
    var content = doc.content;
    if (!content) {
        return [];
    }
    return filterContent(content, types, schema, breakBetweenBlocks);
};
export var filterSliceByType = function (slice, types, schema, breakBetweenBlocks) {
    var jsonSlice = slice.toJSON();
    if (!jsonSlice) {
        return slice;
    }
    var content = jsonSlice.content;
    var filteredContent = filterContent(content, types, schema, breakBetweenBlocks);
    return Slice.fromJSON(schema, {
        content: filteredContent,
        openStart: slice.openStart,
        openEnd: slice.openEnd,
    });
};
//# sourceMappingURL=filter.js.map