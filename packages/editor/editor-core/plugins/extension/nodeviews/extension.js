import * as tslib_1 from "tslib";
import * as React from 'react';
import { ReactNodeView } from '../../../nodeviews';
import Extension from '../ui/Extension';
var ExtensionNode = /** @class */ (function (_super) {
    tslib_1.__extends(ExtensionNode, _super);
    function ExtensionNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtensionNode.prototype.ignoreMutation = function (mutation) {
        // Extensions can perform async operations that will change the DOM.
        // To avoid having their tree rebuilt, we need to ignore the mutation
        // if its not a layout, we need to give children a chance to recalc
        return mutation.attributeName !== 'data-layout';
    };
    ExtensionNode.prototype.getContentDOM = function () {
        if (this.node.isInline) {
            return;
        }
        var dom = document.createElement('div');
        dom.className = this.node.type.name + "-content-dom-wrapper";
        return { dom: dom };
    };
    ExtensionNode.prototype.render = function (props, forwardRef) {
        return (React.createElement(Extension, { editorView: this.view, node: this.node, providerFactory: props.providerFactory, handleContentDOMRef: forwardRef, extensionHandlers: props.extensionHandlers }));
    };
    return ExtensionNode;
}(ReactNodeView));
export default function ExtensionNodeView(portalProviderAPI, providerFactory, extensionHandlers) {
    return function (node, view, getPos) {
        return new ExtensionNode(node, view, getPos, portalProviderAPI, {
            providerFactory: providerFactory,
            extensionHandlers: extensionHandlers,
        }).init();
    };
}
//# sourceMappingURL=extension.js.map