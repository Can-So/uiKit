import styled from 'styled-components';
import { gridSize, colors, fontSize } from '@findable/theme';
export var Contact = styled.div.withConfig({
  displayName: "followup__Contact",
  componentId: "sc-2c5dok-0"
})(["\n  margin-top: ", "px;\n"], gridSize() * 2);
export var RoleQuestion = styled.div.withConfig({
  displayName: "followup__RoleQuestion",
  componentId: "sc-2c5dok-1"
})(["\n  font-size: ", "px;\n  color: ", ";\n"], fontSize, colors.text);