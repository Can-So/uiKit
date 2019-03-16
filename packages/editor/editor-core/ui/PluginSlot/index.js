import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
var PluginsComponentsWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
var PluginSlot = /** @class */ (function (_super) {
    tslib_1.__extends(PluginSlot, _super);
    function PluginSlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PluginSlot.prototype.shouldComponentUpdate = function (nextProps) {
        var _a = this.props, editorView = _a.editorView, editorActions = _a.editorActions, items = _a.items, providerFactory = _a.providerFactory, eventDispatcher = _a.eventDispatcher, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, containerElement = _a.containerElement, disabled = _a.disabled;
        return !(nextProps.editorView === editorView &&
            nextProps.editorActions === editorActions &&
            nextProps.items === items &&
            nextProps.providerFactory === providerFactory &&
            nextProps.eventDispatcher === eventDispatcher &&
            nextProps.popupsMountPoint === popupsMountPoint &&
            nextProps.popupsBoundariesElement === popupsBoundariesElement &&
            nextProps.popupsScrollableElement === popupsScrollableElement &&
            nextProps.containerElement === containerElement &&
            nextProps.disabled === disabled);
    };
    PluginSlot.prototype.render = function () {
        var _a = this.props, items = _a.items, editorView = _a.editorView, editorActions = _a.editorActions, eventDispatcher = _a.eventDispatcher, providerFactory = _a.providerFactory, appearance = _a.appearance, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, containerElement = _a.containerElement, disabled = _a.disabled, dispatchAnalyticsEvent = _a.dispatchAnalyticsEvent;
        if (!items || !editorView) {
            return null;
        }
        return (React.createElement(PluginsComponentsWrapper, null, items.map(function (component, key) {
            var props = { key: key };
            var element = component({
                editorView: editorView,
                editorActions: editorActions,
                eventDispatcher: eventDispatcher,
                providerFactory: providerFactory,
                dispatchAnalyticsEvent: dispatchAnalyticsEvent,
                appearance: appearance,
                popupsMountPoint: popupsMountPoint,
                popupsBoundariesElement: popupsBoundariesElement,
                popupsScrollableElement: popupsScrollableElement,
                containerElement: containerElement,
                disabled: disabled,
            });
            return element && React.cloneElement(element, props);
        })));
    };
    return PluginSlot;
}(React.Component));
export default PluginSlot;
var templateObject_1;
//# sourceMappingURL=index.js.map