export var getExtensionLozengeData = function (_a) {
    var node = _a.node, type = _a.type;
    if (!node.attrs.parameters) {
        return;
    }
    var macroMetadata = node.attrs.parameters.macroMetadata;
    if (macroMetadata && macroMetadata.placeholder) {
        var placeholderData_1;
        macroMetadata.placeholder.forEach(function (placeholder) {
            if (placeholder.type === type &&
                placeholder.data &&
                placeholder.data.url) {
                placeholderData_1 = placeholder.data;
            }
        });
        return placeholderData_1;
    }
};
//# sourceMappingURL=macro.js.map