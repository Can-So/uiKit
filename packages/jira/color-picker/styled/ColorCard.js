import * as tslib_1 from "tslib";
import styled, { css } from 'styled-components';
import { borderRadius, colors } from '@findable/theme';
import { COLOR_CARD_SIZE } from '../constants';
var buttonFocusedBorder = "border-color: " + colors.B100 + ";";
var sharedColorContainerStyles = css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: inline-block;\n  position: relative;\n  width: ", "px;\n  height: ", "px;\n  border: 2px solid transparent;\n  box-sizing: border-box;\n  border-radius: ", "px;\n  transition: border-color 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);\n  border-color: transparent;\n  padding: 0;\n  cursor: pointer;\n  outline: none;\n"], ["\n  display: inline-block;\n  position: relative;\n  width: ", "px;\n  height: ", "px;\n  border: 2px solid transparent;\n  box-sizing: border-box;\n  border-radius: ", "px;\n  transition: border-color 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);\n  border-color: transparent;\n  padding: 0;\n  cursor: pointer;\n  outline: none;\n"])), COLOR_CARD_SIZE, COLOR_CARD_SIZE, borderRadius() * 2);
export var ColorCardOption = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  ", ";\n\n  ", ";\n"], ["\n  ", ";\n\n  ",
    ";\n"])), sharedColorContainerStyles, function (props) {
    if (props.focused) {
        return "border-color: " + colors.B75;
    }
});
export var ColorCardButton = styled.button(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  ", ";\n\n  &:focus {\n    ", ";\n  }\n\n  ", ";\n"], ["\n  ", ";\n\n  &:focus {\n    ", ";\n  }\n\n  ",
    ";\n"])), sharedColorContainerStyles, buttonFocusedBorder, function (props) {
    if (props.focused) {
        return buttonFocusedBorder;
    }
});
export var ColorCardContent = styled.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  top: 1px;\n  left: 1px;\n  width: 24px;\n  height: 24px;\n  border-radius: ", "px;\n  background: ", ";\n"], ["\n  position: absolute;\n  top: 1px;\n  left: 1px;\n  width: 24px;\n  height: 24px;\n  border-radius: ", "px;\n  background: ", ";\n"])), borderRadius(), function (props) { return props.color; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=ColorCard.js.map