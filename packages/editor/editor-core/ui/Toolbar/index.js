import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import WidthDetector from '@findable/width-detector';
var ToolbarComponentsWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
export var ToolbarSize;
(function (ToolbarSize) {
    ToolbarSize[ToolbarSize["XXL"] = 6] = "XXL";
    ToolbarSize[ToolbarSize["XL"] = 5] = "XL";
    ToolbarSize[ToolbarSize["L"] = 4] = "L";
    ToolbarSize[ToolbarSize["M"] = 3] = "M";
    ToolbarSize[ToolbarSize["S"] = 2] = "S";
    ToolbarSize[ToolbarSize["XXXS"] = 1] = "XXXS";
})(ToolbarSize || (ToolbarSize = {}));
// Toolbar sizes for full page editor a little bit different, because it has more buttons e.g. actions button...
var toolbarSizesFullPage = [
    { width: 650, size: ToolbarSize.XXL },
    { width: 580, size: ToolbarSize.XL },
    { width: 500, size: ToolbarSize.L },
    { width: 450, size: ToolbarSize.M },
    { width: 370, size: ToolbarSize.S },
];
var toolbarSizes = [
    { width: 610, size: ToolbarSize.XXL },
    { width: 540, size: ToolbarSize.XL },
    { width: 460, size: ToolbarSize.L },
    { width: 450, size: ToolbarSize.M },
    { width: 370, size: ToolbarSize.S },
];
var ToolbarInner = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarInner, _super);
    function ToolbarInner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolbarInner.prototype.shouldComponentUpdate = function (nextProps) {
        return (nextProps.toolbarSize !== this.props.toolbarSize ||
            nextProps.disabled !== this.props.disabled ||
            nextProps.popupsMountPoint === this.props.popupsMountPoint ||
            nextProps.popupsBoundariesElement ===
                this.props.popupsBoundariesElement ||
            nextProps.popupsScrollableElement ===
                this.props.popupsScrollableElement ||
            nextProps.isReducedSpacing !== this.props.isToolbarReducedSpacing);
    };
    ToolbarInner.prototype.render = function () {
        var _a = this.props, appearance = _a.appearance, editorView = _a.editorView, editorActions = _a.editorActions, eventDispatcher = _a.eventDispatcher, providerFactory = _a.providerFactory, items = _a.items, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, toolbarSize = _a.toolbarSize, disabled = _a.disabled, isToolbarReducedSpacing = _a.isToolbarReducedSpacing, dispatchAnalyticsEvent = _a.dispatchAnalyticsEvent;
        if (!items || !items.length) {
            return null;
        }
        return (React.createElement(ToolbarComponentsWrapper, null, items.map(function (component, key) {
            var props = { key: key };
            var element = component({
                editorView: editorView,
                editorActions: editorActions,
                eventDispatcher: eventDispatcher,
                providerFactory: providerFactory,
                appearance: appearance,
                popupsMountPoint: popupsMountPoint,
                popupsBoundariesElement: popupsBoundariesElement,
                popupsScrollableElement: popupsScrollableElement,
                disabled: disabled,
                toolbarSize: toolbarSize,
                isToolbarReducedSpacing: isToolbarReducedSpacing,
                containerElement: undefined,
                dispatchAnalyticsEvent: dispatchAnalyticsEvent,
            });
            return element && React.cloneElement(element, props);
        })));
    };
    return ToolbarInner;
}(React.Component));
export { ToolbarInner };
var toolbarSizesForAppearance = function (appearance) {
    return appearance === 'full-page' ? toolbarSizesFullPage : toolbarSizes;
};
var widthToToolbarSize = function (toolbarWidth, appearance) {
    return (toolbarSizesForAppearance(appearance).find(function (_a) {
        var width = _a.width;
        return toolbarWidth > width;
    }) || {
        size: ToolbarSize.XXXS,
    }).size;
};
export function Toolbar(props) {
    var toolbarSize = widthToToolbarSize(props.width || 0, props.appearance);
    return (React.createElement(ToolbarInner, tslib_1.__assign({}, props, { toolbarSize: toolbarSize, isToolbarReducedSpacing: toolbarSize < ToolbarSize.XXL })));
}
export default function ToolbarWithSizeDetector(props) {
    return (React.createElement("div", { style: { width: '100%', minWidth: '254px' } },
        React.createElement(WidthDetector, null, function (width) {
            return width === undefined ? null : React.createElement(Toolbar, tslib_1.__assign({}, props, { width: width }));
        })));
}
var templateObject_1;
//# sourceMappingURL=index.js.map