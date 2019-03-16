import * as tslib_1 from "tslib";
import { colors, gridSize } from '@findable/theme';
import * as React from 'react';
import styled from 'styled-components';
import Color from './color';
// color value, label, background, borderColor
var palette = [
    ['neutral', colors.N40, colors.N400],
    ['purple', colors.P50, colors.P400],
    ['blue', colors.B50, colors.B400],
    ['red', colors.R50, colors.R400],
    ['yellow', colors.Y75, colors.Y400],
    ['green', colors.G50, colors.G400],
];
var ColorPaletteWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  margin: ", "px ", "px 0 ", "px;\n  /* Firefox bug fix: https://product-fabric.atlassian.net/browse/ED-1789 */\n  display: flex;\n  flex-wrap: wrap;\n"], ["\n  margin: ", "px ", "px 0 ", "px;\n  /* Firefox bug fix: https://product-fabric.atlassian.net/browse/ED-1789 */\n  display: flex;\n  flex-wrap: wrap;\n"])), gridSize(), gridSize(), gridSize());
export default (function (_a) {
    var _b = _a.cols, cols = _b === void 0 ? 7 : _b, onClick = _a.onClick, selectedColor = _a.selectedColor, className = _a.className, onHover = _a.onHover;
    return (React.createElement(ColorPaletteWrapper, { className: className, style: { maxWidth: cols * 32 } }, palette.map(function (_a) {
        var _b = tslib_1.__read(_a, 3), colorValue = _b[0], backgroundColor = _b[1], borderColor = _b[2];
        return (React.createElement(Color, { key: colorValue, value: colorValue, backgroundColor: backgroundColor, borderColor: borderColor, onClick: onClick, onHover: onHover, isSelected: colorValue === selectedColor }));
    })));
});
var templateObject_1;
//# sourceMappingURL=color-palette.js.map