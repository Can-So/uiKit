import styled from 'styled-components';
import { colors, fontSize } from '@atlaskit/theme';
export var Wrapper = styled.div.withConfig({
  displayName: "common__Wrapper",
  componentId: "usjzau-0"
})(["\n  margin-top: 16px;\n"]);
export var Header = styled.header.withConfig({
  displayName: "common__Header",
  componentId: "usjzau-1"
})(["\n  display: flex;\n  justify-content: space-between;\n"]);
export var Title = styled.span.withConfig({
  displayName: "common__Title",
  componentId: "usjzau-2"
})(["\n  font-size: 24px;\n  font-weight: 500;\n  color: ", ";\n"], colors.heading);
export var Description = styled.div.withConfig({
  displayName: "common__Description",
  componentId: "usjzau-3"
})(["\n  font-size: ", "px;\n  color: ", ";\n"], fontSize, colors.text);
export var ButtonWrapper = styled.div.withConfig({
  displayName: "common__ButtonWrapper",
  componentId: "usjzau-4"
})(["\n  display: flex;\n  justify-content: flex-end;\n"]);