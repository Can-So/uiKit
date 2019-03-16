import { TableCssClassName as ClassName } from '../types';
import { closestElement } from '../../../utils';
export var isInsertColumnButton = function (node) {
    var cl = node.classList;
    return (cl.contains(ClassName.CONTROLS_INSERT_COLUMN) ||
        closestElement(node, "." + ClassName.CONTROLS_INSERT_COLUMN) ||
        (cl.contains(ClassName.CONTROLS_BUTTON_OVERLAY) &&
            closestElement(node, "." + ClassName.COLUMN_CONTROLS)));
};
export var isInsertRowButton = function (node) {
    var cl = node.classList;
    return (cl.contains(ClassName.CONTROLS_INSERT_ROW) ||
        closestElement(node, "." + ClassName.CONTROLS_INSERT_ROW) ||
        (cl.contains(ClassName.CONTROLS_BUTTON_OVERLAY) &&
            closestElement(node, "." + ClassName.ROW_CONTROLS)));
};
export var getIndex = function (target) {
    return parseInt(target.getAttribute('data-index') || '-1', 10);
};
//# sourceMappingURL=dom.js.map