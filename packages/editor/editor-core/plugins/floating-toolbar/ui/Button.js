import * as tslib_1 from "tslib";
import * as React from 'react';
import Tooltip from '@atlaskit/tooltip';
import UiButton, { themeNamespace } from '@atlaskit/button';
import { colors, themed } from '@atlaskit/theme';
import styled, { ThemeProvider } from 'styled-components';
import { hexToRgba } from '@atlaskit/editor-common';
var editorButtonTheme = {
    danger: {
        background: {
            default: themed({ light: 'inherit', dark: 'inherit' }),
            hover: themed({ light: colors.N30A, dark: colors.N30A }),
            active: themed({
                light: hexToRgba(colors.B75, 0.6),
                dark: hexToRgba(colors.B75, 0.6),
            }),
        },
        color: {
            hover: themed({ light: colors.R300, dark: colors.R300 }),
            active: themed({ light: colors.R300, dark: colors.R300 }),
        },
    },
};
var Button = styled(UiButton)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  padding: 0 2px;\n\n  &[href] {\n    padding: 0 2px;\n  }\n"], ["\n  padding: 0 2px;\n\n  &[href] {\n    padding: 0 2px;\n  }\n"])));
export default (function (_a) {
    var title = _a.title, icon = _a.icon, iconAfter = _a.iconAfter, onClick = _a.onClick, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave, selected = _a.selected, disabled = _a.disabled, href = _a.href, target = _a.target, _b = _a.appearance, appearance = _b === void 0 ? 'subtle' : _b, children = _a.children;
    var _c;
    return (React.createElement(Tooltip, { content: title, hideTooltipOnClick: true, position: "top" },
        React.createElement(ThemeProvider, { theme: (_c = {}, _c[themeNamespace] = editorButtonTheme, _c) },
            React.createElement("div", { onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
                React.createElement(Button, { ariaLabel: title, spacing: "compact", href: href, target: target, appearance: appearance, ariaHaspopup: true, iconBefore: icon, iconAfter: iconAfter, onClick: onClick, isSelected: selected, isDisabled: disabled }, children)))));
});
var templateObject_1;
//# sourceMappingURL=Button.js.map