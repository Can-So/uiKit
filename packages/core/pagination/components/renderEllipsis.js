import React from 'react';
import styled from 'styled-components';
var StyledEllipsis = styled.span.withConfig({
  displayName: "renderEllipsis__StyledEllipsis",
  componentId: "sc-12tpj3g-0"
})(["\n  display: inline-flex;\n  text-align: center;\n  align-items: center;\n  padding: 0 8px;\n"]);
export default function renderEllipsis(_ref) {
  var key = _ref.key;
  return React.createElement(StyledEllipsis, {
    key: key
  }, "...");
}