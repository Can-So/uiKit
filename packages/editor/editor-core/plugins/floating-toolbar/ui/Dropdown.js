import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import ExpandIcon from '@findable/icon/glyph/chevron-down';
import UiDropdown from '../../../ui/Dropdown';
import withOuterListeners from '../../../ui/with-outer-listeners';
import Button from './Button';
import DropdownMenu, { menuItemDimensions, itemSpacing } from './DropdownMenu';
var DropdownWithOutsideListeners = withOuterListeners(UiDropdown);
var DropdownExpandContainer = styled.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  margin-left: -8px;\n"], ["\n  margin-left: -8px;\n"])));
var IconGroup = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
var CompositeIcon = function (_a) {
    var icon = _a.icon;
    return (React.createElement(IconGroup, null,
        icon,
        React.createElement(DropdownExpandContainer, null,
            React.createElement(ExpandIcon, { label: "Expand dropdown menu" }))));
};
var Dropdown = /** @class */ (function (_super) {
    tslib_1.__extends(Dropdown, _super);
    function Dropdown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { isOpen: false };
        _this.renderArrayOptions = function (options) { return (React.createElement(DropdownMenu, { hide: _this.hide, dispatchCommand: _this.props.dispatchCommand, items: options })); };
        _this.toggleOpen = function () {
            _this.setState({ isOpen: !_this.state.isOpen });
        };
        _this.hide = function () {
            _this.setState({ isOpen: false });
        };
        return _this;
    }
    Dropdown.prototype.render = function () {
        var isOpen = this.state.isOpen;
        var _a = this.props, title = _a.title, icon = _a.icon, options = _a.options, dispatchCommand = _a.dispatchCommand, mountPoint = _a.mountPoint, boundariesElement = _a.boundariesElement, scrollableElement = _a.scrollableElement, hideExpandIcon = _a.hideExpandIcon;
        var trigger;
        if (icon) {
            var TriggerIcon = hideExpandIcon ? icon : React.createElement(CompositeIcon, { icon: icon });
            trigger = (React.createElement(Button, { title: title, icon: TriggerIcon, onClick: this.toggleOpen, selected: isOpen }));
        }
        else {
            trigger = (React.createElement(Button, { iconAfter: React.createElement(DropdownExpandContainer, null,
                    React.createElement(ExpandIcon, { label: "Expand dropdown menu" })), onClick: this.toggleOpen, selected: isOpen }, title));
        }
        /**
         * We want to change direction of our dropdowns a bit early,
         * not exactly when it hits the boundary.
         */
        var fitTolerance = 10;
        var fitWidth = Array.isArray(options)
            ? menuItemDimensions.width
            : options.width;
        var fitHeight = Array.isArray(options)
            ? options.length * menuItemDimensions.height + itemSpacing * 2
            : options.height;
        return (React.createElement(DropdownWithOutsideListeners, { mountTo: mountPoint, boundariesElement: boundariesElement, scrollableElement: scrollableElement, isOpen: isOpen, handleClickOutside: this.hide, handleEscapeKeydown: this.hide, fitWidth: fitWidth + fitTolerance, fitHeight: fitHeight + fitTolerance, trigger: trigger }, Array.isArray(options)
            ? this.renderArrayOptions(options)
            : options.render({ hide: this.hide, dispatchCommand: dispatchCommand })));
    };
    return Dropdown;
}(Component));
export default Dropdown;
var templateObject_1, templateObject_2;
//# sourceMappingURL=Dropdown.js.map