import { withTheme } from '@atlaskit/theme';
import styled from 'styled-components';
import CustomComponentProxy from '../components/CustomComponentProxy'; // This is necessary because we don't know what DOM element the custom component will render.

export default (function (styles) {
  var StyledCustomComponent = withTheme(styled(CustomComponentProxy).withConfig({
    displayName: "styledCache__StyledCustomComponent",
    componentId: "zohhd2-0"
  })(["\n      &,\n      &:hover,\n      &:active,\n      &:focus {\n        ", "\n      }\n    "], styles));
  var StyledButton = withTheme(styled.button.withConfig({
    displayName: "styledCache__StyledButton",
    componentId: "zohhd2-1"
  })(["\n    ", ";\n  "], styles));
  var StyledLink = withTheme(styled.a.withConfig({
    displayName: "styledCache__StyledLink",
    componentId: "zohhd2-2"
  })(["\n    a& {\n      ", ";\n    }\n  "], styles));
  var StyledSpan = withTheme(styled.span.withConfig({
    displayName: "styledCache__StyledSpan",
    componentId: "zohhd2-3"
  })(["\n    ", ";\n  "], styles));
  return function getStyled(_ref) {
    var component = _ref.component,
        href = _ref.href,
        onClick = _ref.onClick;
    var Ret = StyledSpan;

    if (component) {
      Ret = StyledCustomComponent;
    } else if (href) {
      Ret = StyledLink;
    } else if (onClick) {
      Ret = StyledButton;
    }

    return Ret;
  };
});