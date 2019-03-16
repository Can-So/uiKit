import * as tslib_1 from "tslib";
import { PopupSelect } from '@findable/select';
import * as React from 'react';
import { getPopupComponents } from './components';
import { getPopupStyles } from './styles';
import { getPopupProps } from './popup';
import { BaseUserPicker } from './BaseUserPicker';
var PopupUserPicker = /** @class */ (function (_super) {
    tslib_1.__extends(PopupUserPicker, _super);
    function PopupUserPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            flipped: false,
        };
        _this.handleFlipStyle = function (data) {
            var flipped = data.flipped, transform = data.styles.transform, height = data.popper.height;
            _this.setState({ flipped: flipped });
            if (!flipped) {
                return data;
            }
            data.styles.transform =
                transform + ("translate(0, " + height + "px) translate(0, -100%)");
            return data;
        };
        return _this;
    }
    PopupUserPicker.prototype.render = function () {
        var _a = this.props, target = _a.target, popupTitle = _a.popupTitle;
        var flipped = this.state.flipped;
        var width = this.props.width;
        var styles = getPopupStyles(width, flipped);
        return (React.createElement(BaseUserPicker, tslib_1.__assign({}, this.props, { SelectComponent: PopupSelect, width: width, styles: styles, components: getPopupComponents(!!popupTitle), pickerProps: getPopupProps(width, target, this.handleFlipStyle, popupTitle) })));
    };
    PopupUserPicker.defaultProps = {
        width: 300,
    };
    return PopupUserPicker;
}(React.Component));
export { PopupUserPicker };
//# sourceMappingURL=PopupUserPicker.js.map