import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { Input } from './styles';
var ChromeCollapsed = /** @class */ (function (_super) {
    tslib_1.__extends(ChromeCollapsed, _super);
    function ChromeCollapsed() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.focusHandler = function (evt) {
            /**
             * We need this magic for FireFox.
             * The reason we need it is, when, in FireFox, we have focus inside input,
             * and then we remove that input and move focus to another place programmatically,
             * for whatever reason UP/DOWN arrows don't work until you blur and focus editor manually.
             */
            if (_this.input) {
                _this.input.blur();
            }
            if (_this.props.onFocus) {
                _this.props.onFocus(evt);
            }
        };
        _this.handleInputRef = function (ref) {
            _this.input = ref;
        };
        return _this;
    }
    ChromeCollapsed.prototype.render = function () {
        var placeholder = this.props.text || 'Type something…';
        return (React.createElement(Input, { innerRef: this.handleInputRef, onFocus: this.focusHandler, placeholder: placeholder }));
    };
    return ChromeCollapsed;
}(PureComponent));
export default ChromeCollapsed;
//# sourceMappingURL=index.js.map