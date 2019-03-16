import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import Lozenge from '@atlaskit/lozenge';
import { gridSize } from '@atlaskit/theme';
export var OuterLozengeContainer = styled.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: inline-block;\n  margin-left: ", "px;\n"], ["\n  display: inline-block;\n  margin-left: ", "px;\n"])), gridSize());
export var InnerLozengeContainer = styled.span(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  padding-left: ", "px;\n  padding-right: ", "px;\n"], ["\n  padding-left: ", "px;\n  padding-right: ", "px;\n"])), gridSize(), gridSize());
export default (function (_a) {
    var children = _a.children, props = tslib_1.__rest(_a, ["children"]);
    return (React.createElement(OuterLozengeContainer, null,
        React.createElement(Lozenge, tslib_1.__assign({ appearance: "inprogress", isBold: true }, props),
            React.createElement(InnerLozengeContainer, null, children))));
});
var templateObject_1, templateObject_2;
//# sourceMappingURL=try-lozenge.js.map