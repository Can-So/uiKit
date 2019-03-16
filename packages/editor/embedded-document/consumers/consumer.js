import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { Context } from '../context/context';
var Consumer = /** @class */ (function (_super) {
    tslib_1.__extends(Consumer, _super);
    function Consumer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getPropsFromActions = function (actions) {
            var actionsMapper = _this.props.actionsMapper;
            if (actionsMapper) {
                if (!_this.previousActions ||
                    !_this.propsFromActions ||
                    _this.previousActions !== actions) {
                    _this.propsFromActions = actionsMapper(actions);
                }
            }
            _this.previousActions = actions;
            return _this.propsFromActions;
        };
        _this.getPropsFromState = function (state) {
            var stateMapper = _this.props.stateMapper;
            if (stateMapper) {
                return stateMapper(state);
            }
            return undefined;
        };
        _this.getRenderProps = function (renderProps) {
            var renderPropsMapper = _this.props.renderPropsMapper;
            if (renderPropsMapper) {
                return renderPropsMapper(renderProps);
            }
            return undefined;
        };
        _this.renderChildren = function (_a) {
            var actions = _a.actions, value = _a.value, renderProps = _a.renderProps;
            var props = Object.assign({}, _this.getPropsFromState(value), _this.getPropsFromActions(actions), _this.getRenderProps(renderProps));
            return _this.props.children(props);
        };
        return _this;
    }
    Consumer.prototype.render = function () {
        return React.createElement(Context.Consumer, null, this.renderChildren);
    };
    return Consumer;
}(PureComponent));
export { Consumer };
//# sourceMappingURL=consumer.js.map