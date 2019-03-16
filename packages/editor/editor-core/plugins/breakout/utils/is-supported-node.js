var supportedNodesForBreakout = ['codeBlock', 'layoutSection'];
export function isSupportedNodeForBreakout(node) {
    return supportedNodesForBreakout.indexOf(node.type.name) !== -1;
}
//# sourceMappingURL=is-supported-node.js.map