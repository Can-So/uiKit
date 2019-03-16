import { findPositionOfNodeBefore, findDomRefAtPos } from 'prosemirror-utils';
import { tableMarginTop } from '@atlaskit/editor-common';
import { Side } from './selection';
import { TableCssClassName } from '../table/types';
import { tableInsertColumnButtonSize } from '../table/ui/styles';
import { closestElement } from '../../utils';
// we don't show gap cursor for those nodes
var IGNORED_NODES = [
    'paragraph',
    'bulletList',
    'orderedList',
    'listItem',
    'taskItem',
    'decisionItem',
    'heading',
    'blockquote',
];
// Returns DOM node's vertical margin. It descents into the node and reads margins of nested DOM nodes
var getDomNodeVerticalMargin = function (ref, side) {
    var margin = 0;
    while (ref && ref.nodeType === 1) {
        var css = window.getComputedStyle(ref);
        var curMargin = parseInt(css["margin-" + side], 10);
        if (curMargin > margin) {
            margin = curMargin;
        }
        ref = ref[side === 'top' ? 'firstChild' : 'lastChild'];
    }
    return margin;
};
export var isIgnored = function (node) {
    return !!node && IGNORED_NODES.indexOf(node.type.name) !== -1;
};
export var isValidTargetNode = function (node) {
    return !!node && !isIgnored(node);
};
export var isTextBlockNearPos = function (doc, schema, $pos, dir) {
    var $currentPos = $pos;
    var currentNode = null;
    while ($currentPos.depth > 0) {
        $currentPos = doc.resolve(dir === -1 ? $currentPos.before() : $currentPos.after());
        if (!$currentPos) {
            return false;
        }
        currentNode =
            (dir === -1 ? $currentPos.nodeBefore : $currentPos.nodeAfter) ||
                $currentPos.parent;
        if (!currentNode || currentNode.type === schema.nodes.doc) {
            return false;
        }
        if (currentNode.isTextblock) {
            return true;
        }
    }
    var childNode = currentNode;
    while (childNode && childNode.firstChild) {
        childNode = childNode.firstChild;
        if (childNode && childNode.isTextblock) {
            return true;
        }
    }
    return false;
};
var isMediaSingle = function (node) {
    if (!node) {
        return false;
    }
    var firstChild = node.firstChild;
    return (!!firstChild &&
        firstChild.nodeType === Node.ELEMENT_NODE &&
        firstChild.classList.contains('media-single'));
};
var isNodeViewWrapper = function (node) {
    if (!node) {
        return false;
    }
    return (!!node &&
        node.nodeType === Node.ELEMENT_NODE &&
        node.className.indexOf('-content-wrap') !== -1);
};
function getBreakoutModeFromTargetNode(node) {
    if (node.attrs.layout) {
        return node.attrs.layout;
    }
    if (node.marks && node.marks.length) {
        return (node.marks.find(function (mark) { return mark.type.name === 'breakout'; }) || {
            attrs: { mode: '' },
        }).attrs.mode;
    }
    return '';
}
// incapsulated this hack into a separate util function
export var fixCursorAlignment = function (view) {
    var _a = view.state, selection = _a.selection, schema = _a.schema, domAtPos = view.domAtPos;
    var _b = selection, side = _b.side, $from = _b.$from;
    // gap cursor is positioned relative to that node
    var targetNode = side === Side.LEFT ? $from.nodeAfter : $from.nodeBefore;
    if (!targetNode) {
        return;
    }
    var targetNodePos = side === Side.LEFT ? $from.pos + 1 : findPositionOfNodeBefore(selection);
    if (!targetNodePos) {
        return;
    }
    var targetNodeRef = findDomRefAtPos(targetNodePos, domAtPos.bind(view));
    var gapCursorRef = view.dom.querySelector('.ProseMirror-gapcursor span');
    var gapCursorParentNodeRef = gapCursorRef.parentNode;
    var previousSibling = gapCursorParentNodeRef.previousSibling;
    var isTargetNodeMediaSingle = isMediaSingle(targetNodeRef);
    var isMediaWithWrapping = isTargetNodeMediaSingle &&
        /wrap-[right|left]/i.test(targetNode.attrs.layout);
    var prevNodeMarginBottom = getDomNodeVerticalMargin(previousSibling, 'bottom');
    var minHeight = 20;
    var height = 0;
    var width = 0;
    var marginTop = 0;
    var breakoutWidth = 0;
    var paddingLeft = 0;
    // gets width and height of the prevNode DOM element, or its nodeView wrapper DOM element
    do {
        var isTargetNodeNodeViewWrapper = isNodeViewWrapper(targetNodeRef);
        var firstChild = targetNodeRef.firstChild;
        var css = window.getComputedStyle(isTargetNodeMediaSingle || isTargetNodeNodeViewWrapper
            ? firstChild
            : targetNodeRef);
        var isInTableCell = /td|th/i.test(targetNodeRef.parentNode.nodeName);
        height = parseInt(css.height, 10);
        width = parseInt(css.width, 10);
        width += parseInt(css.paddingLeft, 10);
        width += parseInt(css.paddingRight, 10);
        height += parseInt(css.paddingTop, 10);
        height += parseInt(css.paddingBottom, 10);
        // padding is cumulative
        paddingLeft += parseInt(css.paddingLeft, 10);
        if (previousSibling || isMediaWithWrapping || isInTableCell) {
            var curNodeMarginTop = getDomNodeVerticalMargin(targetNodeRef, 'top');
            if (curNodeMarginTop > prevNodeMarginBottom) {
                marginTop = curNodeMarginTop - prevNodeMarginBottom;
            }
            if (isMediaWithWrapping) {
                marginTop = curNodeMarginTop;
            }
        }
        if (isTargetNodeNodeViewWrapper || isTargetNodeMediaSingle) {
            breakoutWidth = width;
        }
        targetNodeRef = targetNodeRef.parentNode;
    } while (targetNodeRef && !targetNodeRef.contains(gapCursorRef));
    // height of the rule (<hr>) is 0, that's why we set minHeight
    if (height < minHeight) {
        height = minHeight;
        marginTop -= Math.round(minHeight / 2) - 1;
    }
    // table nodeView margin fix
    if (targetNode.type === schema.nodes.table) {
        var tableFullMarginTop = tableMarginTop + tableInsertColumnButtonSize / 2;
        height -= tableFullMarginTop;
        marginTop = tableFullMarginTop;
        gapCursorRef.style.paddingLeft = paddingLeft + "px";
    }
    // breakout mode
    var breakoutMode = getBreakoutModeFromTargetNode(targetNode);
    if (/full-width|wide/i.test(breakoutMode)) {
        gapCursorRef.setAttribute('layout', breakoutMode);
    }
    // mediaSingle with layout="wrap-left" or "wrap-right"
    if (isMediaWithWrapping) {
        gapCursorParentNodeRef.setAttribute('layout', targetNode.attrs.layout);
        if (targetNode.attrs.layout === 'wrap-right') {
            gapCursorRef.style.marginLeft = "-" + width + "px";
        }
    }
    gapCursorRef.style.height = height + "px";
    gapCursorRef.style.marginTop = marginTop + "px";
    gapCursorRef.style.width = (breakoutWidth || width) + "px";
};
export var isIgnoredClick = function (elem) {
    if (elem.nodeName === 'BUTTON' || closestElement(elem, 'button')) {
        return true;
    }
    // check if target node has a parent table node
    var tableWrap;
    var node = elem;
    while (node) {
        if (node.className &&
            (node.getAttribute('class') || '').indexOf(TableCssClassName.TABLE_CONTAINER) > -1) {
            tableWrap = node;
            break;
        }
        node = node.parentNode;
    }
    if (tableWrap) {
        var rowControls = tableWrap.querySelector("." + TableCssClassName.ROW_CONTROLS_WRAPPER);
        var columnControls = tableWrap.querySelector("." + TableCssClassName.COLUMN_CONTROLS_WRAPPER);
        return ((rowControls && rowControls.contains(elem)) ||
            (columnControls && columnControls.contains(elem)));
    }
    return false;
};
//# sourceMappingURL=utils.js.map