import * as tslib_1 from "tslib";
import styled, { css } from 'styled-components';
import { codeFontFamily, fontSize, gridSize } from '@findable/theme';
var grid = gridSize();
var borderRadius = '3px';
var borderWidth = 2;
var lineHeightBase = grid * 2.5;
var lineHeightCompact = grid * 2;
var getLineHeight = function (_a) {
    var isCompact = _a.isCompact;
    return isCompact ? lineHeightBase : lineHeightCompact;
};
var getVerticalPadding = function (_a) {
    var isCompact = _a.isCompact;
    return isCompact ? 2 : 6;
};
var horizontalPadding = grid;
var transitionDuration = '0.2s';
var getBorderStyle = function (props) {
    return props.appearance === 'none' ? 'none;' : 'solid;';
};
var getPlaceholderStyle = function (style) { return css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  &::placeholder {\n    ", "\n  }\n"], ["\n  &::placeholder {\n    ", "\n  }\n"])), style); };
var getPlaceholderColor = css(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  color: ", ";\n"], ["\n  color: ", ";\n"])), function (props) { return props.placeholderTextColor; });
// Safari puts on some difficult to remove styles, mainly for disabled inputs
// but we want full control so need to override them in all cases
var overrideSafariDisabledStyles = "\n  -webkit-text-fill-color: unset;\n  -webkit-opacity: 1;\n";
var getBorderAndPadding = function () {
    return css(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n    border-width: ", "px;\n    padding: ", "px ", "px;\n  "], ["\n    border-width: ", "px;\n    padding: ", "px ", "px;\n  "])), borderWidth, getVerticalPadding, horizontalPadding - borderWidth);
};
var getHoverState = function (props) {
    if (props.isReadOnly || props.isFocused || props.none) {
        return null;
    }
    var backgroundColorHover = props.backgroundColorHover;
    if (props.isDisabled) {
        backgroundColorHover = props.disabledRules.backgroundColorHover;
    }
    if (props.isInvalid) {
        backgroundColorHover = props.invalidRules.backgroundColorHover;
    }
    return css(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n    &:hover {\n      background-color: ", ";\n    }\n  "], ["\n    &:hover {\n      background-color: ", ";\n    }\n  "])), backgroundColorHover);
};
var getMinimumRowsHeight = function (_a) {
    var minimumRows = _a.minimumRows, isCompact = _a.isCompact;
    var lineHeight = getLineHeight({ isCompact: isCompact });
    return "min-height: " + lineHeight * minimumRows + "px;";
};
var getResizeStyles = function (_a) {
    var resize = _a.resize;
    if (resize === 'auto') {
        return "resize: auto;";
    }
    if (resize === 'horizontal') {
        return "resize: horizontal;";
    }
    if (resize === 'vertical') {
        return "resize: vertical;";
    }
    return "resize: none;";
};
var getBorderColor = function (props) {
    var borderColor = props.isFocused
        ? props.borderColorFocus
        : props.borderColor;
    if (props.isDisabled) {
        borderColor = props.isFocused
            ? props.disabledRules.borderColorFocus
            : props.disabledRules.borderColor;
    }
    if (props.isInvalid) {
        borderColor = props.isFocused
            ? props.invalidRules.borderColorFocus
            : props.invalidRules.borderColor;
    }
    return borderColor;
};
var getBackgroundColor = function (props) {
    var backgroundColor = props.isFocused
        ? props.backgroundColorFocus
        : props.backgroundColor;
    if (props.isDisabled) {
        backgroundColor = props.isFocused
            ? props.disabledRules.backgroundColorFocus
            : props.disabledRules.backgroundColor;
    }
    if (props.isInvalid) {
        backgroundColor = props.isFocused
            ? props.invalidRules.backgroundColorFocus
            : props.invalidRules.backgroundColor;
    }
    return backgroundColor;
};
export var TextAreaWrapper = styled.div(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  flex: 1 1 100%;\n  position: relative;\n  background-color: ", ";\n  border-color: ", ";\n  border-radius: ", ";\n  border-style: ", ";\n  box-sizing: border-box;\n  line-height: ", ";\n  overflow: auto;\n  transition: background-color ", " ease-in-out,\n    border-color ", " ease-in-out;\n  word-wrap: break-word;\n  ", "\n  ", "\n  ", "\n  font-size: ", "px;\n  max-height: ", ";\n  max-width: 100%;\n  ", "\n  & > textarea {\n    display:block;\n    resize: none;\n    background: transparent;\n    margin: 0;\n    border: 0;\n    box-sizing: border-box;\n    color: ", ";\n    ", "\n    cursor: inherit;\n    font-family: ", ";\n    font-size: inherit;\n    line-height: ", ";\n    min-width: 0;\n    outline: none;\n    overflow: auto;\n    max-width: 100%;\n    width: 100%;\n    ", ";\n    ", "\n\n    &[disabled] {\n      ", ";\n    }\n    &::-ms-clear {\n      display: none;\n    }\n\n    &:invalid {\n      box-shadow: none;\n    }\n  }\n"], ["\n  flex: 1 1 100%;\n  position: relative;\n  background-color: ", ";\n  border-color: ", ";\n  border-radius: ", ";\n  border-style: ", ";\n  box-sizing: border-box;\n  line-height: ", ";\n  overflow: auto;\n  transition: background-color ", " ease-in-out,\n    border-color ", " ease-in-out;\n  word-wrap: break-word;\n  ", "\n  ", "\n  ", "\n  font-size: ", "px;\n  max-height: ", ";\n  max-width: 100%;\n  ", "\n  & > textarea {\n    display:block;\n    resize: none;\n    background: transparent;\n    margin: 0;\n    border: 0;\n    box-sizing: border-box;\n    color: ",
    ";\n    ", "\n    cursor: inherit;\n    font-family: ",
    ";\n    font-size: inherit;\n    line-height: ",
    ";\n    min-width: 0;\n    outline: none;\n    overflow: auto;\n    max-width: 100%;\n    width: 100%;\n    ", ";\n    ", "\n\n    &[disabled] {\n      ", ";\n    }\n    &::-ms-clear {\n      display: none;\n    }\n\n    &:invalid {\n      box-shadow: none;\n    }\n  }\n"])), getBackgroundColor, getBorderColor, borderRadius, getBorderStyle, getLineHeight, transitionDuration, transitionDuration, getBorderAndPadding, getHoverState, function (props) { return props.isDisabled && "cursor: not-allowed;"; }, fontSize, function (props) { return props.maxHeight; }, getResizeStyles, function (_a) {
    var isDisabled = _a.isDisabled, textColor = _a.textColor, disabledRules = _a.disabledRules;
    return isDisabled ? disabledRules.textColor : textColor;
}, function (_a) {
    var isDisabled = _a.isDisabled;
    return (isDisabled ? 'pointer-events: none;' : null);
}, function (props) {
    return props.isMonospaced ? codeFontFamily() : 'inherit';
}, function (_a) {
    var isCompact = _a.isCompact;
    return getLineHeight({ isCompact: isCompact }) / fontSize();
}, getPlaceholderStyle(getPlaceholderColor), getMinimumRowsHeight, overrideSafariDisabledStyles);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=index.js.map