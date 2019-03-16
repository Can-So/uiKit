import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { ProviderFactory, WithProviders, } from '@atlaskit/editor-common';
import ExtensionComponent from './ExtensionComponent';
var Extension = /** @class */ (function (_super) {
    tslib_1.__extends(Extension, _super);
    function Extension(props) {
        var _this = _super.call(this, props) || this;
        _this.renderWithProvider = function (providers) {
            var _a = _this.props, node = _a.node, editorView = _a.editorView, handleContentDOMRef = _a.handleContentDOMRef, extensionHandlers = _a.extensionHandlers;
            var macroProvider = providers.macroProvider;
            return (React.createElement(ExtensionComponent, { editorView: editorView, node: node, macroProvider: macroProvider, handleContentDOMRef: handleContentDOMRef, extensionHandlers: extensionHandlers }));
        };
        _this.providerFactory = props.providerFactory || new ProviderFactory();
        return _this;
    }
    Extension.prototype.componentWillUnmount = function () {
        if (!this.props.providerFactory) {
            // new ProviderFactory is created if no `providers` has been set
            // in this case when component is unmounted it's safe to destroy this providerFactory
            this.providerFactory.destroy();
        }
    };
    Extension.prototype.render = function () {
        return (React.createElement(WithProviders, { providers: ['macroProvider'], providerFactory: this.providerFactory, renderNode: this.renderWithProvider }));
    };
    return Extension;
}(Component));
export default Extension;
//# sourceMappingURL=index.js.map