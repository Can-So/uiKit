import { addAnalytics, } from '../../analytics';
var indentTypes = {
    paragraph: "paragraph" /* PARAGRAPH */,
    heading: "heading" /* HEADING */,
};
/**
 * Get the current indentation level given prev and new attributes
 * @param prevAttrs - Previous attributes from indentation
 * @param newAttrs - New attributes from indentation
 */
export function getNewIndentLevel(prevAttrs, newAttrs) {
    if (newAttrs === undefined) {
        return prevAttrs.level;
    }
    else if (newAttrs === false) {
        return 0;
    }
    return newAttrs.level;
}
/**
 * Get the previous indentation level  prev attributes
 * @param prevAttrs - Previous attributes from indentation
 */
export function getPrevIndentLevel(prevAttrs) {
    if (prevAttrs === undefined) {
        return 0;
    }
    return prevAttrs.level;
}
/**
 * Create a new dispatch function who add analytics events given a list of attributes changes
 *
 * @export
 * @param {*} getAttrsChanges
 * @param dispatch
 * @returns
 */
export function createAnalyticsDispatch(getAttrsChanges, dispatch) {
    return function (tr) {
        var currentTr = tr;
        var changes = getAttrsChanges(); // Get all attributes changes
        // Add analytics event for each change stored.
        changes.forEach(function (_a) {
            var node = _a.node, prevAttrs = _a.prevAttrs, newAttrs = _a.newAttrs, direction = _a.options.direction;
            var indentType = indentTypes[node.type.name];
            if (!indentType) {
                return; // If no valid indent type continue
            }
            currentTr = addAnalytics(currentTr, {
                action: "formatted" /* FORMATTED */,
                actionSubject: "text" /* TEXT */,
                actionSubjectId: "indentation" /* FORMAT_INDENT */,
                eventType: "track" /* TRACK */,
                attributes: {
                    inputMethod: "keyboard" /* KEYBOARD */,
                    previousIndentationLevel: getPrevIndentLevel(prevAttrs),
                    newIndentLevel: getNewIndentLevel(prevAttrs, newAttrs),
                    direction: direction,
                    indentType: indentType,
                },
            });
        });
        // Dispatch analytics if exist
        if (dispatch) {
            dispatch(tr);
        }
    };
}
//# sourceMappingURL=utils.js.map