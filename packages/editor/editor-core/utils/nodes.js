/**
 * Finds all top level nodes affected by the transaction
 * Uses from/to positions in transaction's steps to work out which nodes will
 * be changed by the transaction
 */
export var findChangedNodesFromTransaction = function (tr) {
    var nodes = [];
    var steps = (tr.steps || []);
    steps.forEach(function (step) {
        var to = step.to, from = step.from, slice = step.slice;
        var size = slice && slice.content ? slice.content.size : 0;
        var _loop_1 = function (i) {
            if (i <= tr.doc.content.size) {
                var topLevelNode_1 = tr.doc.resolve(i).node(1);
                if (topLevelNode_1 && !nodes.find(function (n) { return n === topLevelNode_1; })) {
                    nodes.push(topLevelNode_1);
                }
            }
        };
        for (var i = from; i <= to + size; i++) {
            _loop_1(i);
        }
    });
    return nodes;
};
/** Validates prosemirror nodes, and returns true only if all nodes are valid */
export var validateNodes = function (nodes) {
    return nodes.every(function (node) {
        try {
            node.check(); // this will throw an error if the node is invalid
        }
        catch (error) {
            return false;
        }
        return true;
    });
};
//# sourceMappingURL=nodes.js.map