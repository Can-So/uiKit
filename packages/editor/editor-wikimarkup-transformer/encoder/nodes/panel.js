import { encode } from '..';
var panelTypeColorMapping = {
    info: '#deebff',
    note: '#eae6ff',
    success: '#e3fcef',
    warning: '#fffae6',
    error: '#ffebe6',
};
export var panel = function (node) {
    var result = [];
    node.forEach(function (n) {
        result.push(encode(n));
    });
    return "{panel:bgColor=" + (panelTypeColorMapping[node.attrs.panelType] || '') + "}\n" + result.join('\n\n') + "\n{panel}";
};
//# sourceMappingURL=panel.js.map