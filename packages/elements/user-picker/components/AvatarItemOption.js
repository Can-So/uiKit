import * as tslib_1 from "tslib";
import { AvatarItem } from '@atlaskit/avatar';
import * as React from 'react';
import styled from 'styled-components';
var AvatarComponent = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  &,\n  &:hover,\n  &:active,\n  &:focus {\n    padding: 0;\n    margin: 0;\n    border: none;\n  }\n"], ["\n  &,\n  &:hover,\n  &:active,\n  &:focus {\n    padding: 0;\n    margin: 0;\n    border: none;\n  }\n"])));
export var TextWrapper = styled.span(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  color: ", ";\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: inline-block;\n"], ["\n  color: ", ";\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: inline-block;\n"])), function (_a) {
    var color = _a.color;
    return color;
});
export var AvatarItemOption = function (props) { return (React.createElement(AvatarItem, tslib_1.__assign({ backgroundColor: "transparent", component: AvatarComponent }, props))); };
var templateObject_1, templateObject_2;
//# sourceMappingURL=AvatarItemOption.js.map