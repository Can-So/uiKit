import { setParentNodeMarkup, removeParentNodeOfType } from 'prosemirror-utils';
import { analyticsService } from '../../analytics';
import { addAnalytics, } from '../analytics';
import { pluginKey } from './pm-plugins/main';
export var removePanel = function () { return function (state, dispatch) {
    var nodes = state.schema.nodes, tr = state.tr;
    var payload = {
        action: "deleted" /* DELETED */,
        actionSubject: "panel" /* PANEL */,
        attributes: { inputMethod: "toolbar" /* TOOLBAR */ },
        eventType: "track" /* TRACK */,
    };
    analyticsService.trackEvent("atlassian.editor.format.panel.delete.button");
    if (dispatch) {
        dispatch(addAnalytics(removeParentNodeOfType(nodes.panel)(tr), payload));
    }
    return true;
}; };
export var changePanelType = function (panelType) { return function (state, dispatch) {
    var nodes = state.schema.nodes, tr = state.tr;
    var previousType = pluginKey.getState(state).activePanelType;
    var payload = {
        action: "changedType" /* CHANGED_TYPE */,
        actionSubject: "panel" /* PANEL */,
        attributes: {
            newType: panelType,
            previousType: previousType,
        },
        eventType: "track" /* TRACK */,
    };
    analyticsService.trackEvent("atlassian.editor.format.panel." + panelType + ".button");
    if (dispatch) {
        dispatch(addAnalytics(setParentNodeMarkup(nodes.panel, null, { panelType: panelType })(tr), payload));
    }
    return true;
}; };
//# sourceMappingURL=actions.js.map