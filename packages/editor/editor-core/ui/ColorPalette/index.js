import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import Color from './Color';
import { ColorPaletteWrapper } from './styles';
var ColorPalette = /** @class */ (function (_super) {
    tslib_1.__extends(ColorPalette, _super);
    function ColorPalette() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorPalette.prototype.render = function () {
        var _a = this.props, palette = _a.palette, _b = _a.cols, cols = _b === void 0 ? 7 : _b, onClick = _a.onClick, selectedColor = _a.selectedColor, borderColors = _a.borderColors, className = _a.className, checkMarkColor = _a.checkMarkColor;
        var colors = Array.from(palette.entries());
        return (React.createElement(ColorPaletteWrapper, { className: className, style: { maxWidth: cols * 32 } }, colors.map(function (_a) {
            var _b = tslib_1.__read(_a, 2), color = _b[0], label = _b[1];
            return (React.createElement(Color, { key: color, value: color, borderColor: borderColors[label.toLowerCase() || 'transparent'], label: label, onClick: onClick, isSelected: color === selectedColor, checkMarkColor: checkMarkColor }));
        })));
    };
    return ColorPalette;
}(PureComponent));
export default ColorPalette;
//# sourceMappingURL=index.js.map