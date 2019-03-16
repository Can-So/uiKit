import * as tslib_1 from "tslib";
import { DateLozenge } from './DateLozenge';
import * as React from 'react';
import * as format from 'date-fns/format';
var isClickable = function (props) { return !!props.onClick; };
var Date = /** @class */ (function (_super) {
    tslib_1.__extends(Date, _super);
    function Date() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleOnClick = function (event) {
            if (isClickable(_this.props)) {
                _this.props.onClick(_this.props.value, event);
            }
        };
        _this.renderContent = function () {
            if (_this.props.children) {
                if (typeof _this.props.children === 'function') {
                    return _this.props.children(_this.props);
                }
                return _this.props.children;
            }
            return format(_this.props.value, _this.props.format);
        };
        return _this;
    }
    Date.prototype.render = function () {
        return (React.createElement(DateLozenge, { className: this.props.className, onClick: isClickable(this.props) ? this.handleOnClick : undefined, color: this.props.color }, this.renderContent()));
    };
    Date.defaultProps = {
        format: 'DD/MM/YYYY',
        color: 'grey',
    };
    return Date;
}(React.Component));
export { Date };
//# sourceMappingURL=Date.js.map