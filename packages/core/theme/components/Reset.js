import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React from 'react';
import styled, { css } from 'styled-components';
import * as colors from '../colors';
import { createTheme } from '../utils/createTheme';

var orTextColor = function orTextColor(preferred) {
  return function (p) {
    return p[preferred] || p.textColor;
  };
};

var Div = styled.div.withConfig({
  displayName: "Reset__Div",
  componentId: "sc-15i6ali-0"
})(["\n  ", ";\n"], function (p) {
  return css(["\n    background-color: ", ";\n    color: ", ";\n\n    a {\n      color: ", ";\n    }\n    a:hover {\n      color: ", ";\n    }\n    a:active {\n      color: ", ";\n    }\n    a:focus {\n      outline-color: ", ";\n    }\n    h1,\n    h2,\n    h3,\n    h4,\n    h5 {\n      color: ", ";\n    }\n    h6 {\n      color: ", ";\n    }\n    small {\n      color: ", ";\n    }\n  "], p.backgroundColor, p.textColor, orTextColor('linkColor'), orTextColor('linkColorHover'), orTextColor('linkColorActive'), orTextColor('linkColorOutline'), orTextColor('headingColor'), orTextColor('subtleHeadingColor'), orTextColor('subtleTextColor'));
});
export var ResetTheme = createTheme(function () {
  return {
    backgroundColor: colors.N0,
    linkColor: colors.B400,
    linkColorHover: colors.B300,
    linkColorActive: colors.B500,
    linkColorOutline: colors.B100,
    headingColor: colors.N800,
    subtleHeadingColor: colors.N200,
    subtleTextColor: colors.N200,
    textColor: colors.N900
  };
});
export function Reset(props) {
  return React.createElement(ResetTheme.Provider, {
    value: props.theme
  }, React.createElement(ResetTheme.Consumer, null, function (tokens) {
    return React.createElement(Div, _extends({}, _objectSpread({}, tokens, {
      mode: undefined
    }), props), props.children);
  }));
}