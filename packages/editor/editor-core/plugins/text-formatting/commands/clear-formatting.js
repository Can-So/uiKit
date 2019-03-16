import { liftTarget } from 'prosemirror-transform';
import { addAnalytics, } from '../../analytics';
export var FORMATTING_NODE_TYPES = ['heading', 'codeBlock', 'blockquote'];
export var FORMATTING_MARK_TYPES = [
    'em',
    'code',
    'strike',
    'strong',
    'underline',
    'textColor',
    'subsup',
];
var formatTypes = {
    em: "italic" /* FORMAT_ITALIC */,
    code: "code" /* FORMAT_CODE */,
    strike: "strike" /* FORMAT_STRIKE */,
    strong: "strong" /* FORMAT_STRONG */,
    underline: "underline" /* FORMAT_UNDERLINE */,
    textColor: "color" /* FORMAT_COLOR */,
    subsup: 'subsup',
};
export function clearFormattingWithAnalytics(inputMethod) {
    return clearFormatting(inputMethod);
}
export function clearFormatting(inputMethod) {
    return function (state, dispatch) {
        var tr = state.tr;
        var formattingCleared = [];
        FORMATTING_MARK_TYPES.forEach(function (mark) {
            var _a = tr.selection, from = _a.from, to = _a.to;
            var markType = state.schema.marks[mark];
            if (markType && state.doc.rangeHasMark(from, to, markType)) {
                formattingCleared.push(formatTypes[mark]);
                tr.removeMark(from, to, markType);
            }
        });
        FORMATTING_NODE_TYPES.forEach(function (nodeName) {
            var formattedNodeType = state.schema.nodes[nodeName];
            var _a = tr.selection, $from = _a.$from, $to = _a.$to;
            tr.doc.nodesBetween($from.pos, $to.pos, function (node, pos) {
                if (node.type === formattedNodeType) {
                    if (formattedNodeType.isTextblock) {
                        tr.setNodeMarkup(pos, state.schema.nodes.paragraph);
                        formattingCleared.push(nodeName);
                        return false;
                    }
                    else {
                        // In case of panel or blockquote
                        var fromPos = tr.doc.resolve(pos + 1);
                        var toPos = tr.doc.resolve(pos + node.nodeSize - 1);
                        var nodeRange = fromPos.blockRange(toPos);
                        if (nodeRange) {
                            var targetLiftDepth = liftTarget(nodeRange);
                            if (targetLiftDepth || targetLiftDepth === 0) {
                                formattingCleared.push(nodeName);
                                tr.lift(nodeRange, targetLiftDepth);
                            }
                        }
                    }
                }
                return true;
            });
        });
        tr.setStoredMarks([]);
        if (formattingCleared.length && inputMethod) {
            addAnalytics(tr, {
                action: "formatted" /* FORMATTED */,
                eventType: "track" /* TRACK */,
                actionSubject: "text" /* TEXT */,
                actionSubjectId: "clearFormatting" /* FORMAT_CLEAR */,
                attributes: {
                    inputMethod: inputMethod,
                    formattingCleared: formattingCleared,
                },
            });
        }
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    };
}
//# sourceMappingURL=clear-formatting.js.map