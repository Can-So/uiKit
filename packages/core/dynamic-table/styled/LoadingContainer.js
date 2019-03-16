import styled from 'styled-components';
export var Container = styled.div.withConfig({
  displayName: "LoadingContainer__Container",
  componentId: "kdx72l-0"
})(["\n  position: relative;\n"]);
export var ContentsContainer = styled.div.withConfig({
  displayName: "LoadingContainer__ContentsContainer",
  componentId: "kdx72l-1"
})(["\n  pointer-events: none;\n  opacity: ", ";\n"], function (p) {
  return p.contentsOpacity;
});
export var SpinnerContainer = styled.div.withConfig({
  displayName: "LoadingContainer__SpinnerContainer",
  componentId: "kdx72l-2"
})(["\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]);