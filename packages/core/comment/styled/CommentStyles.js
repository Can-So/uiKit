import styled from 'styled-components';
import { colors, gridSize } from '@findable/theme';
var ThemeColor = {
  text: {
    default: colors.N800,
    //akColorN800,
    disabled: colors.N100A
  }
};
export var Content = styled.div.withConfig({
  displayName: "CommentStyles__Content",
  componentId: "lr96k6-0"
})(["\n  color: ", ";\n  margin-top: ", "px;\n"], function (p) {
  return p.isDisabled ? ThemeColor.text.disabled : ThemeColor.text.default;
}, gridSize() / 2);