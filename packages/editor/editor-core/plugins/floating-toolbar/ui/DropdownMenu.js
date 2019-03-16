import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { colors, gridSize } from '@findable/theme';
import Item, { itemThemeNamespace } from '@findable/item';
import EditorDoneIcon from '@findable/icon/glyph/editor/done';
export var menuItemDimensions = {
    width: 175,
    height: 32,
};
var Spacer = styled.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex: 1;\n  padding: 8px;\n"], ["\n  display: flex;\n  flex: 1;\n  padding: 8px;\n"])));
var MenuContainer = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  min-width: ", "px;\n"], ["\n  min-width: ", "px;\n"])), menuItemDimensions.width);
var padding = gridSize();
export var itemSpacing = gridSize() / 2;
var editorItemTheme = {
    borderRadius: 0,
    beforeItemSpacing: {
        compact: itemSpacing,
    },
    padding: {
        compact: {
            bottom: padding,
            left: padding,
            right: padding,
            top: padding,
        },
    },
    height: {
        compact: menuItemDimensions.height,
    },
};
var Dropdown = /** @class */ (function (_super) {
    tslib_1.__extends(Dropdown, _super);
    function Dropdown() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dropdown.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.props, hide = _b.hide, dispatchCommand = _b.dispatchCommand, items = _b.items;
        return (React.createElement(ThemeProvider, { theme: (_a = {}, _a[itemThemeNamespace] = editorItemTheme, _a) },
            React.createElement(MenuContainer, null, items
                .filter(function (item) { return !item.hidden; })
                .map(function (item, idx) { return (React.createElement(Item, { key: idx, isCompact: true, elemBefore: _this.renderSelected(item), onClick: function () {
                    hide();
                    dispatchCommand(item.onClick);
                }, isDisabled: item.disabled }, item.title)); }))));
    };
    Dropdown.prototype.renderSelected = function (item) {
        var selected = item.selected;
        if (selected !== undefined) {
            return selected ? (React.createElement(EditorDoneIcon, { primaryColor: colors.B400, size: "small", label: "test question" })) : (React.createElement(Spacer, null));
        }
        return;
    };
    return Dropdown;
}(Component));
export default Dropdown;
var templateObject_1, templateObject_2;
//# sourceMappingURL=DropdownMenu.js.map