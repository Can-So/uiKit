import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
export var Container = styled.div.withConfig({
  displayName: "LoadingContainerAdvanced__Container",
  componentId: "sc-1s2zdt8-0"
})(["\n  margin-bottom: ", "px;\n  position: relative;\n"], gridSize() * 3);
export var SpinnerBackdrop = styled.div.withConfig({
  displayName: "LoadingContainerAdvanced__SpinnerBackdrop",
  componentId: "sc-1s2zdt8-1"
})(["\n  pointer-events: none;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]);
export var SpinnerContainer = styled.div.withConfig({
  displayName: "LoadingContainerAdvanced__SpinnerContainer",
  componentId: "sc-1s2zdt8-2"
})(["\n  position: relative;\n  top: 0;\n"]);