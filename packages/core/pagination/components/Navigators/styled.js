import styled from 'styled-components';
import Button from '@findable/button';
import { gridSize } from '@findable/theme';
export var StyledButton = styled(Button).withConfig({
  displayName: "styled__StyledButton",
  componentId: "ox68oy-0"
})(["\n  [dir='rtl'] & {\n    transform: rotate(180deg);\n  }\n  padding-left: ", "px;\n  padding-right: ", "px;\n"], gridSize() / 2, gridSize() / 2);