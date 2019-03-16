import { keymap } from 'prosemirror-keymap';
import { analyticsService } from '../../analytics';
import { analyticsEventKey, } from '../../plugins/analytics';
export function createPlugin(eventDispatch, onSave) {
    if (!onSave) {
        return;
    }
    return keymap({
        Enter: function (state, _dispatch, editorView) {
            if (canSaveOnEnter(editorView)) {
                eventDispatch(analyticsEventKey, analyticsPayload(state));
                analyticsService.trackEvent('atlassian.editor.stop.submit');
                onSave(editorView);
                return true;
            }
            return false;
        },
    });
}
function canSaveOnEnter(editorView) {
    var $cursor = editorView.state.selection.$cursor;
    var _a = editorView.state.schema.nodes, decisionItem = _a.decisionItem, paragraph = _a.paragraph, taskItem = _a.taskItem;
    return (!$cursor ||
        ($cursor.parent.type === paragraph && $cursor.depth === 1) ||
        ($cursor.parent.type === decisionItem && !isEmptyAtCursor($cursor)) ||
        ($cursor.parent.type === taskItem && !isEmptyAtCursor($cursor)));
}
function isEmptyAtCursor($cursor) {
    var content = $cursor.parent.content;
    return !(content && content.size);
}
var analyticsPayload = function (state) { return ({
    payload: {
        action: "stopped" /* STOPPED */,
        actionSubject: "editor" /* EDITOR */,
        actionSubjectId: "save" /* SAVE */,
        attributes: {
            inputMethod: "shortcut" /* SHORTCUT */,
            documentSize: state.doc.nodeSize,
        },
        eventType: "ui" /* UI */,
    },
}); };
var saveOnEnterPlugin = {
    pmPlugins: function () {
        return [
            {
                name: 'saveOnEnter',
                plugin: function (_a) {
                    var props = _a.props, dispatch = _a.dispatch;
                    return createPlugin(dispatch, props.onSave);
                },
            },
        ];
    },
};
export default saveOnEnterPlugin;
//# sourceMappingURL=index.js.map