import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
var FadeOut = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  position: relative;\n  overflow-y: hidden;\n  max-height: ", "px;\n  &::after {\n    content: '';\n    position: absolute;\n    top: ", "px;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    /* Using 'rgba(255, 255, 255, 0)' because 'transparent' breaks the gradient in Safari 11 */\n    background-image: ", ";\n  }\n"], ["\n  position: relative;\n  overflow-y: hidden;\n  max-height: ", "px;\n  &::after {\n    content: '';\n    position: absolute;\n    top: ", "px;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    /* Using 'rgba(255, 255, 255, 0)' because 'transparent' breaks the gradient in Safari 11 */\n    background-image: ",
    ";\n  }\n"])), function (_a) {
    var height = _a.height;
    return height;
}, function (_a) {
    var height = _a.height, fadeHeight = _a.fadeHeight;
    return height - fadeHeight;
}, function (_a) {
    var backgroundColor = _a.backgroundColor;
    return "linear-gradient(rgba(255, 255, 255, 0),  " + backgroundColor + ")";
});
var TruncatedWrapper = /** @class */ (function (_super) {
    tslib_1.__extends(TruncatedWrapper, _super);
    function TruncatedWrapper(props) {
        return _super.call(this, props) || this;
    }
    TruncatedWrapper.prototype.render = function () {
        var _a = this.props, _b = _a.height, height = _b === void 0 ? 95 : _b, _c = _a.backgroundColor, backgroundColor = _c === void 0 ? 'white' : _c, children = _a.children;
        return (React.createElement(FadeOut, { height: height, fadeHeight: 24, backgroundColor: backgroundColor }, children));
    };
    return TruncatedWrapper;
}(Component));
export { TruncatedWrapper };
var templateObject_1;
//# sourceMappingURL=truncated-wrapper.js.map