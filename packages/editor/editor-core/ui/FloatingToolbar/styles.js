import * as tslib_1 from "tslib";
import styled, { css } from 'styled-components';
import { colors, borderRadius } from '@atlaskit/theme';
import { dropShadow } from '../styles';
export var Container = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  border-radius: ", "px;\n  ", " display: flex;\n  align-items: center;\n  box-sizing: border-box;\n  padding: 4px 8px;\n  background-color: ", ";\n  ", ";\n"], ["\n  border-radius: ", "px;\n  ", " display: flex;\n  align-items: center;\n  box-sizing: border-box;\n  padding: 4px 8px;\n  background-color: ", ";\n  ",
    ";\n"])), borderRadius(), dropShadow, colors.N0, function (_a) {
    var height = _a.height;
    return height
        ? css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n          height: ", "px;\n        "], ["\n          height: ", "px;\n        "])), height) : '';
});
var templateObject_1, templateObject_2;
//# sourceMappingURL=styles.js.map