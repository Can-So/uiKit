import * as tslib_1 from "tslib";
export function isBody(elem) {
    return elem === document.body;
}
export function isTextNode(elem) {
    return elem && elem.nodeType === 3;
}
/**
 * Decides if given fitHeight fits below or above the target taking boundaries into account.
 */
export function getVerticalPlacement(target, boundariesElement, fitHeight, alignY, forcePlacement) {
    if (forcePlacement && alignY) {
        return alignY;
    }
    if (!fitHeight) {
        return 'bottom';
    }
    if (isTextNode(target)) {
        target = target.parentElement;
    }
    var boundariesClientRect = boundariesElement.getBoundingClientRect();
    var boundariesHeight = boundariesClientRect.height;
    var boundariesTop = isBody(boundariesElement)
        ? 0
        : boundariesClientRect.top;
    var _a = target.getBoundingClientRect(), targetTop = _a.top, targetHeight = _a.height;
    var spaceAbove = targetTop - (boundariesTop - boundariesElement.scrollTop);
    var spaceBelow = boundariesTop + boundariesHeight - (targetTop + targetHeight);
    if (spaceBelow >= fitHeight || spaceBelow >= spaceAbove) {
        return 'bottom';
    }
    return 'top';
}
/**
 * Decides if given fitWidth fits to the left or to the right of the target taking boundaries into account.
 */
