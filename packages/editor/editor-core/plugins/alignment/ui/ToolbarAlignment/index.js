import * as tslib_1 from "tslib";
import * as React from 'react';
import { defineMessages } from 'react-intl';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import ToolbarButton from '../../../../ui/ToolbarButton';
import Dropdown from '../../../../ui/Dropdown';
import EditorAlignLeftIcon from '@atlaskit/icon/glyph/editor/align-left';
import EditorAlignCenterIcon from '@atlaskit/icon/glyph/editor/align-center';
import EditorAlignRightIcon from '@atlaskit/icon/glyph/editor/align-right';
export var iconMap = {
    start: React.createElement(EditorAlignLeftIcon, { label: "Align left" }),
    end: React.createElement(EditorAlignRightIcon, { label: "Align right" }),
    center: React.createElement(EditorAlignCenterIcon, { label: "Align center" }),
};
import { TriggerWrapper, Separator, Wrapper, ExpandIconWrapper, } from './styles';
import Alignment from '../../../../ui/Alignment';
export var messages = defineMessages({
    alignment: {
        id: 'fabric.editor.alignment',
        defaultMessage: 'Alignment',
        description: 'Aligns text',
    },
});
var AlignmentToolbar = /** @class */ (function (_super) {
    tslib_1.__extends(AlignmentToolbar, _super);
    function AlignmentToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false,
        };
        _this.changeAlignment = function (align) {
            _this.toggleOpen();
            return _this.props.changeAlignment(align);
        };
        _this.toggleOpen = function () {
            _this.handleOpenChange({ isOpen: !_this.state.isOpen });
        };
        _this.handleOpenChange = function (_a) {
            var isOpen = _a.isOpen;
            _this.setState({ isOpen: isOpen });
        };
        return _this;
    }
    AlignmentToolbar.prototype.render = function () {
        var _this = this;
        var isOpen = this.state.isOpen;
        var _a = this.props, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, isReducedSpacing = _a.isReducedSpacing, pluginState = _a.pluginState, disabled = _a.disabled;
        return (React.createElement(Wrapper, null,
            React.createElement(Dropdown, { mountTo: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, isOpen: this.state.isOpen, onOpenChange: this.handleOpenChange, fitWidth: 242, fitHeight: 80, trigger: React.createElement(ToolbarButton, { spacing: isReducedSpacing ? 'none' : 'default', disabled: disabled, selected: isOpen, title: "Text alignment", ariaLabel: "Text alignment", className: "align-btn", onClick: this.toggleOpen, iconBefore: React.createElement(TriggerWrapper, null,
                        iconMap[pluginState.align],
                        React.createElement(ExpandIconWrapper, null,
                            React.createElement(ExpandIcon, { label: 'Alignment' }))) }) },
                React.createElement(Alignment, { onClick: function (align) { return _this.changeAlignment(align); }, selectedAlignment: pluginState.align })),
            React.createElement(Separator, null)));
    };
    return AlignmentToolbar;
}(React.Component));
export default AlignmentToolbar;
//# sourceMappingURL=index.js.map