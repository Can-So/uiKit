import * as tslib_1 from "tslib";
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from '@atlaskit/theme';
var pulseBackground = keyframes(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  50% {\n    background-color: ", ";\n  }\n"], ["\n  50% {\n    background-color: ", ";\n  }\n"])), colors.R100);
var pulseBackgroundReverse = keyframes(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  0% {\n    background-color: ", ";\n  }\n  50% {\n    background-color: auto;\n  }\n  100% {\n    background-color: ", ";\n  }\n"], ["\n  0% {\n    background-color: ", ";\n  }\n  50% {\n    background-color: auto;\n  }\n  100% {\n    background-color: ", ";\n  }\n"])), colors.R100, colors.R100);
var Wrapper = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  &.-flash > div {\n    animation: 0.25s ease-in-out ", ";\n  }\n\n  & > div {\n    animation: ", ";\n  }\n"], ["\n  &.-flash > div {\n    animation: 0.25s ease-in-out ", ";\n  }\n\n  & > div {\n    animation: ",
    ";\n  }\n"])), pulseBackgroundReverse, function (props) {
    return props.animate ? ".25s ease-in-out " + pulseBackground : 'none';
});
var WithFlash = /** @class */ (function (_super) {
    tslib_1.__extends(WithFlash, _super);
    function WithFlash() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toggle = false;
        return _this;
    }
    WithFlash.prototype.render = function () {
        var _a = this.props, animate = _a.animate, children = _a.children;
        this.toggle = animate && !this.toggle;
        return (React.createElement(Wrapper, { className: this.toggle ? '-flash' : '', animate: animate }, children));
    };
    return WithFlash;
}(React.Component));
export default WithFlash;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map