import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { borderRadius, gridSize, colors, themed } from '@atlaskit/theme';
var akGridSize = gridSize();
export var ContentWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  margin: 0;\n  word-wrap: break-word;\n  min-width: 0;\n  flex: 1 1 auto;\n"], ["\n  margin: 0;\n  word-wrap: break-word;\n  min-width: 0;\n  flex: 1 1 auto;\n"])));
export var Wrapper = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex-direction: ", ";\n\n  line-height: 20px;\n  border-radius: ", "px;\n  margin: ", "px 0;\n  padding: ", "px ", "px;\n  min-height: 36px;\n  box-sizing: border-box;\n  box-shadow: ", ";\n\n  &:hover {\n    box-shadow: ", ";\n    transition: box-shadow 0.2s ease-in-out;\n  }\n\n  background-color: ", ";\n  border: 1px solid: ", ";\n"], ["\n  display: flex;\n  flex-direction: ", ";\n\n  line-height: 20px;\n  border-radius: ", "px;\n  margin: ", "px 0;\n  padding: ", "px ", "px;\n  min-height: 36px;\n  box-sizing: border-box;\n  box-shadow: ",
    ";\n\n  &:hover {\n    box-shadow: ",
    ";\n    transition: box-shadow 0.2s ease-in-out;\n  }\n\n  background-color: ", ";\n  border: 1px solid: ", ";\n"])), function (props) { return (props.appearance === 'card' ? 'column' : 'row'); }, borderRadius(), akGridSize, akGridSize, akGridSize, function (props) {
    return props.appearance === 'card'
        ? "0 1px 1px " + colors.N50A + ", 0 0 1px 0 " + colors.N60A
        : 'none';
}, function (props) {
    return props.appearance === 'card'
        ? "0 4px 8px -2px " + colors.N60A + ", 0 0 1px " + colors.N60A
        : 'none';
}, themed({ light: colors.N30A, dark: colors.DN50 }), themed({ light: 'none', dark: colors.DN60 }));
export var ParticipantWrapper = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  margin: -2px 8px;\n"], ["\n  margin: -2px 8px;\n"])));
export var CardHeadingWrapper = styled.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 4px;\n  min-height: 24px;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 4px;\n  min-height: 24px;\n"])));
export var AttributionWrapper = styled.div(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  color: ", ";\n  margin-top: ", "px;\n  font-size: 12px;\n  font-weight: 500;\n"], ["\n  color: ", ";\n  margin-top: ", "px;\n  font-size: 12px;\n  font-weight: 500;\n"])), colors.N200, akGridSize);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=Item.js.map