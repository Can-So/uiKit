import React from 'react';
import styled from 'styled-components';
import ScrollLock from 'react-scrolllock';
var Blanket = styled.div.withConfig({
  displayName: "ScrollBlock__Blanket",
  componentId: "sc-1xiww8k-0"
})(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: transparent;\n"]);
export default function ScrollBlock() {
  return React.createElement(Blanket, null, React.createElement(ScrollLock, null));
}