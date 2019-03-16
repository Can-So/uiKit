import styled, { css } from 'styled-components';
import { colors, themed, gridSize } from '@atlaskit/theme';
var spacing = gridSize();
var fontSize = 12;
var innerHeight = spacing * 2; // 16px

var lineHeight = innerHeight / fontSize;

var getPadding = function getPadding(_ref) {
  var firstChild = _ref.firstChild,
      inlineEdit = _ref.inlineEdit;
  var right = 0;
  var bottom = spacing / 2;
  var left = 0;
  var top = spacing * 2.5;

  if (inlineEdit) {
    bottom = 0;
    left = spacing;
    top = spacing;
  }

  if (firstChild) {
    top = spacing / 2;
  }

  return css(["\n    padding: ", "px ", "px ", "px ", "px;\n  "], top, right, bottom, left);
};

export var LabelWrapper = styled.label.withConfig({
  displayName: "Label__LabelWrapper",
  componentId: "sc-17towfw-0"
})(["\n  display: block;\n"]);
var getColor = themed({
  light: colors.N200,
  dark: colors.DN90
});
var getDisabledColor = themed({
  light: colors.N60,
  dark: colors.DN300
});
export var LabelInner = styled.div.withConfig({
  displayName: "Label__LabelInner",
  componentId: "sc-17towfw-1"
})(["\n  color: ", ";\n  font-size: ", "px;\n  font-weight: 600;\n  line-height: ", ";\n  ", ";\n\n  ", ";\n"], function (props) {
  return props.isDisabled ? getDisabledColor(props) : getColor(props);
}, fontSize, lineHeight, getPadding, function (p) {
  return p.isHidden && 'display: none;';
});
export var RequiredIndicator = styled.span.withConfig({
  displayName: "Label__RequiredIndicator",
  componentId: "sc-17towfw-2"
})(["\n  color: ", ";\n  padding-left: 2px;\n"], colors.red);