import * as tslib_1 from "tslib";
import { AvatarItem } from '@findable/avatar';
import * as React from 'react';
import styled from 'styled-components';
import { SizeableAvatar } from './SizeableAvatar';
import { getAvatarUrl } from './utils';
var AvatarItemComponent = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  border: none;\n  padding: 0;\n  width: auto;\n  overflow: hidden;\n\n  & > span {\n    box-sizing: border-box;\n  }\n\n  &:hover {\n    width: auto;\n    padding: 0;\n    border: none;\n  }\n"], ["\n  border: none;\n  padding: 0;\n  width: auto;\n  overflow: hidden;\n\n  & > span {\n    box-sizing: border-box;\n  }\n\n  &:hover {\n    width: auto;\n    padding: 0;\n    border: none;\n  }\n"])));
export var SingleValue = function (props) {
    var _a = props.data, label = _a.label, data = _a.data, _b = props.selectProps, appearance = _b.appearance, isFocused = _b.isFocused;
    return !isFocused ? (React.createElement(AvatarItem, { backgroundColor: "transparent", avatar: React.createElement(SizeableAvatar, { src: getAvatarUrl(data), appearance: appearance, name: label }), primaryText: label, component: AvatarItemComponent })) : null;
};
var templateObject_1;
//# sourceMappingURL=SingleValue.js.map