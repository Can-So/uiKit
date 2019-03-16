import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import { ButtonGroup } from '@findable/button';
import { borderRadius, gridSize, colors, themed } from '@findable/theme';
import { compareArrays } from '../utils';
import Button from './Button';
import Dropdown from './Dropdown';
import Select from './Select';
import Separator from './Separator';
import Input from './Input';
var akGridSize = gridSize();
var ToolbarContainer = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  background-color: ", ";\n  border-radius: ", "px;\n  box-shadow: 0 0 1px rgba(9, 30, 66, 0.31),\n    0 4px 8px -2px rgba(9, 30, 66, 0.25);\n  padding: ", "px ", "px;\n  display: flex;\n  line-height: 1;\n  box-sizing: border-box;\n  ", ";\n  & > div {\n    align-items: center;\n  }\n"], ["\n  background-color: ", ";\n  border-radius: ", "px;\n  box-shadow: 0 0 1px rgba(9, 30, 66, 0.31),\n    0 4px 8px -2px rgba(9, 30, 66, 0.25);\n  padding: ", "px ", "px;\n  display: flex;\n  line-height: 1;\n  box-sizing: border-box;\n  ",
    ";\n  & > div {\n    align-items: center;\n  }\n"])), themed({ light: 'white', dark: colors.DN70 }), borderRadius(), akGridSize / 2, akGridSize, function (props) {
    return props.hasCompactLeftPadding ? "padding-left: " + akGridSize / 2 + "px" : '';
});
var Toolbar = /** @class */ (function (_super) {
    tslib_1.__extends(Toolbar, _super);
    function Toolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Toolbar.prototype.render = function () {
        var _a = this.props, items = _a.items, dispatchCommand = _a.dispatchCommand, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, className = _a.className, editorView = _a.editorView;
        if (!items.length) {
            return null;
        }
        // Select has left padding of 4px to the border, everything else 8px
        var firstElementIsSelect = items[0].type === 'select';
        return (React.createElement(ToolbarContainer, { "aria-label": "Floating Toolbar", hasCompactLeftPadding: firstElementIsSelect, className: className },
            React.createElement(ButtonGroup, null, items
                .filter(function (item) { return !item.hidden; })
                .map(function (item, idx) {
                switch (item.type) {
                    case 'button':
                        var ButtonIcon = item.icon;
                        return (React.createElement(Button, { key: idx, title: item.title, href: item.href, icon: React.createElement(ButtonIcon, { label: item.title }), appearance: item.appearance, target: item.target, onClick: function () { return dispatchCommand(item.onClick); }, onMouseEnter: function () { return dispatchCommand(item.onMouseEnter); }, onMouseLeave: function () { return dispatchCommand(item.onMouseLeave); }, selected: item.selected, disabled: item.disabled }));
                    case 'input':
                        return (React.createElement(Input, { key: idx, mountPoint: popupsMountPoint, boundariesElement: popupsBoundariesElement, defaultValue: item.defaultValue, placeholder: item.placeholder, onSubmit: function (value) { return dispatchCommand(item.onSubmit(value)); }, onBlur: function (value) { return dispatchCommand(item.onBlur(value)); } }));
                    case 'custom': {
                        return item.render(editorView, idx);
                    }
                    case 'dropdown':
                        var DropdownIcon = item.icon;
                        return (React.createElement(Dropdown, { key: idx, title: item.title, icon: DropdownIcon && React.createElement(DropdownIcon, { label: item.title }), dispatchCommand: dispatchCommand, options: item.options, hideExpandIcon: item.hideExpandIcon, mountPoint: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement }));
                    case 'select':
                        return (React.createElement(Select, { key: idx, dispatchCommand: dispatchCommand, options: item.options, hideExpandIcon: item.hideExpandIcon, mountPoint: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, defaultValue: item.defaultValue, placeholder: item.placeholder, onChange: function (selected) {
                                return dispatchCommand(item.onChange(selected));
                            } }));
                    case 'separator':
                        return React.createElement(Separator, { key: idx });
                }
            }))));
    };
    Toolbar.prototype.shouldComponentUpdate = function (nextProps) {
        return !compareArrays(this.props.items, nextProps.items);
    };
    return Toolbar;
}(Component));
export default Toolbar;
var templateObject_1;
//# sourceMappingURL=Toolbar.js.map