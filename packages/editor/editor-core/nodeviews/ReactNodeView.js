import * as tslib_1 from "tslib";
import * as React from 'react';
var ReactNodeView = /** @class */ (function () {
    function ReactNodeView(node, view, getPos, portalProviderAPI, reactComponentProps, reactComponent, hasContext) {
        if (reactComponentProps === void 0) { reactComponentProps = {}; }
        if (hasContext === void 0) { hasContext = false; }
        var _this = this;
        this.reactComponentProps = {};
        this.handleRef = function (node) { return _this._handleRef(node); };
        this.node = node;
        this.view = view;
        this.getPos = getPos;
        this.portalProviderAPI = portalProviderAPI;
        this.reactComponentProps = reactComponentProps;
        this.reactComponent = reactComponent;
        this.hasContext = hasContext;
    }
    /**
     * This method exists to move initialization logic out of the constructor,
     * so object can be initialized properly before calling render first time.
     *
     * Example:
     * Instance properties get added to an object only after super call in
     * constructor, which leads to some methods being undefined during the
     * first render.
     */
    ReactNodeView.prototype.init = function () {
        var _this = this;
        this.domRef = this.createDomRef();
        this.setDomAttrs(this.node, this.domRef);
        var _a = this.getContentDOM() || {
            dom: undefined,
            contentDOM: undefined,
        }, contentDOMWrapper = _a.dom, contentDOM = _a.contentDOM;
        if (this.domRef && contentDOMWrapper) {
            this.domRef.appendChild(contentDOMWrapper);
            this.contentDOM = contentDOM ? contentDOM : contentDOMWrapper;
            this.contentDOMWrapper = contentDOMWrapper || contentDOM;
        }
        // @see ED-3790
        // something gets messed up during mutation processing inside of a
        // nodeView if DOM structure has nested plain "div"s, it doesn't see the
        // difference between them and it kills the nodeView
        this.domRef.className = this.node.type.name + "View-content-wrap";
        this.renderReactComponent(function () {
            return _this.render(_this.reactComponentProps, _this.handleRef);
        });
        return this;
    };
    ReactNodeView.prototype.renderReactComponent = function (component) {
        if (!this.domRef || !component) {
            return;
        }
        this.portalProviderAPI.render(component, this.domRef, this.hasContext);
    };
    ReactNodeView.prototype.createDomRef = function () {
        return this.node.isInline
            ? document.createElement('span')
            : document.createElement('div');
    };
    ReactNodeView.prototype.getContentDOM = function () {
        return undefined;
    };
    ReactNodeView.prototype._handleRef = function (node) {
        var contentDOM = this.contentDOMWrapper || this.contentDOM;
        // move the contentDOM node inside the inner reference after rendering
        if (node && contentDOM && !node.contains(contentDOM)) {
            node.appendChild(contentDOM);
        }
    };
    ReactNodeView.prototype.render = function (props, forwardRef) {
        return this.reactComponent ? (React.createElement(this.reactComponent, tslib_1.__assign({ view: this.view, getPos: this.getPos, node: this.node, forwardRef: forwardRef }, props))) : null;
    };
    ReactNodeView.prototype.update = function (node, decorations, validUpdate) {
        var _this = this;
        if (validUpdate === void 0) { validUpdate = function () { return true; }; }
        // @see https://github.com/ProseMirror/prosemirror/issues/648
        var isValidUpdate = this.node.type === node.type && validUpdate(this.node, node);
        if (!isValidUpdate) {
            return false;
        }
        if (this.domRef && !this.node.sameMarkup(node)) {
            this.setDomAttrs(node, this.domRef);
        }
        this.node = node;
        this.renderReactComponent(function () {
            return _this.render(_this.reactComponentProps, _this.handleRef);
        });
        return true;
    };
    /**
     * Copies the attributes from a ProseMirror Node to a DOM node.
     * @param node The Prosemirror Node from which to source the attributes
     */
    ReactNodeView.prototype.setDomAttrs = function (node, element) {
        Object.keys(node.attrs || {}).forEach(function (attr) {
            element.setAttribute(attr, node.attrs[attr]);
        });
    };
    Object.defineProperty(ReactNodeView.prototype, "dom", {
        get: function () {
            return this.domRef;
        },
        enumerable: true,
        configurable: true
    });
    ReactNodeView.prototype.destroy = function () {
        if (!this.domRef) {
            return;
        }
        this.portalProviderAPI.remove(this.domRef);
        this.domRef = undefined;
        this.contentDOM = undefined;
    };
    ReactNodeView.fromComponent = function (component, portalProviderAPI, props) {
        return function (node, view, getPos) {
            return new ReactNodeView(node, view, getPos, portalProviderAPI, props, component).init();
        };
    };
    return ReactNodeView;
}());
export default ReactNodeView;
//# sourceMappingURL=ReactNodeView.js.map