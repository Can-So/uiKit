import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import { colors, elevation, gridSize } from '@findable/theme';
var IconBase = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: ", "px;\n  height: ", "px;\n  border-radius: ", "px;\n  ", ";\n  background-color: ", "\n  overflow: hidden;\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: ", "px;\n  height: ", "px;\n  border-radius: ", "px;\n  ", ";\n  background-color: ", "\n  overflow: hidden;\n"])), 4 * gridSize(), 4 * gridSize(), gridSize(), elevation.e100, function (_a) {
    var bgColor = _a.bgColor;
    return bgColor;
});
var ImageIconBase = styled.img(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  width: ", "px;\n  height: ", "px;\n"], ["\n  width: ", "px;\n  height: ", "px;\n"])), gridSize() * 4, gridSize() * 4);
export var themes = {
    default: {
        backgroundColor: '#fff',
        primaryColor: '#000',
    },
    product: {
        iconColor: colors.N0,
        backgroundColor: colors.B400,
        primaryColor: colors.N0,
    },
    admin: {
        backgroundColor: colors.DN70,
        primaryColor: colors.N0,
    },
    custom: {
        backgroundColor: colors.N0,
        primaryColor: colors.DN70,
    },
};
export var createIcon = function (InnerIcon, defaultProps) { return function (props) {
    var _a = themes[props.theme] || themes.default, backgroundColor = _a.backgroundColor, iconProps = tslib_1.__rest(_a, ["backgroundColor"]);
    return (React.createElement(IconBase, { bgColor: backgroundColor },
        React.createElement(InnerIcon, tslib_1.__assign({}, defaultProps, iconProps))));
}; };
export var createImageIcon = function (url) { return function (props) {
    var backgroundColor = (themes[props.theme] || themes.default).backgroundColor;
    return (React.createElement(IconBase, { bgColor: backgroundColor },
        React.createElement(ImageIconBase, { src: url })));
}; };
var templateObject_1, templateObject_2;
//# sourceMappingURL=icon-themes.js.map