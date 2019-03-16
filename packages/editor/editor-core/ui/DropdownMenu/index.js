import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import DropList from '@atlaskit/droplist';
import Item, { ItemGroup } from '@atlaskit/item';
import Tooltip from '@atlaskit/tooltip';
import { Popup, akEditorFloatingPanelZIndex } from '@atlaskit/editor-common';
import withOuterListeners from '../with-outer-listeners';
var Wrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  line-height: 0;\n"], ["\n  line-height: 0;\n"])));
var DropListWithOutsideListeners = withOuterListeners(DropList);
/**
 * Hack for item to imitate old dropdown-menu selected styles
 */
var ItemWrapper = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  ", ";\n"], ["\n  ",
    ";\n"])), function (props) {
    return props.isSelected
        ? '&& > span, && > span:hover { background: #6c798f; color: #fff; }'
        : '';
});
var ItemContentWrapper = styled.span(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  ", ";\n"], ["\n  ", ";\n"])), function (props) { return (props.hasElemBefore ? 'margin-left: 8px;' : ''); });
/**
 * Wrapper around @atlaskit/droplist which uses Popup and Portal to render
 * dropdown-menu outside of "overflow: hidden" containers when needed.
 *
 * Also it controls popper's placement.
 */
var DropdownMenuWrapper = /** @class */ (function (_super) {
    tslib_1.__extends(DropdownMenuWrapper, _super);
    function DropdownMenuWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            popupPlacement: ['bottom', 'left'],
        };
        _this.handleRef = function (target) {
            _this.setState({ target: target || undefined });
        };
        _this.updatePopupPlacement = function (placement) {
            _this.setState({ popupPlacement: placement });
        };
        _this.handleClose = function () {
            if (_this.props.onOpenChange) {
                _this.props.onOpenChange({ isOpen: false });
            }
        };
        return _this;
    }
    DropdownMenuWrapper.prototype.renderItem = function (item) {
        var _a = this.props, onItemActivated = _a.onItemActivated, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave;
        // onClick and value.name are the action indicators in the handlers
        // If neither are present, don't wrap in an Item.
        if (!item.onClick && !item.value && !item.value.name) {
            return React.createElement("span", { key: String(item.content) }, item.content);
        }
        var dropListItem = (React.createElement(ItemWrapper, { key: item.key || item.content, isSelected: item.isActive },
            React.createElement(Item, { elemBefore: item.elemBefore, elemAfter: item.elemAfter, isDisabled: item.isDisabled, onClick: function () { return onItemActivated && onItemActivated({ item: item }); }, onMouseEnter: function () { return onMouseEnter && onMouseEnter({ item: item }); }, onMouseLeave: function () { return onMouseLeave && onMouseLeave({ item: item }); }, className: item.className },
                React.createElement(ItemContentWrapper, { hasElemBefore: !!item.elemBefore }, item.content))));
        if (item.tooltipDescription) {
            return (React.createElement(Tooltip, { key: item.content, content: item.tooltipDescription, position: item.tooltipPosition }, dropListItem));
        }
        return dropListItem;
    };
    DropdownMenuWrapper.prototype.renderDropdownMenu = function () {
        var _this = this;
        var _a = this.state, target = _a.target, popupPlacement = _a.popupPlacement;
        var _b = this.props, items = _b.items, mountTo = _b.mountTo, boundariesElement = _b.boundariesElement, scrollableElement = _b.scrollableElement, offset = _b.offset, fitHeight = _b.fitHeight, fitWidth = _b.fitWidth, isOpen = _b.isOpen, zIndex = _b.zIndex;
        return (React.createElement(Popup, { target: isOpen ? target : undefined, mountTo: mountTo, boundariesElement: boundariesElement, scrollableElement: scrollableElement, onPlacementChanged: this.updatePopupPlacement, fitHeight: fitHeight, fitWidth: fitWidth, zIndex: zIndex || akEditorFloatingPanelZIndex, offset: offset },
            React.createElement(DropListWithOutsideListeners, { isOpen: true, appearance: "tall", position: popupPlacement.join(' '), shouldFlip: false, shouldFitContainer: true, isTriggerNotTabbable: true, handleClickOutside: this.handleClose, handleEscapeKeydown: this.handleClose },
                React.createElement("div", { style: { height: 0, minWidth: fitWidth || 0 } }),
                items.map(function (group, index) { return (React.createElement(ItemGroup, { key: index }, group.items.map(function (item) { return _this.renderItem(item); }))); }))));
    };
    DropdownMenuWrapper.prototype.render = function () {
        var _a = this.props, children = _a.children, isOpen = _a.isOpen;
        return (React.createElement(Wrapper, null,
            React.createElement("div", { ref: this.handleRef }, children),
            isOpen ? this.renderDropdownMenu() : null));
    };
    return DropdownMenuWrapper;
}(PureComponent));
export default DropdownMenuWrapper;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map