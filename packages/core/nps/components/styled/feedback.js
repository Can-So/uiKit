import styled from 'styled-components';
import { gridSize, colors } from '@atlaskit/theme';
export var ScoreContainer = styled.section.withConfig({
  displayName: "feedback__ScoreContainer",
  componentId: "yyw2a6-0"
})(["\n  display: flex;\n  align-items: center;\n"]);
export var Scale = styled.span.withConfig({
  displayName: "feedback__Scale",
  componentId: "yyw2a6-1"
})(["\n  padding: 0 ", "px;\n  font-size: 12px;\n  color: ", ";\n"], gridSize(), colors.subtleText);
export var Comment = styled.div.withConfig({
  displayName: "feedback__Comment",
  componentId: "yyw2a6-2"
})(["\n  margin-bottom: ", "px;\n"], gridSize());