export function getHorizontalPlacement(target, boundariesElement, fitWidth, alignX, forcePlacement) {
    if (forcePlacement && alignX) {
        return alignX;
    }
    if (!fitWidth) {
        return alignX || 'left';
    }
    if (isTextNode(target)) {
        target = target.parentElement;
    }
    var _a = target.getBoundingClientRect(), targetLeft = _a.left, targetWidth = _a.width;
    var _b = boundariesElement.getBoundingClientRect(), boundariesLeft = _b.left, boundariesWidth = _b.width;
    var spaceLeft = targetLeft - boundariesLeft + targetWidth;
    var spaceRight = boundariesLeft + boundariesWidth - targetLeft;
    if (alignX && spaceLeft > fitWidth && spaceRight > fitWidth) {
        return alignX;
    }
    else if (spaceRight >= fitWidth || (spaceRight >= spaceLeft && !alignX)) {
        return 'left';
    }
    return 'right';
}
export function calculatePlacement(target, boundariesElement, fitWidth, fitHeight, alignX, alignY, forcePlacement) {
    return [
        getVerticalPlacement(target, boundariesElement, fitHeight, alignY, forcePlacement),
        getHorizontalPlacement(target, boundariesElement, fitWidth, alignX, forcePlacement),
    ];
}
var calculateHorizontalPlacement = function (_a) {
    var placement = _a.placement, targetLeft = _a.targetLeft, targetRight = _a.targetRight, targetWidth = _a.targetWidth, isPopupParentBody = _a.isPopupParentBody, popupOffsetParentLeft = _a.popupOffsetParentLeft, popupOffsetParentRight = _a.popupOffsetParentRight, popupOffsetParentScrollLeft = _a.popupOffsetParentScrollLeft, popupClientWidth = _a.popupClientWidth, offset = _a.offset;
    var position = {};
    if (placement === 'left') {
        position.left = Math.ceil(targetLeft -
            popupOffsetParentLeft +
            (isPopupParentBody ? 0 : popupOffsetParentScrollLeft) +
            offset[0]);
    }
    else if (placement === 'center') {
        position.left = Math.ceil(targetLeft -
            popupOffsetParentLeft +
            (isPopupParentBody ? 0 : popupOffsetParentScrollLeft) +
            offset[0] +
            targetWidth / 2 -
            popupClientWidth / 2);
    }
    else if (placement === 'end') {
        var right = Math.ceil(targetLeft -
            popupOffsetParentLeft -
            popupClientWidth -
            (isPopupParentBody ? 0 : popupOffsetParentScrollLeft) +
            offset[0]);
        position.right = Math.max(right, 0);
    }
    else {
        position.right = Math.ceil(popupOffsetParentRight -
            targetRight -
            (isPopupParentBody ? 0 : popupOffsetParentScrollLeft) +
            offset[0]);
    }
    return position;
};
var calculateVerticalStickBottom = function (_a) {
    var target = _a.target, targetTop = _a.targetTop, targetHeight = _a.targetHeight, popup = _a.popup, offset = _a.offset, position = _a.position;
    var scrollParent = findOverflowScrollParent(target);
    var newPos = tslib_1.__assign({}, position);
    if (scrollParent) {
        var topOffsetTop = targetTop - scrollParent.getBoundingClientRect().top;
        var targetEnd = targetHeight + topOffsetTop;
        if (scrollParent.clientHeight - targetEnd <=
            popup.clientHeight + offset[1] * 2 &&
            topOffsetTop < scrollParent.clientHeight) {
            var scroll_1 = targetEnd - scrollParent.clientHeight + offset[1] * 2;
            var top_1 = newPos.top || 0;
            top_1 = top_1 - (scroll_1 + popup.clientHeight);
            newPos.top = top_1;
        }
    }
    return newPos;
};
var calculateVerticalStickTop = function (_a) {
    var target = _a.target, targetTop = _a.targetTop, targetHeight = _a.targetHeight, popupOffsetParentHeight = _a.popupOffsetParentHeight, popupOffsetParent = _a.popupOffsetParent, popup = _a.popup, offset = _a.offset, position = _a.position, placement = _a.placement;
    var scrollParent = findOverflowScrollParent(target);
    var newPos = tslib_1.__assign({}, position);
    if (scrollParent) {
        var scrollParentTop = scrollParent.getBoundingClientRect().top;
        var topBoundary = targetTop - scrollParentTop;
        var scrollParentScrollTop = scrollParent.scrollTop;
        if (topBoundary < 0) {
            var isBelowNodeBoundary = targetTop +
                (scrollParentScrollTop - scrollParentTop) +
                targetHeight +
                offset[1] <
                scrollParentScrollTop;
            if (placement === 'top') {
                if (isBelowNodeBoundary) {
                    newPos.bottom =
                        popupOffsetParentHeight -
                            (topBoundary + popupOffsetParent.scrollTop + targetHeight);
                }
                else {
                    newPos.bottom = topBoundary + (newPos.bottom || 0);
                }
            }
            if (placement === 'start') {
                if (isBelowNodeBoundary) {
                    newPos.top = topBoundary + popupOffsetParent.scrollTop + targetHeight;
                }
                else {
                    newPos.top = Math.abs(topBoundary) + (newPos.top || 0) + offset[1];
                }
            }
        }
    }
    return newPos;
};
var calculateVerticalPlacement = function (_a) {
    var placement = _a.placement, targetTop = _a.targetTop, targetHeight = _a.targetHeight, isPopupParentBody = _a.isPopupParentBody, popupOffsetParentHeight = _a.popupOffsetParentHeight, popupOffsetParentTop = _a.popupOffsetParentTop, popupOffsetParentScrollTop = _a.popupOffsetParentScrollTop, borderBottomWidth = _a.borderBottomWidth, offset = _a.offset;
    var position = {};
    if (placement === 'top') {
        position.bottom = Math.ceil(popupOffsetParentHeight -
            (targetTop - popupOffsetParentTop) -
            (isPopupParentBody ? 0 : popupOffsetParentScrollTop) -
            borderBottomWidth +
            offset[1]);
    }
    else if (placement === 'start') {
        position.top = Math.ceil(targetTop -
            popupOffsetParentTop -
            offset[1] +
            (isPopupParentBody ? 0 : popupOffsetParentScrollTop));
    }
    else {
        var top_2 = Math.ceil(targetTop -
            popupOffsetParentTop +
            targetHeight +
            (isPopupParentBody ? 0 : popupOffsetParentScrollTop) -
            borderBottomWidth +
            offset[1]);
        position.top = top_2;
    }
    return position;
};
/**
 * Calculates relative coordinates for placing popup along with the target.
 * Uses placement from calculatePlacement.
 */
