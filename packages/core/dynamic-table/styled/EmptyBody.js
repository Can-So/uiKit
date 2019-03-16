import styled from 'styled-components';
import { gridSize, math } from '@atlaskit/theme';
export var EmptyViewWithFixedHeight = styled.div.withConfig({
  displayName: "EmptyBody__EmptyViewWithFixedHeight",
  componentId: "sc-2tfyf5-0"
})(["\n  height: ", "px;\n"], math.multiply(gridSize, 18));
export var EmptyViewContainer = styled.div.withConfig({
  displayName: "EmptyBody__EmptyViewContainer",
  componentId: "sc-2tfyf5-1"
})(["\n  margin: auto;\n  padding: 10px;\n  text-align: center;\n  width: 50%;\n"]);