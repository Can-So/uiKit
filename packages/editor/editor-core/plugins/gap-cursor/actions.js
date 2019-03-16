import { Selection, TextSelection } from 'prosemirror-state';
import { removeNodeBefore } from 'prosemirror-utils';
import { findDomRefAtPos } from 'prosemirror-utils';
import { Direction, isBackward, isForward } from './direction';
import { GapCursorSelection, Side } from './selection';
import { isTextBlockNearPos, isValidTargetNode } from './utils';
import { atTheBeginningOfDoc, atTheEndOfDoc, ZWSP } from '../../utils';
import { pluginKey } from './pm-plugins/main';
export var arrow = function (dir, endOfTextblock) { return function (state, dispatch, view) {
    var doc = state.doc, schema = state.schema, selection = state.selection, tr = state.tr;
    var $pos = isBackward(dir) ? selection.$from : selection.$to;
    var mustMove = selection.empty;
    // start from text selection
    if (selection instanceof TextSelection) {
        // if cursor is in the middle of a text node, do nothing
        if (!endOfTextblock(dir.toString())) {
            return false;
        }
        // UP/DOWN jumps to the nearest texblock skipping gapcursor whenever possible
        if ((dir === Direction.UP &&
            !atTheBeginningOfDoc(state) &&
            isTextBlockNearPos(doc, schema, $pos, -1)) ||
            (dir === Direction.DOWN &&
                (atTheEndOfDoc(state) || isTextBlockNearPos(doc, schema, $pos, 1)))) {
            return false;
        }
        // otherwise resolve previous/next position
        $pos = doc.resolve(isBackward(dir) ? $pos.before() : $pos.after());
        mustMove = false;
    }
    // when jumping between block nodes at the same depth, we need to reverse cursor without changing ProseMirror position
    if (selection instanceof GapCursorSelection &&
        // next node allow gap cursor position
        isValidTargetNode(isBackward(dir) ? $pos.nodeBefore : $pos.nodeAfter) &&
        // gap cursor changes block node
        ((isBackward(dir) && selection.side === Side.LEFT) ||
            (isForward(dir) && selection.side === Side.RIGHT))) {
        // reverse cursor position
        if (dispatch) {
            dispatch(tr
                .setSelection(new GapCursorSelection($pos, selection.side === Side.RIGHT ? Side.LEFT : Side.RIGHT))
                .scrollIntoView());
        }
        return true;
    }
    if (view) {
        var domAtPos = view.domAtPos.bind(view);
        var target = findDomRefAtPos($pos.pos, domAtPos);
        if (target && target.textContent === ZWSP) {
            return false;
        }
    }
    var nextSelection = GapCursorSelection.findFrom($pos, isBackward(dir) ? -1 : 1, mustMove);
    if (!nextSelection) {
        return false;
    }
    if (!isValidTargetNode(isForward(dir)
        ? nextSelection.$from.nodeBefore
        : nextSelection.$from.nodeAfter)) {
        // reverse cursor position
        if (dispatch) {
            dispatch(tr
                .setSelection(new GapCursorSelection(nextSelection.$from, isForward(dir) ? Side.LEFT : Side.RIGHT))
                .scrollIntoView());
        }
        return true;
    }
    if (dispatch) {
        dispatch(tr.setSelection(nextSelection).scrollIntoView());
    }
    return true;
}; };
export var deleteNode = function (dir) { return function (state, dispatch) {
    if (state.selection instanceof GapCursorSelection) {
        var _a = state.selection, $from = _a.$from, $anchor = _a.$anchor;
        var tr = state.tr;
        if (isBackward(dir)) {
            if (state.selection.side === 'left') {
                tr.setSelection(new GapCursorSelection($anchor, Side.RIGHT));
                if (dispatch) {
                    dispatch(tr);
                }
                return true;
            }
            tr = removeNodeBefore(state.tr);
        }
        else if ($from.nodeAfter) {
            tr = tr.delete($from.pos, $from.pos + $from.nodeAfter.nodeSize);
        }
        if (dispatch) {
            dispatch(tr
                .setSelection(Selection.near(tr.doc.resolve(tr.mapping.map(state.selection.$from.pos))))
                .scrollIntoView());
        }
        return true;
    }
    return false;
}; };
export var setGapCursorAtPos = function (position, side) {
    if (side === void 0) { side = Side.LEFT; }
    return function (state, dispatch) {
        // @see ED-6231
        if (position > state.doc.content.size) {
            return false;
        }
        var $pos = state.doc.resolve(position);
        if (GapCursorSelection.valid($pos)) {
            if (dispatch) {
                dispatch(state.tr.setSelection(new GapCursorSelection($pos, side)));
            }
            return true;
        }
        return false;
    };
};
// This function captures clicks outside of the ProseMirror contentEditable area
// see also description of "handleClick" in gap-cursor pm-plugin
var captureCursorCoords = function (event, editorRef, posAtCoords, state) {
    var rect = editorRef.getBoundingClientRect();
    // capture clicks before the first block element
    if (event.clientY < rect.top) {
        return { position: 0, side: Side.LEFT };
    }
    if (rect.left > 0) {
        // calculate start position of a node that is vertically at the same level
        var coords = posAtCoords({
            left: rect.left,
            top: event.clientY,
        });
        if (coords && coords.inside > -1) {
            var $from = state.doc.resolve(coords.inside);
            var start = $from.before(1);
            var side = event.clientX < rect.left ? Side.LEFT : Side.RIGHT;
            var position = void 0;
            if (side === Side.LEFT) {
                position = start;
            }
            else {
                var node = state.doc.nodeAt(start);
                if (node) {
                    position = start + node.nodeSize;
                }
            }
            return { position: position, side: side };
        }
    }
    return null;
};
export var setCursorForTopLevelBlocks = function (event, editorRef, posAtCoords, editorFocused) { return function (state, dispatch) {
    // plugin is disabled
    if (!pluginKey.get(state)) {
        return false;
    }
    var cursorCoords = captureCursorCoords(event, editorRef, posAtCoords, state);
    if (!cursorCoords) {
        return false;
    }
    var $pos = cursorCoords.position !== undefined
        ? state.doc.resolve(cursorCoords.position)
        : null;
    if ($pos === null) {
        return false;
    }
    var isGapCursorAllowed = cursorCoords.side === Side.LEFT
        ? isValidTargetNode($pos.nodeAfter)
        : isValidTargetNode($pos.nodeBefore);
    if (isGapCursorAllowed && GapCursorSelection.valid($pos)) {
        // this forces PM to re-render the decoration node if we change the side of the gap cursor, it doesn't do it by default
        if (state.selection instanceof GapCursorSelection) {
            if (dispatch) {
                dispatch(state.tr.setSelection(Selection.near($pos)));
            }
        }
        if (dispatch) {
            dispatch(state.tr.setSelection(new GapCursorSelection($pos, cursorCoords.side)));
        }
        return true;
    }
    // try to set text selection if the editor isnt focused
    // if the editor is focused, we are most likely dragging a selection outside.
    else if (editorFocused === false) {
        var selection = Selection.findFrom($pos, cursorCoords.side === Side.LEFT ? 1 : -1, true);
        if (selection) {
            if (dispatch) {
                dispatch(state.tr.setSelection(selection));
            }
            return true;
        }
    }
    return false;
}; };
//# sourceMappingURL=actions.js.map