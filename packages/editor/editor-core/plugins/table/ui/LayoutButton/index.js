import * as tslib_1 from "tslib";
import * as React from 'react';
import { injectIntl } from 'react-intl';
import * as classnames from 'classnames';
import { findTable } from 'prosemirror-utils';
import { Popup, tableMarginTop } from '@atlaskit/editor-common';
import ExpandIcon from '@atlaskit/icon/glyph/editor/expand';
import CollapseIcon from '@atlaskit/icon/glyph/editor/collapse';
import commonMessages from '../../../../messages';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { TableCssClassName as ClassName } from '../../types';
import { toggleTableLayout } from '../../actions';
import { layoutButtonSize } from '../styles';
var POPUP_OFFSET = [
    -layoutButtonSize - 5,
    -layoutButtonSize - tableMarginTop + 2,
];
var getTitle = function (layout) {
    switch (layout) {
        case 'default':
            return commonMessages.layoutWide;
        case 'wide':
            return commonMessages.layoutFullWidth;
        default:
            return commonMessages.layoutFixedWidth;
    }
};
var LayoutButton = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutButton, _super);
    function LayoutButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            toggleTableLayout(state, dispatch);
        };
        return _this;
    }
    LayoutButton.prototype.render = function () {
        var _a;
        var _b = this.props, formatMessage = _b.intl.formatMessage, mountPoint = _b.mountPoint, boundariesElement = _b.boundariesElement, scrollableElement = _b.scrollableElement, targetRef = _b.targetRef, editorView = _b.editorView, isResizing = _b.isResizing;
        if (!targetRef) {
            return null;
        }
        var table = findTable(editorView.state.selection);
        if (!table) {
            return false;
        }
        var layout = table.node.attrs.layout;
        var title = formatMessage(getTitle(layout));
        return (React.createElement(Popup, { ariaLabel: title, offset: POPUP_OFFSET, target: targetRef, alignY: "top", alignX: "right", stick: true, mountTo: mountPoint, boundariesElement: boundariesElement, scrollableElement: scrollableElement, forcePlacement: true },
            React.createElement("div", { className: classnames(ClassName.LAYOUT_BUTTON, (_a = {},
                    _a[ClassName.IS_RESIZING] = isResizing,
                    _a)) },
                React.createElement(ToolbarButton, { title: title, onClick: this.handleClick, iconBefore: layout === 'full-width' ? (React.createElement(CollapseIcon, { label: title })) : (React.createElement(ExpandIcon, { label: title })) }))));
    };
    return LayoutButton;
}(React.Component));
export default injectIntl(LayoutButton);
//# sourceMappingURL=index.js.map