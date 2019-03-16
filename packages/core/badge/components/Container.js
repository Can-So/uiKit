import styled from 'styled-components';
export var Container = styled.span.withConfig({
  displayName: "Container",
  componentId: "d38mat-0"
})(["\n  ", ";\n  border-radius: 2em;\n  display: inline-block;\n  font-size: 12px;\n  font-weight: normal;\n  line-height: 1;\n  min-width: 1px;\n  padding: 0.16666666666667em 0.5em;\n  text-align: center;\n"], function (props) {
  return "\n    background-color: ".concat(props.backgroundColor, ";\n    color: ").concat(props.textColor, ";\n  ");
});
Container.displayName = 'Ak.Badge.Container';