export function calculatePosition(_a) {
    var placement = _a.placement, target = _a.target, popup = _a.popup, offset = _a.offset, stick = _a.stick;
    var position = {};
    if (!target || !popup || !popup.offsetParent) {
        return position;
    }
    if (isTextNode(target)) {
        target = target.parentElement;
    }
    var popupOffsetParent = popup.offsetParent;
    var offsetParentStyle = popupOffsetParent.style;
    var borderBottomWidth = 0;
    if (offsetParentStyle && offsetParentStyle.borderBottomWidth) {
        borderBottomWidth = parseInt(offsetParentStyle.borderBottomWidth, 10);
    }
    var _b = tslib_1.__read(placement, 2), verticalPlacement = _b[0], horizontalPlacement = _b[1];
    var _c = popupOffsetParent.getBoundingClientRect(), popupOffsetParentTop = _c.top, popupOffsetParentLeft = _c.left, popupOffsetParentRight = _c.right, popupOffsetParentHeight = _c.height;
    var _d = target.getBoundingClientRect(), targetTop = _d.top, targetLeft = _d.left, targetRight = _d.right, targetHeight = _d.height, targetWidth = _d.width;
    var isPopupParentBody = isBody(popupOffsetParent);
    var verticalPosition = calculateVerticalPlacement({
        placement: verticalPlacement,
        targetTop: targetTop,
        isPopupParentBody: isPopupParentBody,
        popupOffsetParentHeight: popupOffsetParentHeight,
        popupOffsetParentTop: popupOffsetParentTop,
        popupOffsetParentScrollTop: popupOffsetParent.scrollTop || 0,
        targetHeight: targetHeight,
        borderBottomWidth: borderBottomWidth,
        offset: offset,
    });
    position = tslib_1.__assign({}, position, verticalPosition);
    if ((verticalPlacement === 'top' || verticalPlacement === 'start') && stick) {
        position = calculateVerticalStickTop({
            target: target,
            targetTop: targetTop,
            targetHeight: targetHeight,
            popupOffsetParentHeight: popupOffsetParentHeight,
            popupOffsetParent: popupOffsetParent,
            popup: popup,
            offset: offset,
            position: position,
            placement: verticalPlacement,
        });
    }
    if (verticalPlacement !== 'top' && verticalPlacement !== 'start' && stick) {
        position = calculateVerticalStickBottom({
            target: target,
            targetTop: targetTop,
            targetHeight: targetHeight,
            popup: popup,
            offset: offset,
            position: position,
        });
    }
    var horizontalPosition = calculateHorizontalPlacement({
        placement: horizontalPlacement,
        targetLeft: targetLeft,
        targetRight: targetRight,
        targetWidth: targetWidth,
        isPopupParentBody: isPopupParentBody,
        popupOffsetParentLeft: popupOffsetParentLeft,
        popupOffsetParentRight: popupOffsetParentRight,
        popupOffsetParentScrollLeft: popupOffsetParent.scrollLeft || 0,
        popupClientWidth: popup.clientWidth || 0,
        offset: offset,
    });
    position = tslib_1.__assign({}, position, horizontalPosition);
    return position;
}
/**
 * Traverse DOM Tree upwards looking for popup parents with "overflow: scroll".
 */
export function findOverflowScrollParent(popup) {
    var parent = popup;
    if (!parent) {
        return false;
    }
    while ((parent = parent.parentElement)) {
        // IE11 on Window 8 doesn't show styles from CSS when accessing through element.style property.
        var style = window.getComputedStyle(parent);
        if (style.overflow === 'scroll' ||
            style.overflowX === 'scroll' ||
            style.overflowY === 'scroll' ||
            parent.classList.contains('fabric-editor-popup-scroll-parent')) {
            return parent;
        }
    }
    return false;
}
//# sourceMappingURL=utils.js.map