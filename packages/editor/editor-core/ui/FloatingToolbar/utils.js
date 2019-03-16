var getCursorHeightFrom = function (node) {
    return parseFloat(window.getComputedStyle(node, undefined).lineHeight || '');
};
export var getOffsetParent = function (editorViewDom, popupsMountPoint) {
    return popupsMountPoint
        ? popupsMountPoint.offsetParent
        : editorViewDom.offsetParent;
};
export var getNearestNonTextNode = function (node) {
    return node.nodeType === Node.TEXT_NODE
        ? node.parentNode
        : node;
};
/**
 * We need to translate the co-ordinates because `coordsAtPos` returns co-ordinates
 * relative to `window`. And, also need to adjust the cursor container height.
 * (0, 0)
 * +--------------------- [window] ---------------------+
 * |   (left, top) +-------- [Offset Parent] --------+  |
 * | {coordsAtPos} | [Cursor]   <- cursorHeight      |  |
 * |               | [FloatingToolbar]               |  |
 */
var convertFixedCoordinatesToAbsolutePositioning = function (coordinates, offsetParent, cursorHeight) {
    var _a = offsetParent.getBoundingClientRect(), offsetParentLeft = _a.left, offsetParentTop = _a.top, offsetParentHeight = _a.height;
    return {
        left: coordinates.left - offsetParentLeft,
        right: coordinates.right - offsetParentLeft,
        top: coordinates.top -
            (offsetParentTop - cursorHeight) +
            offsetParent.scrollTop,
        bottom: offsetParentHeight -
            (coordinates.top -
                (offsetParentTop - cursorHeight) -
                offsetParent.scrollTop),
    };
};
export var handlePositionCalculatedWith = function (offsetParent, node, getCurrentFixedCoordinates) { return function (position) {
    if (!offsetParent) {
        return position;
    }
    var target = getNearestNonTextNode(node);
    var cursorHeight = getCursorHeightFrom(target);
    var fixedCoordinates = getCurrentFixedCoordinates();
    var absoluteCoordinates = convertFixedCoordinatesToAbsolutePositioning(fixedCoordinates, offsetParent, cursorHeight);
    return {
        left: position.left ? absoluteCoordinates.left : undefined,
        right: position.right ? absoluteCoordinates.right : undefined,
        top: position.top ? absoluteCoordinates.top : undefined,
        bottom: position.bottom ? absoluteCoordinates.bottom : undefined,
    };
}; };
//# sourceMappingURL=utils.js.map