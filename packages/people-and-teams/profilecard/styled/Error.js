import styled from 'styled-components';
import { gridSize, math } from '@findable/theme';
import { errorIconColor, errorTitleColor, errorTextColor } from '../styled/constants';
export var ErrorWrapper = styled.div.withConfig({
  displayName: "Error__ErrorWrapper",
  componentId: "sc-1sg8cu3-0"
})(["\n  text-align: center;\n  padding: ", "px;\n  color: ", ";\n"], math.multiply(gridSize, 3), errorIconColor);
export var ErrorTitle = styled.p.withConfig({
  displayName: "Error__ErrorTitle",
  componentId: "sc-1sg8cu3-1"
})(["\n  color: ", ";\n  line-height: ", "px;\n  margin: ", "px 0;\n"], errorTitleColor, math.multiply(gridSize, 3), gridSize);
export var ErrorText = styled.span.withConfig({
  displayName: "Error__ErrorText",
  componentId: "sc-1sg8cu3-2"
})(["\n  color: ", ";\n"], errorTextColor);