var _a;
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import Item, { ItemGroup, itemThemeNamespace } from '@findable/item';
import { colors, themed } from '@findable/theme';
var itemTheme = (_a = {},
    _a[itemThemeNamespace] = {
        padding: {
            default: {
                bottom: 12,
                left: 12,
                right: 12,
                top: 12,
            },
        },
        beforeItemSpacing: {
            default: function () { return 12; },
        },
        borderRadius: function () { return 0; },
        hover: {
            background: colors.transparent,
            text: colors.text,
            secondaryText: colors.N200,
        },
        selected: {
            background: themed({ light: colors.N20, dark: colors.DN70 }),
            text: themed({ light: colors.N800, dark: colors.DN600 }),
            secondaryText: themed({ light: colors.N200, dark: colors.DN300 }),
        },
    },
    _a);
export function scrollIntoViewIfNeeded(element) {
    var offsetTop = element.offsetTop, offsetHeight = element.offsetHeight, offsetParent = element.offsetParent;
    var _a = offsetParent, offsetParentHeight = _a.offsetHeight, scrollTop = _a.scrollTop;
    var direction = offsetTop + offsetHeight > offsetParentHeight + scrollTop
        ? 1
        : scrollTop > offsetTop
            ? -1
            : 0;
    if (direction !== 0 && offsetParent) {
        offsetParent.scrollTop =
            direction === 1
                ? offsetTop + offsetHeight - offsetParentHeight
                : offsetTop;
    }
}
export function TypeAheadItemsList(_a) {
    var items = _a.items, currentIndex = _a.currentIndex, insertByIndex = _a.insertByIndex, setCurrentIndex = _a.setCurrentIndex;
    if (!Array.isArray(items)) {
        return null;
    }
    return (React.createElement(ThemeProvider, { theme: itemTheme },
        React.createElement(ItemGroup, null, items.map(function (item, index) {
            return item.render ? (React.createElement("div", { key: item.title, ref: index === currentIndex
                    ? function (ref) { return ref && scrollIntoViewIfNeeded(ref); }
                    : function () { return null; } }, item.render({
                onClick: function () { return insertByIndex(index); },
                onMouseMove: function () { return setCurrentIndex(index); },
                isSelected: index === currentIndex,
            }))) : (React.createElement(Item, { key: item.title, onClick: function () { return insertByIndex(index); }, onMouseMove: function () { return setCurrentIndex(index); }, elemBefore: item.icon ? item.icon() : null, isSelected: index === currentIndex, "aria-describedby": item.title, ref: index === currentIndex
                    ? function (ref) {
                        return ref && scrollIntoViewIfNeeded(ref.ref);
                    }
                    : null }, item.title));
        }))));
}
//# sourceMappingURL=TypeAheadItemsList.js.map