import { Selection } from 'prosemirror-state';
import { hasCode } from '../utils';
import { markActive } from '../utils';
import { transformToCodeAction } from './transform-to-code';
import { analyticsService } from '../../../analytics';
import { toggleMark } from '../../../utils/commands';
import { withAnalytics, } from '../../analytics';
export var moveRight = function () {
    return function (state, dispatch) {
        var code = state.schema.marks.code;
        var _a = state.selection, empty = _a.empty, $cursor = _a.$cursor;
        if (!empty || !$cursor) {
            return false;
        }
        var storedMarks = state.tr.storedMarks;
        if (code) {
            var insideCode = markActive(state, code.create());
            var currentPosHasCode = state.doc.rangeHasMark($cursor.pos, $cursor.pos, code);
            var nextPosHasCode = state.doc.rangeHasMark($cursor.pos, $cursor.pos + 1, code);
            var exitingCode = !currentPosHasCode &&
                !nextPosHasCode &&
                (!storedMarks || !!storedMarks.length);
            var enteringCode = !currentPosHasCode &&
                nextPosHasCode &&
                (!storedMarks || !storedMarks.length);
            // entering code mark (from the left edge): don't move the cursor, just add the mark
            if (!insideCode && enteringCode) {
                if (dispatch) {
                    dispatch(state.tr.addStoredMark(code.create()));
                }
                return true;
            }
            // exiting code mark: don't move the cursor, just remove the mark
            if (insideCode && exitingCode) {
                if (dispatch) {
                    dispatch(state.tr.removeStoredMark(code));
                }
                return true;
            }
        }
        return false;
    };
};
export var moveLeft = function (view) {
    return function (state, dispatch) {
        var code = state.schema.marks.code;
        var _a = state.selection, empty = _a.empty, $cursor = _a.$cursor;
        if (!empty || !$cursor) {
            return false;
        }
        var storedMarks = state.tr.storedMarks;
        if (code) {
            var insideCode = code && markActive(state, code.create());
            var currentPosHasCode = hasCode(state, $cursor.pos);
            var nextPosHasCode = hasCode(state, $cursor.pos - 1);
            var nextNextPosHasCode = hasCode(state, $cursor.pos - 2);
            var exitingCode = currentPosHasCode && !nextPosHasCode && Array.isArray(storedMarks);
            var atLeftEdge = nextPosHasCode &&
                !nextNextPosHasCode &&
                (storedMarks === null ||
                    (Array.isArray(storedMarks) && !!storedMarks.length));
            var atRightEdge = ((exitingCode && Array.isArray(storedMarks) && !storedMarks.length) ||
                (!exitingCode && storedMarks === null)) &&
                !nextPosHasCode &&
                nextNextPosHasCode;
            var enteringCode = !currentPosHasCode &&
                nextPosHasCode &&
                Array.isArray(storedMarks) &&
                !storedMarks.length;
            // at the right edge: remove code mark and move the cursor to the left
            if (!insideCode && atRightEdge) {
                var tr = state.tr.setSelection(Selection.near(state.doc.resolve($cursor.pos - 1)));
                if (dispatch) {
                    dispatch(tr.removeStoredMark(code));
                }
                return true;
            }
            // entering code mark (from right edge): don't move the cursor, just add the mark
            if (!insideCode && enteringCode) {
                if (dispatch) {
                    dispatch(state.tr.addStoredMark(code.create()));
                }
                return true;
            }
            // at the left edge: add code mark and move the cursor to the left
            if (insideCode && atLeftEdge) {
                var tr = state.tr.setSelection(Selection.near(state.doc.resolve($cursor.pos - 1)));
                if (dispatch) {
                    dispatch(tr.addStoredMark(code.create()));
                }
                return true;
            }
            // exiting code mark (or at the beginning of the line): don't move the cursor, just remove the mark
            var isFirstChild = $cursor.index($cursor.depth - 1) === 0;
            if (insideCode &&
                (exitingCode || (!$cursor.nodeBefore && isFirstChild))) {
                if (dispatch) {
                    dispatch(state.tr.removeStoredMark(code));
                }
                return true;
            }
        }
        return false;
    };
};
export var toggleEm = function () {
    return function (state, dispatch) {
        var em = state.schema.marks.em;
        if (em) {
            return toggleMark(em)(state, dispatch);
        }
        return false;
    };
};
export var toggleEmWithAnalytics = function (_a) {
    var inputMethod = _a.inputMethod;
    return withAnalytics({
        action: "formatted" /* FORMATTED */,
        actionSubject: "text" /* TEXT */,
        eventType: "track" /* TRACK */,
        actionSubjectId: "italic" /* FORMAT_ITALIC */,
        attributes: {
            inputMethod: inputMethod,
        },
    })(toggleEm());
};
export var toggleStrike = function () {
    return function (state, dispatch) {
        var strike = state.schema.marks.strike;
        if (strike) {
            return toggleMark(strike)(state, dispatch);
        }
        return false;
    };
};
export var toggleStrikeWithAnalytics = function (_a) {
    var inputMethod = _a.inputMethod;
    return withAnalytics({
        action: "formatted" /* FORMATTED */,
        actionSubject: "text" /* TEXT */,
        eventType: "track" /* TRACK */,
        actionSubjectId: "strike" /* FORMAT_STRIKE */,
        attributes: {
            inputMethod: inputMethod,
        },
    })(toggleStrike());
};
export var toggleStrong = function () {
    return function (state, dispatch) {
        var strong = state.schema.marks.strong;
        if (strong) {
            return toggleMark(strong)(state, dispatch);
        }
        return false;
    };
};
export var toggleStrongWithAnalytics = function (_a) {
    var inputMethod = _a.inputMethod;
    return withAnalytics({
        action: "formatted" /* FORMATTED */,
        actionSubject: "text" /* TEXT */,
        eventType: "track" /* TRACK */,
        actionSubjectId: "strong" /* FORMAT_STRONG */,
        attributes: {
            inputMethod: inputMethod,
        },
    })(toggleStrong());
};
export var toggleUnderline = function () {
    return function (state, dispatch) {
        var underline = state.schema.marks.underline;
        if (underline) {
            return toggleMark(underline)(state, dispatch);
        }
        return false;
    };
};
export var toggleUnderlineWithAnalytics = function (_a) {
    var inputMethod = _a.inputMethod;
    return withAnalytics({
        action: "formatted" /* FORMATTED */,
        actionSubject: "text" /* TEXT */,
        eventType: "track" /* TRACK */,
        actionSubjectId: "underline" /* FORMAT_UNDERLINE */,
        attributes: {
            inputMethod: inputMethod,
        },
    })(toggleUnderline());
};
export var toggleSuperscript = function () {
    return function (state, dispatch) {
        var subsup = state.schema.marks.subsup;
        if (subsup) {
            if (markActive(state, subsup.create({ type: 'sub' }))) {
                // If subscript is enabled, turn it off first.
                return toggleMark(subsup)(state, dispatch);
            }
            return toggleMark(subsup, { type: 'sup' })(state, dispatch);
        }
        return false;
    };
};
export var toggleSuperscriptWithAnalytics = function () {
    return withAnalytics({
        action: "formatted" /* FORMATTED */,
        actionSubject: "text" /* TEXT */,
        eventType: "track" /* TRACK */,
        actionSubjectId: "superscript" /* FORMAT_SUPER */,
        attributes: {
            inputMethod: "toolbar" /* TOOLBAR */,
        },
    })(toggleSuperscript());
};
export var toggleSubscript = function () {
    return function (state, dispatch) {
        var subsup = state.schema.marks.subsup;
        if (subsup) {
            if (markActive(state, subsup.create({ type: 'sup' }))) {
                return toggleMark(subsup)(state, dispatch);
            }
            return toggleMark(subsup, { type: 'sub' })(state, dispatch);
        }
        return false;
    };
};
export var toggleSubscriptWithAnalytics = function () {
    return withAnalytics({
        action: "formatted" /* FORMATTED */,
        actionSubject: "text" /* TEXT */,
        eventType: "track" /* TRACK */,
        actionSubjectId: "subscript" /* FORMAT_SUB */,
        attributes: {
            inputMethod: "toolbar" /* TOOLBAR */,
        },
    })(toggleSubscript());
};
export var toggleCode = function () {
    return function (state, dispatch) {
        var code = state.schema.marks.code;
        var _a = state.selection, from = _a.from, to = _a.to;
        if (code) {
            if (!markActive(state, code.create())) {
                if (dispatch) {
                    dispatch(transformToCodeAction(from, to, state.tr));
                }
                return true;
            }
            return toggleMark(code)(state, dispatch);
        }
        return false;
    };
};
export var toggleCodeWithAnalytics = function (_a) {
    var inputMethod = _a.inputMethod;
    return withAnalytics({
        action: "formatted" /* FORMATTED */,
        actionSubject: "text" /* TEXT */,
        eventType: "track" /* TRACK */,
        actionSubjectId: "code" /* FORMAT_CODE */,
        attributes: {
            inputMethod: inputMethod,
        },
    })(toggleCode());
};
var createInlineCodeFromTextInput = function (from, to, text) {
    return function (state, dispatch) {
        if (state.selection.empty) {
            var before = state.doc.resolve(from).nodeBefore;
            var after = state.doc.resolve(to).nodeAfter;
            var hasTickBefore = before && before.text && before.text.endsWith('`');
            var hasTickAfter = after && after.text && after.text.startsWith('`');
            if (hasTickBefore && hasTickAfter) {
                analyticsService.trackEvent("atlassian.editor.format.code.autoformatting");
                var tr = state.tr.replaceRangeWith(from - 1, to + 1, state.schema.text(text));
                if (dispatch) {
                    dispatch(transformToCodeAction(tr.mapping.map(from - 1), tr.mapping.map(to + 1), tr));
                }
                return true;
            }
        }
        return false;
    };
};
export var createInlineCodeFromTextInputWithAnalytics = function (from, to, text) {
    return withAnalytics({
        action: "formatted" /* FORMATTED */,
        actionSubject: "text" /* TEXT */,
        eventType: "track" /* TRACK */,
        actionSubjectId: "code" /* FORMAT_CODE */,
        attributes: {
            inputMethod: "autoformatting" /* FORMATTING */,
        },
    })(createInlineCodeFromTextInput(from, to, text));
};
//# sourceMappingURL=text-formatting.js.map