import * as tslib_1 from "tslib";
import * as React from 'react';
var ReactionConsumer = /** @class */ (function (_super) {
    tslib_1.__extends(ReactionConsumer, _super);
    function ReactionConsumer(props) {
        var _this = _super.call(this, props) || this;
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
        _this.handleOnChange = function () {
            _this.forceUpdate();
        };
        _this.state = {};
        return _this;
    }
    ReactionConsumer.prototype.componentDidMount = function () {
        var _this = this;
        Promise.resolve(this.props.store).then(function (store) {
            _this.setState({ store: store });
            store.onChange(_this.handleOnChange);
        });
    };
    ReactionConsumer.prototype.componentWillUnmount = function () {
        if (this.state.store) {
            this.state.store.removeOnChangeListener(this.handleOnChange);
        }
    };
    ReactionConsumer.prototype.render = function () {
        if (!this.state.store) {
            return null;
        }
        return this.props.children(Object.assign({}, this.getPropsFromState(this.state.store.getState()), this.getPropsFromActions(this.state.store)));
    };
    return ReactionConsumer;
}(React.PureComponent));
export { ReactionConsumer };
//# sourceMappingURL=ReactionConsumer.js.map