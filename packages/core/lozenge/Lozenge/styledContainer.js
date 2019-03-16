import styled from 'styled-components';
import { borderRadius } from '@atlaskit/theme';
export default styled.span.withConfig({
  displayName: "styledContainer",
  componentId: "sc-1vjy1uk-0"
})(["\n  ", ";\n  border-radius: ", "px;\n  box-sizing: border-box;\n  display: inline-block;\n  font-size: 11px;\n  font-weight: 700;\n  line-height: 1;\n  max-width: 100%;\n  padding: 2px 0 3px 0;\n  text-transform: uppercase;\n  vertical-align: baseline;\n"], function (props) {
  return "\n    background-color: ".concat(props.backgroundColor, ";\n    color: ").concat(props.textColor, ";\n  ");
}, borderRadius());