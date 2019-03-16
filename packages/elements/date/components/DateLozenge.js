import * as tslib_1 from "tslib";
import { borderRadius, colors, themed } from '@atlaskit/theme';
import styled from 'styled-components';
export var resolveColors = function (color) {
    if (!color || color === 'grey') {
        return {
            light: [colors.N30A, colors.N800, colors.N40],
            dark: [colors.DN70, colors.DN800, colors.DN60],
        };
    }
    var letter = color.toUpperCase().charAt(0);
    var resolvedColors = [
        colors[letter + "50"],
        colors[letter + "500"],
        colors[letter + "75"],
    ];
    return {
        light: resolvedColors,
        dark: resolvedColors,
    };
};
/**
 * TODO when update typescript to 2.9+
 * add custom props as Generic Parameter to span instead of casting
 */
export var DateLozenge = styled.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  border-radius: ", "px;\n  padding: 2px 4px;\n  margin: 0 1px;\n  position: relative;\n  transition: background 0.3s;\n  white-space: nowrap;\n  cursor: ", ";\n\n  ", ";\n"], ["\n  border-radius: ", "px;\n  padding: 2px 4px;\n  margin: 0 1px;\n  position: relative;\n  transition: background 0.3s;\n  white-space: nowrap;\n  cursor: ", ";\n\n  ",
    ";\n"])), borderRadius(), function (props) { return (props.onClick ? 'pointer' : 'unset'); }, function (props) {
    var _a = tslib_1.__read(themed(resolveColors(props.color))(props), 3), background = _a[0], color = _a[1], hoverBackground = _a[2];
    return "\n      background: " + background + ";\n      color: " + color + ";\n      &:hover {\n        background: " + hoverBackground + ";\n      }\n    ";
});
var templateObject_1;
//# sourceMappingURL=DateLozenge.js.map