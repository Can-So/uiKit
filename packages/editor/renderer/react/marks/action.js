import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
var Action = /** @class */ (function (_super) {
    tslib_1.__extends(Action, _super);
    function Action() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function () {
            if (_this.props.eventHandlers &&
                _this.props.eventHandlers.action &&
                _this.props.eventHandlers.action.onClick) {
                _this.props.eventHandlers.action.onClick({
                    key: _this.props.markKey,
                    target: _this.props.target,
                    parameters: _this.props.parameters,
                });
            }
        };
        return _this;
    }
    Action.prototype.render = function () {
        return (React.createElement("span", { className: "akActionMark", onClick: this.onClick }, this.props.children));
    };
    return Action;
}(PureComponent));
export default Action;
//# sourceMappingURL=action.js.map