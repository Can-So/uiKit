import * as tslib_1 from "tslib";
import * as React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import ExpandIcon from '@findable/icon/glyph/chevron-down';
import TextColorIcon from '@findable/icon/glyph/editor/text-color';
import { akEditorMenuZIndex } from '@findable/editor-common';
import { withAnalytics } from '../../../../analytics';
import ToolbarButton from '../../../../ui/ToolbarButton';
import ColorPalette from '../../../../ui/ColorPalette';
import Dropdown from '../../../../ui/Dropdown';
import { TriggerWrapper, Separator, Wrapper, ExpandIconWrapper, } from './styles';
import * as commands from '../../commands/change-color';
export var messages = defineMessages({
    textColor: {
        id: 'fabric.editor.textColor',
        defaultMessage: 'Text color',
        description: '',
    },
});
var ToolbarTextColor = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarTextColor, _super);
    function ToolbarTextColor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false,
        };
        _this.changeColor = function (color) {
            return commands.changeColor(color)(_this.props.editorView.state, _this.props.editorView.dispatch);
        };
        _this.changeTextColor = withAnalytics('atlassian.editor.format.textcolor.button', function (color, disabled) {
            if (!disabled) {
                _this.toggleOpen();
                return _this.changeColor(color);
            }
            return false;
        });
        _this.toggleOpen = function () {
            _this.handleOpenChange({ isOpen: !_this.state.isOpen });
        };
        _this.handleOpenChange = function (_a) {
            var isOpen = _a.isOpen;
            _this.setState({ isOpen: isOpen });
        };
        _this.getIconColor = function (color, defaultColor) {
            var isOpen = _this.state.isOpen;
            var isDefaultColor = defaultColor === color;
            return isOpen || isDefaultColor ? undefined : color;
        };
        return _this;
    }
    ToolbarTextColor.prototype.render = function () {
        var _this = this;
        var isOpen = this.state.isOpen;
        var _a = this.props, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, isReducedSpacing = _a.isReducedSpacing, pluginState = _a.pluginState, formatMessage = _a.intl.formatMessage;
        var labelTextColor = formatMessage(messages.textColor);
        return (React.createElement(Wrapper, null,
            React.createElement(Dropdown, { mountTo: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, isOpen: isOpen && !pluginState.disabled, onOpenChange: this.handleOpenChange, fitWidth: 242, fitHeight: 80, zIndex: akEditorMenuZIndex, trigger: React.createElement(ToolbarButton, { spacing: isReducedSpacing ? 'none' : 'default', disabled: pluginState.disabled, selected: isOpen, title: labelTextColor, onClick: this.toggleOpen, iconBefore: React.createElement(TriggerWrapper, null,
                        React.createElement(TextColorIcon, { primaryColor: this.getIconColor(pluginState.color, pluginState.defaultColor) || undefined, label: labelTextColor }),
                        React.createElement(ExpandIconWrapper, null,
                            React.createElement(ExpandIcon, { label: labelTextColor }))) }) },
                React.createElement(ColorPalette, { palette: pluginState.palette, onClick: function (color) { return _this.changeTextColor(color, pluginState.disabled); }, selectedColor: pluginState.color, borderColors: pluginState.borderColorPalette })),
            React.createElement(Separator, null)));
    };
    return ToolbarTextColor;
}(React.Component));
export default injectIntl(ToolbarTextColor);
//# sourceMappingURL=index.js.map