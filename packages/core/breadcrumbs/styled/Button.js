import Button from '@findable/button';
import styled, { css } from 'styled-components';
var ButtonElement = styled(Button).withConfig({
  displayName: "Button__ButtonElement",
  componentId: "sc-114ur46-0"
})(["\n  ", ";\n"], function (_ref) {
  var truncationWidth = _ref.truncationWidth;
  return truncationWidth ? css(["\n          max-width: ", "px !important;\n        "], truncationWidth) : css(["\n          flex-shrink: 1;\n          min-width: 0;\n        "]);
});
export default ButtonElement;