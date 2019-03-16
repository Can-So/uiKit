export var getDocStructure = function (doc) {
    try {
        return getBlockNode(doc, 0);
    }
    catch (error) {
        return "Error logging document structure: " + error;
    }
};
var getBlockNode = function (node, pos) {
    var blockNode = {
        type: node.type.name,
        pos: pos,
        nodeSize: node.nodeSize,
    };
    var content = getBlockNodeContent(node.content, pos);
    if (content.length > 0) {
        blockNode.content = content;
    }
    var marks = getMarks(node);
    if (marks.length > 0) {
        blockNode.marks = marks;
    }
    return blockNode;
};
var getBlockNodeContent = function (node, pos) {
    if (!node || !node.content || !node.content.length) {
        return [];
    }
    var blockNodeContent = [];
    var content = node.content;
    if (content[0].isBlock) {
        // children are block nodes
        var prevNode_1;
        blockNodeContent = content.map(function (node) {
            pos += prevNode_1 ? prevNode_1.nodeSize : 1;
            prevNode_1 = node;
            return getBlockNode(node, pos);
        });
    }
    else {
        // children are inline nodes
        var result = getInlineNodes(content, pos);
        blockNodeContent = result.inlineNodes;
        pos = result.pos;
    }
    return blockNodeContent;
};
var getInlineNodes = function (nodes, pos) {
    var inlineNodes = nodes.map(function (node) {
        var nodeSize = node.nodeSize;
        var inlineNode = {
            type: node.type.name,
            pos: pos,
            nodeSize: nodeSize,
        };
        var marks = getMarks(node);
        if (marks.length > 0) {
            inlineNode.marks = marks;
        }
        pos += nodeSize;
        return inlineNode;
    });
    return { inlineNodes: inlineNodes, pos: pos };
};
var getMarks = function (node) {
    return node.marks.map(function (mark) { return mark.type.name; });
};
//# sourceMappingURL=document-logger.js.map