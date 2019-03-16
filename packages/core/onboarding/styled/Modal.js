import styled from 'styled-components';
import { borderRadius, gridSize, math } from '@findable/theme';
export var Body = styled.div.withConfig({
  displayName: "Modal__Body",
  componentId: "qc9xxl-0"
})(["\n  padding: 40px 20px;\n  text-align: center;\n"]); // TODO: equivilant to H600, need to replace with mixin when available from
// the @findable/theme package

export var Heading = styled.h4.withConfig({
  displayName: "Modal__Heading",
  componentId: "qc9xxl-1"
})(["\n  color: inherit;\n  font-size: 20px;\n  font-style: inherit;\n  font-weight: 500;\n  letter-spacing: -0.008em;\n  line-height: 1.2;\n  margin-bottom: ", "px;\n"], gridSize);
export var Image = styled.img.withConfig({
  displayName: "Modal__Image",
  componentId: "qc9xxl-2"
})(["\n  border-top-left-radius: ", "px;\n  border-top-right-radius: ", "px;\n  height: auto;\n  width: 100%;\n\n  @media (min-width: 320px) and (max-width: 480px) {\n    border-radius: 0;\n  }\n"], borderRadius, borderRadius);
export var Actions = styled.div.withConfig({
  displayName: "Modal__Actions",
  componentId: "qc9xxl-3"
})(["\n  display: flex;\n  justify-content: center;\n  padding: 0 40px 40px;\n"]);
export var ActionItem = styled.div.withConfig({
  displayName: "Modal__ActionItem",
  componentId: "qc9xxl-4"
})(["\n  margin: 0 ", "px;\n"], math.divide(gridSize, 2));