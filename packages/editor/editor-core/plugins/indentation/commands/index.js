import { toggleBlockMark } from '../../../commands';
import { createAnalyticsDispatch } from './utils';
import getAttrsWithChangesRecorder from '../../../utils/getAttrsWithChangesRecorder';
var MAX_INDENTATION_LEVEL = 6;
var isIndentationAllowed = function (schema, node, parent) {
    var _a = schema.nodes, paragraph = _a.paragraph, heading = _a.heading, alignment = schema.marks.alignment;
    if ([paragraph, heading].indexOf(node.type) > -1) {
        if (alignment) {
            var hasAlignment = node.marks.filter(function (mark) { return mark.type === alignment; })[0];
            return !hasAlignment;
        }
        return true;
    }
    return false;
};
/**
 * Create new indentation command (Either indent or outdent depend of getArgsFn)
 * @param getNewIndentationAttrs Function to handle new indentation level
 */
function createIndentationCommand(getNewIndentationAttrs) {
    return function (state, dispatch) {
        var indentation = state.schema.marks.indentation;
        return toggleBlockMark(indentation, getNewIndentationAttrs, isIndentationAllowed)(state, dispatch);
    };
}
function createIndentationCommandWithAnalytics(getNewIndentationAttrs, direction) {
    // Create a new getAttrs function to record the changes
    var _a = getAttrsWithChangesRecorder(getNewIndentationAttrs, { direction: direction }), getAttrs = _a.getAttrs, getAndResetAttrsChanges = _a.getAndResetAttrsChanges;
    // Use new getAttrs wrapper
    var indentationCommand = createIndentationCommand(getAttrs);
    // Return a new command where we change dispatch for our analytics dispatch
    return function (state, dispatch) {
        return indentationCommand(state, createAnalyticsDispatch(getAndResetAttrsChanges, dispatch));
    };
}
/**
 * Get new level for outdent
 * @param oldAttr Old attributes for the mark, undefined if the mark doesn't exit
 * @returns  - undefined; No change required
 *           - false; Remove the mark
 *           - object; Update attributes
 */
var getIndentAttrs = function (oldAttr) {
    if (!oldAttr) {
        return { level: 1 }; // No mark exist, create a new one with level 1
    }
    var level = oldAttr.level;
    if (level >= MAX_INDENTATION_LEVEL) {
        return undefined; // Max indentation level reached, do nothing.
    }
    return { level: level + 1 }; // Otherwise, increase the level by one
};
export var indent = createIndentationCommandWithAnalytics(getIndentAttrs, "indent" /* INDENT */);
/**
 * Get new level for outdent
 * @param oldAttr Old attributes for the mark, undefined if the mark doesn't exit
 * @returns  - undefined; No change required
 *           - false; Remove the mark
 *           - object; Update attributes
 */
var getOutdentAttrs = function (oldAttr) {
    if (!oldAttr) {
        return undefined; // Do nothing;
    }
    var level = oldAttr.level;
    if (level <= 1) {
        return false; // Remove the mark
    }
    return { level: level - 1 }; // Decrease the level on other cases
};
export var outdent = createIndentationCommandWithAnalytics(getOutdentAttrs, "outdent" /* OUTDENT */);
export var removeIndentation = function (state, dispatch) {
    return toggleBlockMark(state.schema.marks.indentation, function () { return false; })(state, dispatch);
};
//# sourceMappingURL=index.js.map