import * as tslib_1 from "tslib";
import * as React from 'react';
import { colors, themed } from '@findable/theme';
import InfoIcon from '@findable/icon/glyph/editor/info';
import SuccessIcon from '@findable/icon/glyph/editor/success';
import NoteIcon from '@findable/icon/glyph/editor/note';
import WarningIcon from '@findable/icon/glyph/editor/warning';
import ErrorIcon from '@findable/icon/glyph/editor/error';
import TipIcon from '@findable/icon/glyph/editor/hint';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import styled from 'styled-components';
import { hexToRgba } from '@findable/editor-common';
var lightPanelColor = {
    info: colors.B50,
    note: colors.P50,
    tip: colors.G50,
    success: colors.G50,
    warning: colors.Y50,
    error: colors.R50,
};
var darkPanelOpacity = 0.64;
var darkPanelColor = {
    info: colors.B500,
    note: colors.P500,
    tip: colors.G500,
    success: colors.G500,
    warning: colors.Y500,
    error: colors.R500,
};
var darkPanelBorderColor = {
    info: colors.B400,
    note: colors.P400,
    tip: colors.G400,
    success: colors.G400,
    warning: colors.Y400,
    error: colors.R400,
};
var lightIconColor = {
    info: colors.B400,
    note: colors.P400,
    tip: colors.G400,
    success: colors.G400,
    warning: colors.Y400,
    error: colors.R400,
};
var darkIconColor = {
    info: colors.B100,
    note: colors.P100,
    tip: colors.G200,
    success: colors.G200,
    warning: colors.Y100,
    error: colors.R200,
};
var darkTextColor = {
    info: colors.B75,
    note: colors.P75,
    tip: colors.G75,
    success: colors.G75,
    warning: colors.Y75,
    error: colors.R75,
};
var panelIcons = {
    info: InfoIcon,
    success: SuccessIcon,
    note: NoteIcon,
    tip: TipIcon,
    warning: WarningIcon,
    error: ErrorIcon,
};
export var PanelWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  ", ";\n"], ["\n  ",
    ";\n"])), function (props) {
    var panelType = props.panelType;
    var light = lightPanelColor[panelType];
    var dark = hexToRgba(darkPanelColor[panelType], darkPanelOpacity);
    var darkText = darkTextColor[panelType];
    var background = themed({ light: light, dark: dark })(props);
    var darkBorder = '1px solid ' + darkPanelBorderColor[panelType];
    var border = themed({ light: 'none', dark: darkBorder })(props);
    var text = themed({ light: 'inherit', dark: darkText })(props);
    return "\n      background: " + background + ";\n      border: " + border + "\n      color: " + text + "\n    ";
});
export var IconWrapper = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  ", ";\n"], ["\n  ",
    ";\n"])), function (props) {
    var panelType = props.panelType;
    var light = lightIconColor[panelType];
    var dark = darkIconColor[panelType];
    var color = themed({ light: light, dark: dark })(props);
    return "\n      color: " + color + ";\n    ";
});
var PanelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PanelComponent, _super);
    function PanelComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelComponent.prototype.shouldComponentUpdate = function (nextProps) {
        return this.props.panelType !== nextProps.panelType;
    };
    PanelComponent.prototype.render = function () {
        var _a = this.props, panelType = _a.panelType, forwardRef = _a.forwardRef;
        var Icon = panelIcons[panelType];
        return (React.createElement(PanelWrapper, { panelType: panelType, className: "ak-editor-panel" },
            React.createElement(IconWrapper, { panelType: panelType, className: "ak-editor-panel__icon" },
                React.createElement(Icon, { label: "Panel " + panelType })),
            React.createElement("div", { className: "ak-editor-panel__content", ref: forwardRef })));
    };
    return PanelComponent;
}(React.Component));
var Panel = /** @class */ (function (_super) {
    tslib_1.__extends(Panel, _super);
    function Panel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Panel.prototype.createDomRef = function () {
        var domRef = document.createElement('div');
        domRef.setAttribute('data-panel-type', this.node.attrs.panelType);
        return domRef;
    };
    Panel.prototype.getContentDOM = function () {
        var dom = document.createElement('div');
        dom.className = 'panel-content-dom';
        return { dom: dom };
    };
    Panel.prototype.render = function (_props, forwardRef) {
        var panelType = this.node.attrs.panelType;
        return React.createElement(PanelComponent, { panelType: panelType, forwardRef: forwardRef });
    };
    Panel.prototype.update = function (node, decorations) {
        return _super.prototype.update.call(this, node, decorations, function (currentNode, newNode) {
            return currentNode.attrs.panelType === newNode.attrs.panelType;
        });
    };
    return Panel;
}(ReactNodeView));
export var panelNodeView = function (portalProviderAPI) { return function (node, view, getPos) {
    return new Panel(node, view, getPos, portalProviderAPI).init();
}; };
var templateObject_1, templateObject_2;
//# sourceMappingURL=panel.js.map