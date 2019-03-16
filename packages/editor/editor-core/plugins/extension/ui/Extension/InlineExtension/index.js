import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { Overlay } from '../styles';
import ExtensionLozenge from '../Lozenge';
import { Wrapper } from './styles';
var InlineExtension = /** @class */ (function (_super) {
    tslib_1.__extends(InlineExtension, _super);
    function InlineExtension() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InlineExtension.prototype.render = function () {
        var _a = this.props, node = _a.node, children = _a.children;
        var hasChildren = !!children;
        var className = hasChildren
            ? 'with-overlay with-children'
            : 'with-overlay';
        return (React.createElement(Wrapper, { className: "extension-container " + className },
            React.createElement(Overlay, { className: "extension-overlay" }),
            children ? children : React.createElement(ExtensionLozenge, { node: node })));
    };
    return InlineExtension;
}(Component));
export default InlineExtension;
//# sourceMappingURL=index.js.map