import * as tslib_1 from "tslib";
import * as React from 'react';
import { colors } from '@atlaskit/theme';
import { injectIntl } from 'react-intl';
import { findParentDomRefOfType } from 'prosemirror-utils';
import { Popup } from '@atlaskit/editor-common';
import CollapseIcon from '@atlaskit/icon/glyph/editor/collapse';
import ExpandIcon from '@atlaskit/icon/glyph/editor/expand';
import ToolbarButton from '../../../ui/ToolbarButton';
import styled from 'styled-components';
import { getBreakoutMode } from '../utils/get-breakout-mode';
import { setBreakoutMode } from '../commands/set-breakout-mode';
import { removeBreakout } from '../commands/remove-breakout';
import { getPluginState } from '../index';
import commonMessages from '../../../messages';
import { BreakoutCssClassName } from '../constants';
import { isBreakoutMarkAllowed } from '../utils/is-breakout-mark-allowed';
var B300 = colors.B300, N300 = colors.N300, N20A = colors.N20A;
var Wrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  button {\n    background: ", ";\n    color: ", ";\n    :hover {\n      background: ", ";\n      color: white !important;\n    }\n  }\n"], ["\n  button {\n    background: ", ";\n    color: ", ";\n    :hover {\n      background: ", ";\n      color: white !important;\n    }\n  }\n"])), N20A, N300, B300);
var BREAKOUT_MODE = {
    FULL_WIDTH: 'full-width',
    CENTER: 'center',
    WIDE: 'wide',
};
var getNextBreakoutMode = function (currentMode) {
    if (currentMode === BREAKOUT_MODE.FULL_WIDTH) {
        return BREAKOUT_MODE.CENTER;
    }
    else if (currentMode === BREAKOUT_MODE.WIDE) {
        return BREAKOUT_MODE.FULL_WIDTH;
    }
    return BREAKOUT_MODE.WIDE;
};
var getTitle = function (layout) {
    switch (layout) {
        case BREAKOUT_MODE.FULL_WIDTH:
            return commonMessages.layoutFixedWidth;
        case BREAKOUT_MODE.WIDE:
            return commonMessages.layoutFullWidth;
        default:
            return commonMessages.layoutWide;
    }
};
var LayoutButton = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutButton, _super);
    function LayoutButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (state, dispatch, breakoutMode) { return function () {
            if ([BREAKOUT_MODE.WIDE, BREAKOUT_MODE.FULL_WIDTH].indexOf(breakoutMode) !==
                -1) {
                setBreakoutMode(breakoutMode)(state, dispatch);
            }
            else {
                removeBreakout()(state, dispatch);
            }
        }; };
        return _this;
    }
    LayoutButton.prototype.render = function () {
        var _a = this.props, formatMessage = _a.intl.formatMessage, mountPoint = _a.mountPoint, boundariesElement = _a.boundariesElement, scrollableElement = _a.scrollableElement, editorView = _a.editorView, node = _a.node;
        var state = editorView.state, dispatch = editorView.dispatch;
        if (!node || !isBreakoutMarkAllowed(state)) {
            return null;
        }
        var breakoutMode = getBreakoutMode(editorView.state);
        var title = formatMessage(getTitle(breakoutMode));
        var nextBreakoutMode = getNextBreakoutMode(breakoutMode);
        var selection = state.selection;
        var pluginState = getPluginState(state);
        var element = findParentDomRefOfType(pluginState.breakoutNode.type, editorView.domAtPos.bind(editorView))(selection);
        var closestEl = element.querySelector("." + BreakoutCssClassName.BREAKOUT_MARK_DOM);
        if (closestEl && closestEl.firstChild) {
            element = closestEl.firstChild;
        }
        return (React.createElement(Popup, { ariaLabel: title, target: element, offset: [-5, 0], alignY: "start", alignX: "end", mountTo: mountPoint, boundariesElement: boundariesElement, scrollableElement: scrollableElement, stick: true, forcePlacement: true },
            React.createElement(Wrapper, null,
                React.createElement(ToolbarButton, { title: title, onClick: this.handleClick(state, dispatch, nextBreakoutMode), iconBefore: breakoutMode === BREAKOUT_MODE.FULL_WIDTH ? (React.createElement(CollapseIcon, { label: title })) : (React.createElement(ExpandIcon, { label: title })) }))));
    };
    return LayoutButton;
}(React.Component));
export default injectIntl(LayoutButton);
var templateObject_1;
//# sourceMappingURL=LayoutButton.js.map