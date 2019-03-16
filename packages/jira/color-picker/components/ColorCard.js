import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import EditorDoneIcon from '@findable/icon/glyph/editor/done';
import { colors } from '@findable/theme';
import { ColorCardOption, ColorCardContent } from '../styled/ColorCard';
var ColorCard = /** @class */ (function (_super) {
    tslib_1.__extends(ColorCard, _super);
    function ColorCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onMouseDown = function (event) {
            event.preventDefault();
        };
        _this.onClick = function (event) {
            var _a = _this.props, onClick = _a.onClick, value = _a.value;
            if (onClick) {
                event.preventDefault();
                onClick(value);
            }
        };
        _this.ref = React.createRef();
        return _this;
    }
    ColorCard.prototype.render = function () {
        var _a = this.props, value = _a.value, label = _a.label, selected = _a.selected, focused = _a.focused, _b = _a.checkMarkColor, checkMarkColor = _b === void 0 ? colors.N0 : _b;
        return (React.createElement(ColorCardOption, { onClick: this.onClick, onMouseDown: this.onMouseDown, focused: focused, "aria-label": "" + label + (selected ? ' selected' : '') },
            React.createElement(ColorCardContent, { color: value || 'transparent' }, selected && (React.createElement(EditorDoneIcon, { primaryColor: checkMarkColor, label: "" })))));
    };
    return ColorCard;
}(PureComponent));
export default ColorCard;
//# sourceMappingURL=ColorCard.js.map