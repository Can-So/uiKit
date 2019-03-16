import * as tslib_1 from "tslib";
import * as React from 'react';
import { Input } from './Input';
var PopupInput = /** @class */ (function (_super) {
    tslib_1.__extends(PopupInput, _super);
    function PopupInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = null;
        _this.handleInnerRef = function (ref) {
            _this.ref = ref;
            if (_this.props.innerRef) {
                _this.props.innerRef(ref);
            }
        };
        return _this;
    }
    PopupInput.prototype.componentDidMount = function () {
        if (this.ref) {
            this.ref.select();
        }
    };
    PopupInput.prototype.render = function () {
        return React.createElement(Input, tslib_1.__assign({}, this.props, { innerRef: this.handleInnerRef }));
    };
    return PopupInput;
}(React.Component));
export { PopupInput };
//# sourceMappingURL=PopupInput.js.map