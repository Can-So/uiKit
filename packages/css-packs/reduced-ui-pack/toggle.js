import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  .ak-field-toggle {\n    display: inline-block;\n    overflow: hidden;\n    position: relative;\n    user-select: none;\n  }\n  .ak-field-toggle > label {\n    background-clip: content-box;\n    background-color: ", ";\n    background-image: ", ", ", ";\n    background-repeat: no-repeat;\n    border: ", "px solid transparent;\n    color: transparent;\n    cursor: pointer;\n    display: inline-block;\n    overflow: hidden;\n    padding: ", "px;\n    text-indent: -9999px;\n    transition: background-color ", "s, border-color ", "s;\n    vertical-align: top;\n    white-space: nowrap;\n  }\n  .ak-field-toggle > label::before {\n    background: white;\n    content: '';\n    cursor: pointer;\n    display: block;\n    transition: transform ", "s;\n  }\n  .ak-field-toggle > input {\n    left: 0;\n    opacity: 0;\n    position: absolute;\n    top: 0;\n  }\n  .ak-field-toggle > input:checked + label {\n    background-color: ", ";\n  }\n  .ak-field-toggle > input:disabled + label {\n    background-color: ", ";\n    background-image: ", ", ", ";\n    cursor: not-allowed;\n  }\n  .ak-field-toggle > input:disabled + label::before {\n    background-color: ", ";\n    cursor: not-allowed;\n  }\n  .ak-field-toggle > input:checked:disabled + label {\n    background-color: ", ";\n  }\n  .ak-field-toggle > input:checked:disabled + label::before {\n    background-color: ", ";\n  }\n  .ak-field-toggle > input:focus {\n    outline: none;\n  }\n  .ak-field-toggle > input:focus + label {\n    border-color: ", ";\n  }\n  .ak-field-toggle__size-large > label {\n    background-position: ", "px ", "px, ", "px ", "px;\n    background-size: ", "px ", "px, ", "px ", "px;\n    border-radius: ", "px;\n    height: ", "px;\n    width: ", "px;\n  }\n  .ak-field-toggle__size-large > label::before {\n    background: white;\n    border-radius: ", "px;\n    content: '';\n    display: block;\n    height: ", "px;\n    margin-left: ", "px;\n    margin-top: ", "px;\n    width: ", "px;\n  }\n  .ak-field-toggle__size-large > input:checked + label::before {\n    transform: translate(", "px, 0);\n  }\n  .ak-field-toggle__size-default > label {\n    background-position: ", "px ", "px, ", "px ", "px;\n    background-size: ", "px ", "px, ", "px ", "px;\n    border-radius: ", "px;\n    height: ", "px;\n    width: ", "px;\n  }\n  .ak-field-toggle__size-default > label::before {\n    background: white;\n    border-radius: ", "px;\n    content: '';\n    display: block;\n    height: ", "px;\n    margin-left: ", "px;\n    margin-top: ", "px;\n    width: ", "px;\n  }\n  .ak-field-toggle__size-default > input:checked + label::before {\n    transform: translate(", "px, 0);\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import { colors, gridSize } from '@findable/theme';
import dataUri from './utils/data-uri';
import evaluateInner from './utils/evaluate-inner';
var borderWidth = 2;
var toggleTransition = 0.2;
var toggleBgCheckedDisabled = '#35b885';
var toggleSlideCheckedDisabled = '#a1dcc4';
var toggleBgUncheckedDisabled = '#f3f4f5';
var toggleSlideUncheckedDisabled = '#afb6c2';
var togglePadding = gridSize() / 4;
var toggleHeightLarge = gridSize() * 2.5;
var toggleWidthLarge = gridSize() * 5;
var toggleHeightDefault = gridSize() * 2;
var toggleWidthDefault = gridSize() * 4;
export default evaluateInner(_templateObject(), colors.N80, dataUri('internal/toggle/check-enabled.svg'), dataUri('internal/toggle/cross-enabled.svg'), borderWidth, gridSize() / 4, toggleTransition, toggleTransition, toggleTransition, colors.G300, toggleBgUncheckedDisabled, dataUri('internal/toggle/check-disabled.svg'), dataUri('internal/toggle/cross-disabled.svg'), toggleSlideUncheckedDisabled, toggleBgCheckedDisabled, toggleSlideCheckedDisabled, colors.B100, togglePadding * 2.5, togglePadding * 2, toggleWidthLarge - (toggleHeightLarge - togglePadding * 2) - togglePadding / 2, togglePadding * 2, toggleHeightLarge - togglePadding * 2, toggleHeightLarge - togglePadding * 2, toggleHeightLarge - togglePadding * 2, toggleHeightLarge - togglePadding * 2, toggleHeightLarge, toggleHeightLarge, toggleWidthLarge, toggleHeightLarge - togglePadding * 2, toggleHeightLarge - togglePadding * 2, togglePadding, togglePadding, toggleHeightLarge - togglePadding * 2, toggleWidthLarge - (toggleHeightLarge - togglePadding * 2) - togglePadding * 2, togglePadding * 2.5, togglePadding * 2, toggleWidthDefault - (toggleHeightDefault - togglePadding * 2) - togglePadding / 2, togglePadding * 2, toggleHeightDefault - togglePadding * 2, toggleHeightDefault - togglePadding * 2, toggleHeightDefault - togglePadding * 2, toggleHeightDefault - togglePadding * 2, toggleHeightDefault, toggleHeightDefault, toggleWidthDefault, toggleHeightDefault - togglePadding * 2, toggleHeightDefault - togglePadding * 2, togglePadding, togglePadding, toggleHeightDefault - togglePadding * 2, toggleWidthDefault - (toggleHeightDefault - togglePadding * 2) - togglePadding * 2);