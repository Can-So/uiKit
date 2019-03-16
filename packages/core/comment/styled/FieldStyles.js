import styled, { css } from 'styled-components';
import { colors } from '@atlaskit/theme';
var ThemeColor = {
  text: colors.N500
};

var common = function common(_ref) {
  var hasAuthor = _ref.hasAuthor;
  return css(["\n  &:not(:hover):not(:active) {\n    color: ", ";\n  }\n  font-weight: ", ";\n"], ThemeColor.text, hasAuthor ? 500 : 'inherit');
};

export var Anchor = styled.a.withConfig({
  displayName: "FieldStyles__Anchor",
  componentId: "sc-173n8o8-0"
})(["\n  ", ";\n"], function (p) {
  return common(p);
});
export var Span = styled.span.withConfig({
  displayName: "FieldStyles__Span",
  componentId: "sc-173n8o8-1"
})(["\n  ", ";\n"], function (p) {
  return common(p);
});