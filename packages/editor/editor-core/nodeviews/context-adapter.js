import * as tslib_1 from "tslib";
import * as React from 'react';
import * as PropTypes from 'prop-types';
// injects contexts via old context API to children
// and gives access to the original Provider so that
// the child can re-emit it
export var createContextAdapter = function (createContextAdapter) {
    var _a;
    return _a = /** @class */ (function (_super) {
            tslib_1.__extends(class_1, _super);
            function class_1() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.contextState = {};
                return _this;
            }
            class_1.prototype.getChildContext = function () {
                return { contextAdapter: this.zipProvidersWithValues() };
            };
            class_1.prototype.zipProvidersWithValues = function () {
                var _this = this;
                return Object.keys(createContextAdapter).reduce(function (zipped, name) {
                    zipped[name] = {
                        Provider: createContextAdapter[name].Provider,
                        Consumer: createContextAdapter[name].Consumer,
                        value: _this.contextState[name],
                    };
                    return zipped;
                }, {});
            };
            class_1.prototype.render = function () {
                var _this = this;
                var children = this.props.children;
                // render all the consumers, and react to their value changes independently
                var consumers = Object.keys(createContextAdapter).map(function (name, idx) {
                    var Consumer = createContextAdapter[name].Consumer;
                    return (React.createElement(Consumer, { key: idx }, function (value) {
                        // update local copy of value provided from Consumer
                        if (_this.contextState[name] !== value) {
                            _this.contextState[name] = value;
                            _this.forceUpdate();
                        }
                        return null;
                    }));
                });
                return (React.createElement(React.Fragment, null,
                    consumers,
                    children));
            };
            return class_1;
        }(React.Component)),
        _a.childContextTypes = {
            contextAdapter: PropTypes.object,
        },
        _a;
};
//# sourceMappingURL=context-adapter.js.map