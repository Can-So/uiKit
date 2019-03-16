import * as tslib_1 from "tslib";
import { PureComponent } from 'react';
var WithProviders = /** @class */ (function (_super) {
    tslib_1.__extends(WithProviders, _super);
    function WithProviders(props) {
        var _this = _super.call(this, props) || this;
        _this.handleProvider = function (name, provider) {
            _this.setState(function (_a) {
                var providers = _a.providers;
                var _b;
                return {
                    providers: tslib_1.__assign({}, providers, (_b = {}, _b[name] = provider, _b)),
                };
            });
        };
        var providers = {};
        _this.props.providers.forEach(function (name) {
            providers[name] = undefined;
        });
        _this.state = {
            providers: providers,
        };
        return _this;
    }
    WithProviders.prototype.componentWillMount = function () {
        var _this = this;
        var _a = this.props, providers = _a.providers, providerFactory = _a.providerFactory;
        providers.forEach(function (name) {
            providerFactory.subscribe(name, _this.handleProvider);
        });
    };
    WithProviders.prototype.componentWillUnmount = function () {
        var _this = this;
        var _a = this.props, providers = _a.providers, providerFactory = _a.providerFactory;
        providers.forEach(function (name) {
            providerFactory.unsubscribe(name, _this.handleProvider);
        });
    };
    WithProviders.prototype.render = function () {
        var _a = this, state = _a.state, props = _a.props;
        var renderNode = props.renderNode;
        return renderNode(state.providers);
    };
    return WithProviders;
}(PureComponent));
export { WithProviders };
//# sourceMappingURL=withProviders.js.map