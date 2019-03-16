import * as tslib_1 from "tslib";
import { Fragment, } from 'prosemirror-model';
import { NodeSelection, TextSelection, } from 'prosemirror-state';
import { canMoveDown, canMoveUp } from '../utils';
import { withAnalytics, } from '../plugins/analytics';
export function preventDefault() {
    return function (state, dispatch) {
        return true;
    };
}
export function insertNewLine() {
    return function (state, dispatch) {
        var $from = state.selection.$from;
        var parent = $from.parent;
        var hardBreak = state.schema.nodes.hardBreak;
        if (hardBreak) {
            var hardBreakNode = hardBreak.create();
            if (parent && parent.type.validContent(Fragment.from(hardBreakNode))) {
                if (dispatch) {
                    dispatch(state.tr.replaceSelectionWith(hardBreakNode));
                }
                return true;
            }
        }
        if (state.selection instanceof TextSelection) {
            if (dispatch) {
                dispatch(state.tr.insertText('\n'));
            }
            return true;
        }
        return false;
    };
}
export var insertNewLineWithAnalytics = withAnalytics({
    action: "inserted" /* INSERTED */,
    actionSubject: "text" /* TEXT */,
    actionSubjectId: "lineBreak" /* LINE_BREAK */,
    eventType: "track" /* TRACK */,
})(insertNewLine());
export function insertRule() {
    return function (state, dispatch) {
        var to = state.selection.to;
        var rule = state.schema.nodes.rule;
        if (rule) {
            var ruleNode = rule.create();
            if (dispatch) {
                dispatch(state.tr.insert(to + 1, ruleNode));
            }
            return true;
        }
        return false;
    };
}
export var createNewParagraphAbove = function (state, dispatch) {
    var append = false;
    if (!canMoveUp(state) && canCreateParagraphNear(state)) {
        createParagraphNear(append)(state, dispatch);
        return true;
    }
    return false;
};
export var createNewParagraphBelow = function (state, dispatch) {
    var append = true;
    if (!canMoveDown(state) && canCreateParagraphNear(state)) {
        createParagraphNear(append)(state, dispatch);
        return true;
    }
    return false;
};
function canCreateParagraphNear(state) {
    var $from = state.selection.$from;
    var node = $from.node($from.depth);
    var insideCodeBlock = !!node && node.type === state.schema.nodes.codeBlock;
    var isNodeSelection = state.selection instanceof NodeSelection;
    return $from.depth > 1 || isNodeSelection || insideCodeBlock;
}
export function createParagraphNear(append) {
    if (append === void 0) { append = true; }
    return function (state, dispatch) {
        var paragraph = state.schema.nodes.paragraph;
        if (!paragraph) {
            return false;
        }
        var insertPos;
        if (state.selection instanceof TextSelection) {
            if (topLevelNodeIsEmptyTextBlock(state)) {
                return false;
            }
            insertPos = getInsertPosFromTextBlock(state, append);
        }
        else {
            insertPos = getInsertPosFromNonTextBlock(state, append);
        }
        var tr = state.tr.insert(insertPos, paragraph.createAndFill());
        tr.setSelection(TextSelection.create(tr.doc, insertPos + 1));
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    };
}
function getInsertPosFromTextBlock(state, append) {
    var _a = state.selection, $from = _a.$from, $to = _a.$to;
    var pos;
    if (!append) {
        pos = $from.start(0);
    }
    else {
        pos = $to.end(0);
    }
    return pos;
}
function getInsertPosFromNonTextBlock(state, append) {
    var _a = state.selection, $from = _a.$from, $to = _a.$to;
    var nodeAtSelection = state.selection instanceof NodeSelection &&
        state.doc.nodeAt(state.selection.$anchor.pos);
    var isMediaSelection = nodeAtSelection && nodeAtSelection.type.name === 'mediaGroup';
    var pos;
    if (!append) {
        // The start position is different with text block because it starts from 0
        pos = $from.start($from.depth);
        // The depth is different with text block because it starts from 0
        pos = $from.depth > 0 && !isMediaSelection ? pos - 1 : pos;
    }
    else {
        pos = $to.end($to.depth);
        pos = $to.depth > 0 && !isMediaSelection ? pos + 1 : pos;
    }
    return pos;
}
function topLevelNodeIsEmptyTextBlock(state) {
    var topLevelNode = state.selection.$from.node(1);
    return (topLevelNode.isTextblock &&
        topLevelNode.type !== state.schema.nodes.codeBlock &&
        topLevelNode.nodeSize === 2);
}
export function createParagraphAtEnd() {
    return function (state, dispatch) {
        var doc = state.doc, tr = state.tr, nodes = state.schema.nodes;
        if (doc.lastChild &&
            !(doc.lastChild.type === nodes.paragraph &&
                doc.lastChild.content.size === 0)) {
            tr.insert(doc.content.size, nodes.paragraph.createAndFill());
        }
        tr.setSelection(TextSelection.create(tr.doc, tr.doc.content.size - 1));
        tr.scrollIntoView();
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    };
}
export var changeImageAlignment = function (align) { return function (state, dispatch) {
    var _a = state.selection, from = _a.from, to = _a.to;
    var tr = state.tr;
    state.doc.nodesBetween(from, to, function (node, pos, parent) {
        if (node.type === state.schema.nodes.mediaSingle) {
            tr.setNodeMarkup(pos, undefined, tslib_1.__assign({}, node.attrs, { layout: align === 'center' ? 'center' : "align-" + align }));
        }
    });
    if (tr.docChanged && dispatch) {
        dispatch(tr.scrollIntoView());
        return true;
    }
    return false;
}; };
/**
 * Toggles block mark based on the return type of `getAttrs`.
 * This is similar to ProseMirror's `getAttrs` from `AttributeSpec`
 * return `false` to remove the mark.
 * return `undefined for no-op.
 * return an `object` to update the mark.
 */
export var toggleBlockMark = function (markType, getAttrs, allowedBlocks) { return function (state, dispatch) {
    var _a = state.selection, from = _a.from, to = _a.to;
    var markApplied = false;
    var tr = state.tr;
    state.doc.nodesBetween(from, to, function (node, pos, parent) {
        if (!node.type.isBlock) {
            return false;
        }
        if ((!allowedBlocks ||
            (Array.isArray(allowedBlocks)
                ? allowedBlocks.indexOf(node.type) > -1
                : allowedBlocks(state.schema, node, parent))) &&
            parent.type.allowsMarkType(markType)) {
            var oldMarks = node.marks.filter(function (mark) { return mark.type === markType; });
            var prevAttrs = oldMarks.length ? oldMarks[0].attrs : undefined;
            var newAttrs = getAttrs(prevAttrs, node);
            if (newAttrs !== undefined) {
                tr.setNodeMarkup(pos, node.type, node.attrs, node.marks
                    .filter(function (mark) { return !markType.excludes(mark.type); })
                    .concat(newAttrs === false ? [] : markType.create(newAttrs)));
                markApplied = true;
            }
        }
    });
    if (markApplied && tr.docChanged) {
        if (dispatch) {
            dispatch(tr.scrollIntoView());
        }
        return true;
    }
    return false;
}; };
//# sourceMappingURL=index.js.map