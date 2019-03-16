import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import EditorFileIcon from '@atlaskit/icon/glyph/editor/file';
import { getExtensionLozengeData } from '@atlaskit/editor-common';
import { PlaceholderFallback, PlaceholderFallbackParams } from './styles';
export var capitalizeFirstLetter = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
export var ICON_SIZE = 24;
var ExtensionLozenge = /** @class */ (function (_super) {
    tslib_1.__extends(ExtensionLozenge, _super);
    function ExtensionLozenge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtensionLozenge.prototype.render = function () {
        var node = this.props.node;
        var imageData = getExtensionLozengeData({ node: node, type: 'image' });
        if (imageData) {
            return this.renderImage(imageData);
        }
        var iconData = getExtensionLozengeData({ node: node, type: 'icon' });
        return this.renderFallback(iconData);
    };
    ExtensionLozenge.prototype.renderImage = function (lozengeData) {
        var extensionKey = this.props.node.attrs.extensionKey;
        var url = lozengeData.url, rest = tslib_1.__rest(lozengeData, ["url"]);
        return React.createElement("img", tslib_1.__assign({ src: url }, rest, { alt: extensionKey }));
    };
    ExtensionLozenge.prototype.renderFallback = function (lozengeData) {
        var _a = this.props.node.attrs, parameters = _a.parameters, extensionKey = _a.extensionKey;
        var params = parameters && parameters.macroParams;
        var title = (parameters && parameters.extensionTitle) || extensionKey;
        return (React.createElement(PlaceholderFallback, null,
            lozengeData ? (this.renderImage(tslib_1.__assign({ height: ICON_SIZE, width: ICON_SIZE }, lozengeData))) : (React.createElement(EditorFileIcon, { label: title })),
            React.createElement("span", { className: "extension-title" }, capitalizeFirstLetter(title)),
            params && (React.createElement(PlaceholderFallbackParams, null, Object.keys(params).map(function (key) { return key && " | " + key + " = " + params[key].value; })))));
    };
    return ExtensionLozenge;
}(Component));
export default ExtensionLozenge;
//# sourceMappingURL=Lozenge.js.map