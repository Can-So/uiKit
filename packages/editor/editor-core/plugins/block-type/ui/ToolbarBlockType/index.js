import * as tslib_1 from "tslib";
import * as React from 'react';
import { createElement } from 'react';
import { defineMessages, injectIntl, FormattedMessage, } from 'react-intl';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import TextStyleIcon from '@atlaskit/icon/glyph/editor/text-style';
import { akEditorMenuZIndex } from '@atlaskit/editor-common';
import { analyticsService as analytics } from '../../../../analytics';
import ToolbarButton from '../../../../ui/ToolbarButton';
import DropdownMenu from '../../../../ui/DropdownMenu';
import { ButtonContent, Separator, Wrapper, MenuWrapper, ExpandIconWrapper, } from '../../../../ui/styles';
import { NORMAL_TEXT } from '../../types';
import { BlockTypeMenuItem } from './styled';
export var messages = defineMessages({
    textStyles: {
        id: 'fabric.editor.textStyles',
        defaultMessage: 'Text styles',
        description: 'Menu provides access to various heading styles or normal text',
    },
});
var ToolbarBlockType = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarBlockType, _super);
    function ToolbarBlockType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            active: false,
        };
        _this.onOpenChange = function (attrs) {
            _this.setState({ active: attrs.isOpen });
        };
        _this.handleTriggerClick = function () {
            _this.onOpenChange({ isOpen: !_this.state.active });
        };
        _this.createItems = function () {
            var formatMessage = _this.props.intl.formatMessage;
            var _a = _this.props.pluginState, currentBlockType = _a.currentBlockType, availableBlockTypes = _a.availableBlockTypes;
            var items = availableBlockTypes.reduce(function (acc, blockType, blockTypeNo) {
                var isActive = currentBlockType === blockType;
                var tagName = blockType.tagName || 'p';
                acc.push({
                    content: (React.createElement(BlockTypeMenuItem, { tagName: tagName, selected: isActive }, createElement(tagName, {}, formatMessage(blockType.title)))),
                    value: blockType,
                    key: blockType + "-" + blockTypeNo,
                    // ED-2853, hiding tooltips as shortcuts are not working atm.
                    // tooltipDescription: tooltip(findKeymapByDescription(blockType.title)),
                    // tooltipPosition: 'right',
                    isActive: isActive,
                });
                return acc;
            }, []);
            return [{ items: items }];
        };
        _this.handleSelectBlockType = function (_a) {
            var item = _a.item;
            var blockType = item.value;
            _this.props.setBlockType(blockType.name);
            _this.setState({ active: false });
            analytics.trackEvent("atlassian.editor.format." + blockType.name + ".button");
        };
        return _this;
    }
    ToolbarBlockType.prototype.render = function () {
        var _this = this;
        var active = this.state.active;
        var _a = this.props, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, isSmall = _a.isSmall, isReducedSpacing = _a.isReducedSpacing, _b = _a.pluginState, currentBlockType = _b.currentBlockType, blockTypesDisabled = _b.blockTypesDisabled, availableBlockTypes = _b.availableBlockTypes, formatMessage = _a.intl.formatMessage;
        var isHeadingDisabled = !availableBlockTypes.some(function (blockType) { return blockType.nodeName === 'heading'; });
        if (isHeadingDisabled) {
            return null;
        }
        var blockTypeTitles = availableBlockTypes
            .filter(function (blockType) { return blockType.name === currentBlockType.name; })
            .map(function (blockType) { return blockType.title; });
        var longestDropdownMenuItem = tslib_1.__spread([
            NORMAL_TEXT
        ], availableBlockTypes).reduce(function (longest, item) {
            var itemTitle = formatMessage(item.title);
            return itemTitle.length >= longest.length ? itemTitle : longest;
        }, '');
        var toolbarButtonFactory = function (disabled) {
            var labelTextStyles = formatMessage(messages.textStyles);
            return (React.createElement(ToolbarButton, { spacing: isReducedSpacing ? 'none' : 'default', selected: active, className: "block-type-btn", disabled: disabled, onClick: _this.handleTriggerClick, title: labelTextStyles, ariaLabel: "Font style", iconAfter: React.createElement(Wrapper, { isSmall: isSmall },
                    isSmall && React.createElement(TextStyleIcon, { label: labelTextStyles }),
                    React.createElement(ExpandIconWrapper, null,
                        React.createElement(ExpandIcon, { label: labelTextStyles }))) }, !isSmall && (React.createElement(ButtonContent, null,
                React.createElement(FormattedMessage, tslib_1.__assign({}, blockTypeTitles[0] || NORMAL_TEXT.title)),
                React.createElement("div", { style: { overflow: 'hidden', height: 0 } }, longestDropdownMenuItem)))));
        };
        if (!this.props.isDisabled && !blockTypesDisabled) {
            var items = this.createItems();
            return (React.createElement(MenuWrapper, null,
                React.createElement(DropdownMenu, { items: items, onOpenChange: this.onOpenChange, onItemActivated: this.handleSelectBlockType, isOpen: active, mountTo: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, zIndex: akEditorMenuZIndex, fitHeight: 360, fitWidth: 106 }, toolbarButtonFactory(false)),
                React.createElement(Separator, null)));
        }
        return (React.createElement(Wrapper, null,
            toolbarButtonFactory(true),
            React.createElement(Separator, null)));
    };
    return ToolbarBlockType;
}(React.PureComponent));
export default injectIntl(ToolbarBlockType);
//# sourceMappingURL=index.js.map