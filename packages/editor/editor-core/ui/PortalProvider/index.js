import * as tslib_1 from "tslib";
import * as React from 'react';
import { createPortal, unstable_renderSubtreeIntoContainer, unmountComponentAtNode, } from 'react-dom';
import { EventDispatcher } from '../../event-dispatcher';
var PortalProviderAPI = /** @class */ (function (_super) {
    tslib_1.__extends(PortalProviderAPI, _super);
    function PortalProviderAPI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.portals = new Map();
        _this.setContext = function (context) {
            _this.context = context;
        };
        return _this;
    }
    PortalProviderAPI.prototype.render = function (children, container, hasReactContext) {
        if (hasReactContext === void 0) { hasReactContext = false; }
        this.portals.set(container, { children: children, hasReactContext: hasReactContext });
        unstable_renderSubtreeIntoContainer(this.context, children(), container);
    };
    // TODO: until https://product-fabric.atlassian.net/browse/ED-5013
    // we (unfortunately) need to re-render to pass down any updated context.
    // selectively do this for nodeviews that opt-in via `hasReactContext`
    PortalProviderAPI.prototype.forceUpdate = function () {
        var _this = this;
        this.portals.forEach(function (portal, container) {
            if (!portal.hasReactContext) {
                return;
            }
            unstable_renderSubtreeIntoContainer(_this.context, portal.children(), container);
        });
    };
    PortalProviderAPI.prototype.remove = function (container) {
        this.portals.delete(container);
        unmountComponentAtNode(container);
    };
    return PortalProviderAPI;
}(EventDispatcher));
export { PortalProviderAPI };
var PortalProvider = /** @class */ (function (_super) {
    tslib_1.__extends(PortalProvider, _super);
    function PortalProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.portalProviderAPI = new PortalProviderAPI();
        return _this;
    }
    PortalProvider.prototype.render = function () {
        return this.props.render(this.portalProviderAPI);
    };
    PortalProvider.prototype.componentDidUpdate = function () {
        this.portalProviderAPI.forceUpdate();
    };
    return PortalProvider;
}(React.Component));
export { PortalProvider };
var PortalRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(PortalRenderer, _super);
    function PortalRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.handleUpdate = function (portals) { return _this.setState({ portals: portals }); };
        props.portalProviderAPI.setContext(_this);
        props.portalProviderAPI.on('update', _this.handleUpdate);
        _this.state = { portals: new Map() };
        return _this;
    }
    PortalRenderer.prototype.render = function () {
        var portals = this.state.portals;
        return (React.createElement(React.Fragment, null, Array.from(portals.entries()).map(function (_a) {
            var _b = tslib_1.__read(_a, 2), container = _b[0], children = _b[1];
            return createPortal(children, container);
        })));
    };
    return PortalRenderer;
}(React.Component));
export { PortalRenderer };
//# sourceMappingURL=index.js.map